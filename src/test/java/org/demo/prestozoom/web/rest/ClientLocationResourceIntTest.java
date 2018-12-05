package org.demo.prestozoom.web.rest;

import org.demo.prestozoom.PrestozoomApp;

import org.demo.prestozoom.domain.ClientLocation;
import org.demo.prestozoom.repository.ClientLocationRepository;
import org.demo.prestozoom.service.ClientLocationService;
import org.demo.prestozoom.service.dto.ClientLocationDTO;
import org.demo.prestozoom.service.mapper.ClientLocationMapper;
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
import java.util.List;


import static org.demo.prestozoom.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ClientLocationResource REST controller.
 *
 * @see ClientLocationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PrestozoomApp.class)
public class ClientLocationResourceIntTest {

    private static final String DEFAULT_STREET_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_STREET_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_POSTAL_CODE = "AAAAAAAAAA";
    private static final String UPDATED_POSTAL_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_STATE_PROVINCE = "AAAAAAAAAA";
    private static final String UPDATED_STATE_PROVINCE = "BBBBBBBBBB";

    @Autowired
    private ClientLocationRepository clientLocationRepository;

    @Autowired
    private ClientLocationMapper clientLocationMapper;

    @Autowired
    private ClientLocationService clientLocationService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restClientLocationMockMvc;

    private ClientLocation clientLocation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ClientLocationResource clientLocationResource = new ClientLocationResource(clientLocationService);
        this.restClientLocationMockMvc = MockMvcBuilders.standaloneSetup(clientLocationResource)
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
    public static ClientLocation createEntity(EntityManager em) {
        ClientLocation clientLocation = new ClientLocation()
            .streetAddress(DEFAULT_STREET_ADDRESS)
            .postalCode(DEFAULT_POSTAL_CODE)
            .city(DEFAULT_CITY)
            .stateProvince(DEFAULT_STATE_PROVINCE);
        return clientLocation;
    }

    @Before
    public void initTest() {
        clientLocation = createEntity(em);
    }

