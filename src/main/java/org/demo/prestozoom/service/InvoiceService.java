package org.demo.prestozoom.service;

import org.demo.prestozoom.service.dto.InvoiceDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Invoice.
 */
public interface InvoiceService {

    /**
     * Save a invoice.
     *
     * @param invoiceDTO the entity to save
     * @return the persisted entity
     */
    InvoiceDTO save(InvoiceDTO invoiceDTO);

    /**
     * Get all the invoices.
     *
     * @return the list of entities
     */
    List<InvoiceDTO> findAll();


    /**
     * Get the "id" invoice.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<InvoiceDTO> findOne(Long id);

    /**
     * Delete the "id" invoice.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
