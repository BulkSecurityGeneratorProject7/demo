package org.demo.prestozoom.service;

import org.demo.prestozoom.service.dto.ClientLocationDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ClientLocation.
 */
public interface ClientLocationService {

    /**
     * Save a clientLocation.
     *
     * @param clientLocationDTO the entity to save
     * @return the persisted entity
     */
    ClientLocationDTO save(ClientLocationDTO clientLocationDTO);

    /**
     * Get all the clientLocations.
     *
     * @return the list of entities
     */
    List<ClientLocationDTO> findAll();


    /**
     * Get the "id" clientLocation.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ClientLocationDTO> findOne(Long id);

    /**
     * Delete the "id" clientLocation.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
