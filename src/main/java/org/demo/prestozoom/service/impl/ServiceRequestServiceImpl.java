package org.demo.prestozoom.service.impl;

import org.demo.prestozoom.service.ServiceRequestService;
import org.demo.prestozoom.domain.ServiceRequest;
import org.demo.prestozoom.repository.ServiceRequestRepository;
import org.demo.prestozoom.service.dto.ServiceRequestDTO;
import org.demo.prestozoom.service.mapper.ServiceRequestMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ServiceRequest.
 */
@Service
@Transactional
public class ServiceRequestServiceImpl implements ServiceRequestService {

    private final Logger log = LoggerFactory.getLogger(ServiceRequestServiceImpl.class);

    private final ServiceRequestRepository serviceRequestRepository;

    private final ServiceRequestMapper serviceRequestMapper;

    public ServiceRequestServiceImpl(ServiceRequestRepository serviceRequestRepository, ServiceRequestMapper serviceRequestMapper) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.serviceRequestMapper = serviceRequestMapper;
    }

    /**
     * Save a serviceRequest.
     *
     * @param serviceRequestDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ServiceRequestDTO save(ServiceRequestDTO serviceRequestDTO) {
        log.debug("Request to save ServiceRequest : {}", serviceRequestDTO);

        ServiceRequest serviceRequest = serviceRequestMapper.toEntity(serviceRequestDTO);
        serviceRequest = serviceRequestRepository.save(serviceRequest);
        return serviceRequestMapper.toDto(serviceRequest);
    }

    /**
     * Get all the serviceRequests.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ServiceRequestDTO> findAll() {
        log.debug("Request to get all ServiceRequests");
        return serviceRequestRepository.findAll().stream()
            .map(serviceRequestMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one serviceRequest by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ServiceRequestDTO> findOne(Long id) {
        log.debug("Request to get ServiceRequest : {}", id);
        return serviceRequestRepository.findById(id)
            .map(serviceRequestMapper::toDto);
    }

    /**
     * Delete the serviceRequest by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceRequest : {}", id);
        serviceRequestRepository.deleteById(id);
    }
}
