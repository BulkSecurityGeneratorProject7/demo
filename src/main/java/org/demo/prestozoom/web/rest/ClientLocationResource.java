package org.demo.prestozoom.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.demo.prestozoom.service.ClientLocationService;
import org.demo.prestozoom.web.rest.errors.BadRequestAlertException;
import org.demo.prestozoom.web.rest.util.HeaderUtil;
import org.demo.prestozoom.service.dto.ClientLocationDTO;
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
 * REST controller for managing ClientLocation.
 */
@RestController
@RequestMapping("/api")
public class ClientLocationResource {

    private final Logger log = LoggerFactory.getLogger(ClientLocationResource.class);

    private static final String ENTITY_NAME = "clientLocation";

    private final ClientLocationService clientLocationService;

    public ClientLocationResource(ClientLocationService clientLocationService) {
        this.clientLocationService = clientLocationService;
    }

    /**
     * POST  /client-locations : Create a new clientLocation.
     *
     * @param clientLocationDTO the clientLocationDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new clientLocationDTO, or with status 400 (Bad Request) if the clientLocation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/client-locations")
    @Timed
    public ResponseEntity<ClientLocationDTO> createClientLocation(@RequestBody ClientLocationDTO clientLocationDTO) throws URISyntaxException {
        log.debug("REST request to save ClientLocation : {}", clientLocationDTO);
        if (clientLocationDTO.getId() != null) {
            throw new BadRequestAlertException("A new clientLocation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClientLocationDTO result = clientLocationService.save(clientLocationDTO);
        return ResponseEntity.created(new URI("/api/client-locations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /client-locations : Updates an existing clientLocation.
     *
     * @param clientLocationDTO the clientLocationDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated clientLocationDTO,
     * or with status 400 (Bad Request) if the clientLocationDTO is not valid,
     * or with status 500 (Internal Server Error) if the clientLocationDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/client-locations")
    @Timed
    public ResponseEntity<ClientLocationDTO> updateClientLocation(@RequestBody ClientLocationDTO clientLocationDTO) throws URISyntaxException {
        log.debug("REST request to update ClientLocation : {}", clientLocationDTO);
        if (clientLocationDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClientLocationDTO result = clientLocationService.save(clientLocationDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, clientLocationDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /client-locations : get all the clientLocations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of clientLocations in body
     */
    @GetMapping("/client-locations")
    @Timed
    public List<ClientLocationDTO> getAllClientLocations() {
        log.debug("REST request to get all ClientLocations");
        return clientLocationService.findAll();
    }

    /**
     * GET  /client-locations/:id : get the "id" clientLocation.
     *
     * @param id the id of the clientLocationDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the clientLocationDTO, or with status 404 (Not Found)
     */
    @GetMapping("/client-locations/{id}")
    @Timed
    public ResponseEntity<ClientLocationDTO> getClientLocation(@PathVariable Long id) {
        log.debug("REST request to get ClientLocation : {}", id);
        Optional<ClientLocationDTO> clientLocationDTO = clientLocationService.findOne(id);
        return ResponseUtil.wrapOrNotFound(clientLocationDTO);
    }

    /**
     * DELETE  /client-locations/:id : delete the "id" clientLocation.
     *
     * @param id the id of the clientLocationDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/client-locations/{id}")
    @Timed
    public ResponseEntity<Void> deleteClientLocation(@PathVariable Long id) {
        log.debug("REST request to delete ClientLocation : {}", id);
        clientLocationService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
