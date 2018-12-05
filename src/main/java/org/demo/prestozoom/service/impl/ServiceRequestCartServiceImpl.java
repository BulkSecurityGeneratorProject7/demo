package org.demo.prestozoom.service.impl;

import org.demo.prestozoom.service.ServiceRequestCartService;
import org.demo.prestozoom.domain.ServiceRequestCart;
import org.demo.prestozoom.repository.ServiceRequestCartRepository;
import org.demo.prestozoom.service.dto.ServiceRequestCartDTO;
import org.demo.prestozoom.service.mapper.ServiceRequestCartMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing ServiceRequestCart.
 */
@Service
@Transactional
public class ServiceRequestCartServiceImpl implements ServiceRequestCartService {

    private final Logger log = LoggerFactory.getLogger(ServiceRequestCartServiceImpl.class);

    private final ServiceRequestCartRepository serviceRequestCartRepository;

    private final ServiceRequestCartMapper serviceRequestCartMapper;

    public ServiceRequestCartServiceImpl(ServiceRequestCartRepository serviceRequestCartRepository, ServiceRequestCartMapper serviceRequestCartMapper) {
        this.serviceRequestCartRepository = serviceRequestCartRepository;
        this.serviceRequestCartMapper = serviceRequestCartMapper;
    }

    /**
     * Save a serviceRequestCart.
     *
     * @param serviceRequestCartDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ServiceRequestCartDTO save(ServiceRequestCartDTO serviceRequestCartDTO) {
        log.debug("Request to save ServiceRequestCart : {}", serviceRequestCartDTO);

        ServiceRequestCart serviceRequestCart = serviceRequestCartMapper.toEntity(serviceRequestCartDTO);
        serviceRequestCart = serviceRequestCartRepository.save(serviceRequestCart);
        return serviceRequestCartMapper.toDto(serviceRequestCart);
    }

    /**
     * Get all the serviceRequestCarts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ServiceRequestCartDTO> findAll() {
        log.debug("Request to get all ServiceRequestCarts");
        return serviceRequestCartRepository.findAll().stream()
            .map(serviceRequestCartMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one serviceRequestCart by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ServiceRequestCartDTO> findOne(Long id) {
        log.debug("Request to get ServiceRequestCart : {}", id);
        return serviceRequestCartRepository.findById(id)
            .map(serviceRequestCartMapper::toDto);
    }

    /**
     * Delete the serviceRequestCart by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ServiceRequestCart : {}", id);
        serviceRequestCartRepository.deleteById(id);
    }
}
