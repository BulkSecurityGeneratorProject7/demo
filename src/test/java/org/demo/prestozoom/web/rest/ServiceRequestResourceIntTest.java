package org.demo.prestozoom.web.rest;

import org.demo.prestozoom.PrestozoomApp;

import org.demo.prestozoom.domain.ServiceRequest;
import org.demo.prestozoom.repository.ServiceRequestRepository;
import org.demo.prestozoom.service.ServiceRequestService;
import org.demo.prestozoom.service.dto.ServiceRequestDTO;
import org.demo.prestozoom.service.mapper.ServiceRequestMapper;
import org.demo.prestozoom.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static org.demo.prestozoom.web.rest.TestUtil.sameInstant;
import static org.demo.prestozoom.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.demo.prestozoom.domain.enumeration.Service;
/**
 * Test class for the ServiceRequestResource REST controller.
 *
 * @see ServiceRequestResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrestozoomApp.class)
public class ServiceRequestResourceIntTest {

    private static final Service DEFAULT_SERVICE = Service.CLEANING;
    private static final Service UPDATED_SERVICE = Service.MAINTENANCE;

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final ZonedDateTime DEFAULT_START_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_START_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_END_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_END_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ServiceRequestRepository serviceRequestRepository;

    @Autowired
    private ServiceRequestMapper serviceRequestMapper;

    @Autowired
    private ServiceRequestService serviceRequestService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServiceRequestMockMvc;

    private ServiceRequest serviceRequest;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceRequestResource serviceRequestResource = new ServiceRequestResource(serviceRequestService);
        this.restServiceRequestMockMvc = MockMvcBuilders.standaloneSetup(serviceRequestResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ServiceRequest createEntity(EntityManager em) {
        ServiceRequest serviceRequest = new ServiceRequest()
            .service(DEFAULT_SERVICE)
            .amount(DEFAULT_AMOUNT)
            .startTime(DEFAULT_START_TIME)
            .endTime(DEFAULT_END_TIME);
        return serviceRequest;
    }

    @Before
    public void initTest() {
        serviceRequest = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceRequest() throws Exception {
        int databaseSizeBeforeCreate = serviceRequestRepository.findAll().size();

        // Create the ServiceRequest
        ServiceRequestDTO serviceRequestDTO = serviceRequestMapper.toDto(serviceRequest);
        restServiceRequestMockMvc.perform(post("/api/service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceRequest in the database
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceRequest testServiceRequest = serviceRequestList.get(serviceRequestList.size() - 1);
        assertThat(testServiceRequest.getService()).isEqualTo(DEFAULT_SERVICE);
        assertThat(testServiceRequest.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testServiceRequest.getStartTime()).isEqualTo(DEFAULT_START_TIME);
        assertThat(testServiceRequest.getEndTime()).isEqualTo(DEFAULT_END_TIME);
    }

    @Test
    @Transactional
    public void createServiceRequestWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceRequestRepository.findAll().size();

        // Create the ServiceRequest with an existing ID
        serviceRequest.setId(1L);
        ServiceRequestDTO serviceRequestDTO = serviceRequestMapper.toDto(serviceRequest);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceRequestMockMvc.perform(post("/api/service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceRequest in the database
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServiceRequests() throws Exception {
        // Initialize the database
        serviceRequestRepository.saveAndFlush(serviceRequest);

        // Get all the serviceRequestList
        restServiceRequestMockMvc.perform(get("/api/service-requests?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceRequest.getId().intValue())))
            .andExpect(jsonPath("$.[*].service").value(hasItem(DEFAULT_SERVICE.toString())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].startTime").value(hasItem(sameInstant(DEFAULT_START_TIME))))
            .andExpect(jsonPath("$.[*].endTime").value(hasItem(sameInstant(DEFAULT_END_TIME))));
    }
    
    @Test
    @Transactional
    public void getServiceRequest() throws Exception {
        // Initialize the database
        serviceRequestRepository.saveAndFlush(serviceRequest);

        // Get the serviceRequest
        restServiceRequestMockMvc.perform(get("/api/service-requests/{id}", serviceRequest.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceRequest.getId().intValue()))
            .andExpect(jsonPath("$.service").value(DEFAULT_SERVICE.toString()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.startTime").value(sameInstant(DEFAULT_START_TIME)))
            .andExpect(jsonPath("$.endTime").value(sameInstant(DEFAULT_END_TIME)));
    }

    @Test
    @Transactional
    public void getNonExistingServiceRequest() throws Exception {
        // Get the serviceRequest
        restServiceRequestMockMvc.perform(get("/api/service-requests/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceRequest() throws Exception {
        // Initialize the database
        serviceRequestRepository.saveAndFlush(serviceRequest);

        int databaseSizeBeforeUpdate = serviceRequestRepository.findAll().size();

        // Update the serviceRequest
        ServiceRequest updatedServiceRequest = serviceRequestRepository.findById(serviceRequest.getId()).get();
        // Disconnect from session so that the updates on updatedServiceRequest are not directly saved in db
        em.detach(updatedServiceRequest);
        updatedServiceRequest
            .service(UPDATED_SERVICE)
            .amount(UPDATED_AMOUNT)
            .startTime(UPDATED_START_TIME)
            .endTime(UPDATED_END_TIME);
        ServiceRequestDTO serviceRequestDTO = serviceRequestMapper.toDto(updatedServiceRequest);

        restServiceRequestMockMvc.perform(put("/api/service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceRequest in the database
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeUpdate);
        ServiceRequest testServiceRequest = serviceRequestList.get(serviceRequestList.size() - 1);
        assertThat(testServiceRequest.getService()).isEqualTo(UPDATED_SERVICE);
        assertThat(testServiceRequest.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testServiceRequest.getStartTime()).isEqualTo(UPDATED_START_TIME);
        assertThat(testServiceRequest.getEndTime()).isEqualTo(UPDATED_END_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceRequest() throws Exception {
        int databaseSizeBeforeUpdate = serviceRequestRepository.findAll().size();

        // Create the ServiceRequest
        ServiceRequestDTO serviceRequestDTO = serviceRequestMapper.toDto(serviceRequest);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceRequestMockMvc.perform(put("/api/service-requests")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceRequest in the database
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceRequest() throws Exception {
        // Initialize the database
        serviceRequestRepository.saveAndFlush(serviceRequest);

        int databaseSizeBeforeDelete = serviceRequestRepository.findAll().size();

        // Get the serviceRequest
        restServiceRequestMockMvc.perform(delete("/api/service-requests/{id}", serviceRequest.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServiceRequest> serviceRequestList = serviceRequestRepository.findAll();
        assertThat(serviceRequestList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceRequest.class);
        ServiceRequest serviceRequest1 = new ServiceRequest();
        serviceRequest1.setId(1L);
        ServiceRequest serviceRequest2 = new ServiceRequest();
        serviceRequest2.setId(serviceRequest1.getId());
        assertThat(serviceRequest1).isEqualTo(serviceRequest2);
        serviceRequest2.setId(2L);
        assertThat(serviceRequest1).isNotEqualTo(serviceRequest2);
        serviceRequest1.setId(null);
        assertThat(serviceRequest1).isNotEqualTo(serviceRequest2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceRequestDTO.class);
        ServiceRequestDTO serviceRequestDTO1 = new ServiceRequestDTO();
        serviceRequestDTO1.setId(1L);
        ServiceRequestDTO serviceRequestDTO2 = new ServiceRequestDTO();
        assertThat(serviceRequestDTO1).isNotEqualTo(serviceRequestDTO2);
        serviceRequestDTO2.setId(serviceRequestDTO1.getId());
        assertThat(serviceRequestDTO1).isEqualTo(serviceRequestDTO2);
        serviceRequestDTO2.setId(2L);
        assertThat(serviceRequestDTO1).isNotEqualTo(serviceRequestDTO2);
        serviceRequestDTO1.setId(null);
        assertThat(serviceRequestDTO1).isNotEqualTo(serviceRequestDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(serviceRequestMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(serviceRequestMapper.fromId(null)).isNull();
    }
}