    @Test
    @Transactional
    public void createClientLocation() throws Exception {
        int databaseSizeBeforeCreate = clientLocationRepository.findAll().size();

        // Create the ClientLocation
        ClientLocationDTO clientLocationDTO = clientLocationMapper.toDto(clientLocation);
        restClientLocationMockMvc.perform(post("/api/client-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientLocationDTO)))
            .andExpect(status().isCreated());

        // Validate the ClientLocation in the database
        List<ClientLocation> clientLocationList = clientLocationRepository.findAll();
        assertThat(clientLocationList).hasSize(databaseSizeBeforeCreate + 1);
        ClientLocation testClientLocation = clientLocationList.get(clientLocationList.size() - 1);
        assertThat(testClientLocation.getStreetAddress()).isEqualTo(DEFAULT_STREET_ADDRESS);
        assertThat(testClientLocation.getPostalCode()).isEqualTo(DEFAULT_POSTAL_CODE);
        assertThat(testClientLocation.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testClientLocation.getStateProvince()).isEqualTo(DEFAULT_STATE_PROVINCE);
    }

    @Test
    @Transactional
    public void createClientLocationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientLocationRepository.findAll().size();

        // Create the ClientLocation with an existing ID
        clientLocation.setId(1L);
        ClientLocationDTO clientLocationDTO = clientLocationMapper.toDto(clientLocation);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientLocationMockMvc.perform(post("/api/client-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientLocationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClientLocation in the database
        List<ClientLocation> clientLocationList = clientLocationRepository.findAll();
        assertThat(clientLocationList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllClientLocations() throws Exception {
        // Initialize the database
        clientLocationRepository.saveAndFlush(clientLocation);

        // Get all the clientLocationList
        restClientLocationMockMvc.perform(get("/api/client-locations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientLocation.getId().intValue())))
            .andExpect(jsonPath("$.[*].streetAddress").value(hasItem(DEFAULT_STREET_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].postalCode").value(hasItem(DEFAULT_POSTAL_CODE.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].stateProvince").value(hasItem(DEFAULT_STATE_PROVINCE.toString())));
    }
    
    @Test
    @Transactional
    public void getClientLocation() throws Exception {
        // Initialize the database
        clientLocationRepository.saveAndFlush(clientLocation);

        // Get the clientLocation
        restClientLocationMockMvc.perform(get("/api/client-locations/{id}", clientLocation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(clientLocation.getId().intValue()))
            .andExpect(jsonPath("$.streetAddress").value(DEFAULT_STREET_ADDRESS.toString()))
            .andExpect(jsonPath("$.postalCode").value(DEFAULT_POSTAL_CODE.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.stateProvince").value(DEFAULT_STATE_PROVINCE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingClientLocation() throws Exception {
        // Get the clientLocation
        restClientLocationMockMvc.perform(get("/api/client-locations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClientLocation() throws Exception {
        // Initialize the database
        clientLocationRepository.saveAndFlush(clientLocation);

        int databaseSizeBeforeUpdate = clientLocationRepository.findAll().size();

        // Update the clientLocation
        ClientLocation updatedClientLocation = clientLocationRepository.findById(clientLocation.getId()).get();
        // Disconnect from session so that the updates on updatedClientLocation are not directly saved in db
        em.detach(updatedClientLocation);
        updatedClientLocation
            .streetAddress(UPDATED_STREET_ADDRESS)
            .postalCode(UPDATED_POSTAL_CODE)
            .city(UPDATED_CITY)
            .stateProvince(UPDATED_STATE_PROVINCE);
        ClientLocationDTO clientLocationDTO = clientLocationMapper.toDto(updatedClientLocation);

        restClientLocationMockMvc.perform(put("/api/client-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientLocationDTO)))
            .andExpect(status().isOk());

        // Validate the ClientLocation in the database
        List<ClientLocation> clientLocationList = clientLocationRepository.findAll();
        assertThat(clientLocationList).hasSize(databaseSizeBeforeUpdate);
        ClientLocation testClientLocation = clientLocationList.get(clientLocationList.size() - 1);
        assertThat(testClientLocation.getStreetAddress()).isEqualTo(UPDATED_STREET_ADDRESS);
        assertThat(testClientLocation.getPostalCode()).isEqualTo(UPDATED_POSTAL_CODE);
        assertThat(testClientLocation.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testClientLocation.getStateProvince()).isEqualTo(UPDATED_STATE_PROVINCE);
    }

    @Test
    @Transactional
    public void updateNonExistingClientLocation() throws Exception {
        int databaseSizeBeforeUpdate = clientLocationRepository.findAll().size();

        // Create the ClientLocation
        ClientLocationDTO clientLocationDTO = clientLocationMapper.toDto(clientLocation);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClientLocationMockMvc.perform(put("/api/client-locations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(clientLocationDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ClientLocation in the database
        List<ClientLocation> clientLocationList = clientLocationRepository.findAll();
        assertThat(clientLocationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClientLocation() throws Exception {
        // Initialize the database
        clientLocationRepository.saveAndFlush(clientLocation);

        int databaseSizeBeforeDelete = clientLocationRepository.findAll().size();

        // Get the clientLocation
        restClientLocationMockMvc.perform(delete("/api/client-locations/{id}", clientLocation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ClientLocation> clientLocationList = clientLocationRepository.findAll();
        assertThat(clientLocationList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientLocation.class);
        ClientLocation clientLocation1 = new ClientLocation();
        clientLocation1.setId(1L);
        ClientLocation clientLocation2 = new ClientLocation();
        clientLocation2.setId(clientLocation1.getId());
        assertThat(clientLocation1).isEqualTo(clientLocation2);
        clientLocation2.setId(2L);
        assertThat(clientLocation1).isNotEqualTo(clientLocation2);
        clientLocation1.setId(null);
        assertThat(clientLocation1).isNotEqualTo(clientLocation2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientLocationDTO.class);
        ClientLocationDTO clientLocationDTO1 = new ClientLocationDTO();
        clientLocationDTO1.setId(1L);
        ClientLocationDTO clientLocationDTO2 = new ClientLocationDTO();
        assertThat(clientLocationDTO1).isNotEqualTo(clientLocationDTO2);
        clientLocationDTO2.setId(clientLocationDTO1.getId());
        assertThat(clientLocationDTO1).isEqualTo(clientLocationDTO2);
        clientLocationDTO2.setId(2L);
        assertThat(clientLocationDTO1).isNotEqualTo(clientLocationDTO2);
        clientLocationDTO1.setId(null);
        assertThat(clientLocationDTO1).isNotEqualTo(clientLocationDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(clientLocationMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(clientLocationMapper.fromId(null)).isNull();
    }
}
