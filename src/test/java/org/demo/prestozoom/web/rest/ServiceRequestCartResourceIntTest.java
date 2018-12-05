package org.demo.prestozoom.web.rest;

import org.demo.prestozoom.PrestozoomApp;

import org.demo.prestozoom.domain.ServiceRequestCart;
import org.demo.prestozoom.repository.ServiceRequestCartRepository;
import org.demo.prestozoom.service.ServiceRequestCartService;
import org.demo.prestozoom.service.dto.ServiceRequestCartDTO;
import org.demo.prestozoom.service.mapper.ServiceRequestCartMapper;
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
import java.time.temporal.ChronoUnit;
import java.util.List;


import static org.demo.prestozoom.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ServiceRequestCartResource REST controller.
 *
 * @see ServiceRequestCartResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrestozoomApp.class)
public class ServiceRequestCartResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private ServiceRequestCartRepository serviceRequestCartRepository;

    @Autowired
    private ServiceRequestCartMapper serviceRequestCartMapper;

    @Autowired
    private ServiceRequestCartService serviceRequestCartService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restServiceRequestCartMockMvc;

    private ServiceRequestCart serviceRequestCart;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ServiceRequestCartResource serviceRequestCartResource = new ServiceRequestCartResource(serviceRequestCartService);
        this.restServiceRequestCartMockMvc = MockMvcBuilders.standaloneSetup(serviceRequestCartResource)
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
    public static ServiceRequestCart createEntity(EntityManager em) {
        ServiceRequestCart serviceRequestCart = new ServiceRequestCart()
            .description(DEFAULT_DESCRIPTION)
            .date(DEFAULT_DATE);
        return serviceRequestCart;
    }

    @Before
    public void initTest() {
        serviceRequestCart = createEntity(em);
    }

    @Test
    @Transactional
    public void createServiceRequestCart() throws Exception {
        int databaseSizeBeforeCreate = serviceRequestCartRepository.findAll().size();

        // Create the ServiceRequestCart
        ServiceRequestCartDTO serviceRequestCartDTO = serviceRequestCartMapper.toDto(serviceRequestCart);
        restServiceRequestCartMockMvc.perform(post("/api/service-request-carts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestCartDTO)))
            .andExpect(status().isCreated());

        // Validate the ServiceRequestCart in the database
        List<ServiceRequestCart> serviceRequestCartList = serviceRequestCartRepository.findAll();
        assertThat(serviceRequestCartList).hasSize(databaseSizeBeforeCreate + 1);
        ServiceRequestCart testServiceRequestCart = serviceRequestCartList.get(serviceRequestCartList.size() - 1);
        assertThat(testServiceRequestCart.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testServiceRequestCart.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createServiceRequestCartWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = serviceRequestCartRepository.findAll().size();

        // Create the ServiceRequestCart with an existing ID
        serviceRequestCart.setId(1L);
        ServiceRequestCartDTO serviceRequestCartDTO = serviceRequestCartMapper.toDto(serviceRequestCart);

        // An entity with an existing ID cannot be created, so this API call must fail
        restServiceRequestCartMockMvc.perform(post("/api/service-request-carts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestCartDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceRequestCart in the database
        List<ServiceRequestCart> serviceRequestCartList = serviceRequestCartRepository.findAll();
        assertThat(serviceRequestCartList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllServiceRequestCarts() throws Exception {
        // Initialize the database
        serviceRequestCartRepository.saveAndFlush(serviceRequestCart);

        // Get all the serviceRequestCartList
        restServiceRequestCartMockMvc.perform(get("/api/service-request-carts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(serviceRequestCart.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getServiceRequestCart() throws Exception {
        // Initialize the database
        serviceRequestCartRepository.saveAndFlush(serviceRequestCart);

        // Get the serviceRequestCart
        restServiceRequestCartMockMvc.perform(get("/api/service-request-carts/{id}", serviceRequestCart.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(serviceRequestCart.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingServiceRequestCart() throws Exception {
        // Get the serviceRequestCart
        restServiceRequestCartMockMvc.perform(get("/api/service-request-carts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateServiceRequestCart() throws Exception {
        // Initialize the database
        serviceRequestCartRepository.saveAndFlush(serviceRequestCart);

        int databaseSizeBeforeUpdate = serviceRequestCartRepository.findAll().size();

        // Update the serviceRequestCart
        ServiceRequestCart updatedServiceRequestCart = serviceRequestCartRepository.findById(serviceRequestCart.getId()).get();
        // Disconnect from session so that the updates on updatedServiceRequestCart are not directly saved in db
        em.detach(updatedServiceRequestCart);
        updatedServiceRequestCart
            .description(UPDATED_DESCRIPTION)
            .date(UPDATED_DATE);
        ServiceRequestCartDTO serviceRequestCartDTO = serviceRequestCartMapper.toDto(updatedServiceRequestCart);

        restServiceRequestCartMockMvc.perform(put("/api/service-request-carts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestCartDTO)))
            .andExpect(status().isOk());

        // Validate the ServiceRequestCart in the database
        List<ServiceRequestCart> serviceRequestCartList = serviceRequestCartRepository.findAll();
        assertThat(serviceRequestCartList).hasSize(databaseSizeBeforeUpdate);
        ServiceRequestCart testServiceRequestCart = serviceRequestCartList.get(serviceRequestCartList.size() - 1);
        assertThat(testServiceRequestCart.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testServiceRequestCart.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingServiceRequestCart() throws Exception {
        int databaseSizeBeforeUpdate = serviceRequestCartRepository.findAll().size();

        // Create the ServiceRequestCart
        ServiceRequestCartDTO serviceRequestCartDTO = serviceRequestCartMapper.toDto(serviceRequestCart);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restServiceRequestCartMockMvc.perform(put("/api/service-request-carts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(serviceRequestCartDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ServiceRequestCart in the database
        List<ServiceRequestCart> serviceRequestCartList = serviceRequestCartRepository.findAll();
        assertThat(serviceRequestCartList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteServiceRequestCart() throws Exception {
        // Initialize the database
        serviceRequestCartRepository.saveAndFlush(serviceRequestCart);

        int databaseSizeBeforeDelete = serviceRequestCartRepository.findAll().size();

        // Get the serviceRequestCart
        restServiceRequestCartMockMvc.perform(delete("/api/service-request-carts/{id}", serviceRequestCart.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ServiceRequestCart> serviceRequestCartList = serviceRequestCartRepository.findAll();
        assertThat(serviceRequestCartList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceRequestCart.class);
        ServiceRequestCart serviceRequestCart1 = new ServiceRequestCart();
        serviceRequestCart1.setId(1L);
        ServiceRequestCart serviceRequestCart2 = new ServiceRequestCart();
        serviceRequestCart2.setId(serviceRequestCart1.getId());
        assertThat(serviceRequestCart1).isEqualTo(serviceRequestCart2);
        serviceRequestCart2.setId(2L);
        assertThat(serviceRequestCart1).isNotEqualTo(serviceRequestCart2);
        serviceRequestCart1.setId(null);
        assertThat(serviceRequestCart1).isNotEqualTo(serviceRequestCart2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ServiceRequestCartDTO.class);
        ServiceRequestCartDTO serviceRequestCartDTO1 = new ServiceRequestCartDTO();
        serviceRequestCartDTO1.setId(1L);
        ServiceRequestCartDTO serviceRequestCartDTO2 = new ServiceRequestCartDTO();
        assertThat(serviceRequestCartDTO1).isNotEqualTo(serviceRequestCartDTO2);
        serviceRequestCartDTO2.setId(serviceRequestCartDTO1.getId());
        assertThat(serviceRequestCartDTO1).isEqualTo(serviceRequestCartDTO2);
        serviceRequestCartDTO2.setId(2L);
        assertThat(serviceRequestCartDTO1).isNotEqualTo(serviceRequestCartDTO2);
        serviceRequestCartDTO1.setId(null);
        assertThat(serviceRequestCartDTO1).isNotEqualTo(serviceRequestCartDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(serviceRequestCartMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(serviceRequestCartMapper.fromId(null)).isNull();
    }
}
