package org.demo.prestozoom.service.mapper;

import org.demo.prestozoom.domain.*;
import org.demo.prestozoom.service.dto.ServiceRequestDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ServiceRequest and its DTO ServiceRequestDTO.
 */
@Mapper(componentModel = "spring", uses = {InvoiceMapper.class, JobMapper.class, ClientLocationMapper.class, ServiceRequestCartMapper.class})
public interface ServiceRequestMapper extends EntityMapper<ServiceRequestDTO, ServiceRequest> {

    @Mapping(source = "invoice.id", target = "invoiceId")
    @Mapping(source = "jobOrder.id", target = "jobOrderId")
    @Mapping(source = "clientLocation.id", target = "clientLocationId")
    @Mapping(source = "cartNo.id", target = "cartNoId")
    ServiceRequestDTO toDto(ServiceRequest serviceRequest);

    @Mapping(source = "invoiceId", target = "invoice")
    @Mapping(source = "jobOrderId", target = "jobOrder")
    @Mapping(source = "clientLocationId", target = "clientLocation")
    @Mapping(source = "cartNoId", target = "cartNo")
    ServiceRequest toEntity(ServiceRequestDTO serviceRequestDTO);

    default ServiceRequest fromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceRequest serviceRequest = new ServiceRequest();
        serviceRequest.setId(id);
        return serviceRequest;
    }
}
