package org.demo.prestozoom.service.mapper;

import org.demo.prestozoom.domain.*;
import org.demo.prestozoom.service.dto.ServiceRequestCartDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ServiceRequestCart and its DTO ServiceRequestCartDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ServiceRequestCartMapper extends EntityMapper<ServiceRequestCartDTO, ServiceRequestCart> {



    default ServiceRequestCart fromId(Long id) {
        if (id == null) {
            return null;
        }
        ServiceRequestCart serviceRequestCart = new ServiceRequestCart();
        serviceRequestCart.setId(id);
        return serviceRequestCart;
    }
}
