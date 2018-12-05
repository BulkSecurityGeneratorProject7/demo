package org.demo.prestozoom.service.impl;

import org.demo.prestozoom.service.ClientLocationService;
import org.demo.prestozoom.domain.ClientLocation;
import org.demo.prestozoom.repository.ClientLocationRepository;
import org.demo.prestozoom.service.dto.ClientLocationDTO;
import org.demo.prestozoom.service.mapper.ClientLocationMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ClientLocation.
 */
@Service
@Transactional
public class ClientLocationServiceImpl implements ClientLocationService {

    private final Logger log = LoggerFactory.getLogger(ClientLocationServiceImpl.class);

    private final ClientLocationRepository clientLocationRepository;

    private final ClientLocationMapper clientLocationMapper;

    public ClientLocationServiceImpl(ClientLocationRepository clientLocationRepository, ClientLocationMapper clientLocationMapper) {
        this.clientLocationRepository = clientLocationRepository;
        this.clientLocationMapper = clientLocationMapper;
    }

    /**
     * Save a clientLocation.
     *
     * @param clientLocationDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ClientLocationDTO save(ClientLocationDTO clientLocationDTO) {
        log.debug("Request to save ClientLocation : {}", clientLocationDTO);

        ClientLocation clientLocation = clientLocationMapper.toEntity(clientLocationDTO);
        clientLocation = clientLocationRepository.save(clientLocation);
        return clientLocationMapper.toDto(clientLocation);
    }

    /**
     * Get all the clientLocations.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ClientLocationDTO> findAll() {
        log.debug("Request to get all ClientLocations");
        return clientLocationRepository.findAll().stream()
            .map(clientLocationMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one clientLocation by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ClientLocationDTO> findOne(Long id) {
        log.debug("Request to get ClientLocation : {}", id);
        return clientLocationRepository.findById(id)
            .map(clientLocationMapper::toDto);
    }

    /**
     * Delete the clientLocation by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ClientLocation : {}", id);
        clientLocationRepository.deleteById(id);
    }
}
