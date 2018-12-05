package org.demo.prestozoom.service;

import org.demo.prestozoom.service.dto.ServiceRequestCartDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ServiceRequestCart.
 */
public interface ServiceRequestCartService {

    /**
     * Save a serviceRequestCart.
     *
     * @param serviceRequestCartDTO the entity to save
     * @return the persisted entity
     */
    ServiceRequestCartDTO save(ServiceRequestCartDTO serviceRequestCartDTO);

    /**
     * Get all the serviceRequestCarts.
     *
     * @return the list of entities
     */
    List<ServiceRequestCartDTO> findAll();


    /**
     * Get the "id" serviceRequestCart.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ServiceRequestCartDTO> findOne(Long id);

    /**
     * Delete the "id" serviceRequestCart.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
