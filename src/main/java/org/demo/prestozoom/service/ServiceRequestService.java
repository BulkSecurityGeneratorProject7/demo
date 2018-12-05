package org.demo.prestozoom.service;

import org.demo.prestozoom.service.dto.ServiceRequestDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ServiceRequest.
 */
public interface ServiceRequestService {

    /**
     * Save a serviceRequest.
     *
     * @param serviceRequestDTO the entity to save
     * @return the persisted entity
     */
    ServiceRequestDTO save(ServiceRequestDTO serviceRequestDTO);

    /**
     * Get all the serviceRequests.
     *
     * @return the list of entities
     */
    List<ServiceRequestDTO> findAll();


    /**
     * Get the "id" serviceRequest.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ServiceRequestDTO> findOne(Long id);

    /**
     * Delete the "id" serviceRequest.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
