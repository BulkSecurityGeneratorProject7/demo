package org.demo.prestozoom.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.demo.prestozoom.service.ServiceRequestCartService;
import org.demo.prestozoom.web.rest.errors.BadRequestAlertException;
import org.demo.prestozoom.web.rest.util.HeaderUtil;
import org.demo.prestozoom.service.dto.ServiceRequestCartDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ServiceRequestCart.
 */
@RestController
@RequestMapping("/api")
public class ServiceRequestCartResource {

    private final Logger log = LoggerFactory.getLogger(ServiceRequestCartResource.class);

    private static final String ENTITY_NAME = "serviceRequestCart";

    private final ServiceRequestCartService serviceRequestCartService;

    public ServiceRequestCartResource(ServiceRequestCartService serviceRequestCartService) {
        this.serviceRequestCartService = serviceRequestCartService;
    }

    /**
     * POST  /service-request-carts : Create a new serviceRequestCart.
     *
     * @param serviceRequestCartDTO the serviceRequestCartDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new serviceRequestCartDTO, or with status 400 (Bad Request) if the serviceRequestCart has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/service-request-carts")
    @Timed
    public ResponseEntity<ServiceRequestCartDTO> createServiceRequestCart(@RequestBody ServiceRequestCartDTO serviceRequestCartDTO) throws URISyntaxException {
        log.debug("REST request to save ServiceRequestCart : {}", serviceRequestCartDTO);
        if (serviceRequestCartDTO.getId() != null) {
            throw new BadRequestAlertException("A new serviceRequestCart cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ServiceRequestCartDTO result = serviceRequestCartService.save(serviceRequestCartDTO);
        return ResponseEntity.created(new URI("/api/service-request-carts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /service-request-carts : Updates an existing serviceRequestCart.
     *
     * @param serviceRequestCartDTO the serviceRequestCartDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated serviceRequestCartDTO,
     * or with status 400 (Bad Request) if the serviceRequestCartDTO is not valid,
     * or with status 500 (Internal Server Error) if the serviceRequestCartDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/service-request-carts")
    @Timed
    public ResponseEntity<ServiceRequestCartDTO> updateServiceRequestCart(@RequestBody ServiceRequestCartDTO serviceRequestCartDTO) throws URISyntaxException {
        log.debug("REST request to update ServiceRequestCart : {}", serviceRequestCartDTO);
        if (serviceRequestCartDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ServiceRequestCartDTO result = serviceRequestCartService.save(serviceRequestCartDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, serviceRequestCartDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /service-request-carts : get all the serviceRequestCarts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of serviceRequestCarts in body
     */
    @GetMapping("/service-request-carts")
    @Timed
    public List<ServiceRequestCartDTO> getAllServiceRequestCarts() {
        log.debug("REST request to get all ServiceRequestCarts");
        return serviceRequestCartService.findAll();
    }

    /**
     * GET  /service-request-carts/:id : get the "id" serviceRequestCart.
     *
     * @param id the id of the serviceRequestCartDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the serviceRequestCartDTO, or with status 404 (Not Found)
     */
    @GetMapping("/service-request-carts/{id}")
    @Timed
    public ResponseEntity<ServiceRequestCartDTO> getServiceRequestCart(@PathVariable Long id) {
        log.debug("REST request to get ServiceRequestCart : {}", id);
        Optional<ServiceRequestCartDTO> serviceRequestCartDTO = serviceRequestCartService.findOne(id);
        return ResponseUtil.wrapOrNotFound(serviceRequestCartDTO);
    }

    /**
     * DELETE  /service-request-carts/:id : delete the "id" serviceRequestCart.
     *
     * @param id the id of the serviceRequestCartDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/service-request-carts/{id}")
    @Timed
    public ResponseEntity<Void> deleteServiceRequestCart(@PathVariable Long id) {
        log.debug("REST request to delete ServiceRequestCart : {}", id);
        serviceRequestCartService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
