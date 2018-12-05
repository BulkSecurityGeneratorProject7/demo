package org.demo.prestozoom.service.mapper;

import org.demo.prestozoom.domain.*;
import org.demo.prestozoom.service.dto.InvoiceDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Invoice and its DTO InvoiceDTO.
 */
@Mapper(componentModel = "spring", uses = {ServiceRequestMapper.class})
public interface InvoiceMapper extends EntityMapper<InvoiceDTO, Invoice> {

    @Mapping(source = "serviceRequest.id", target = "serviceRequestId")
    InvoiceDTO toDto(Invoice invoice);

    @Mapping(source = "serviceRequestId", target = "serviceRequest")
    Invoice toEntity(InvoiceDTO invoiceDTO);

    default Invoice fromId(Long id) {
        if (id == null) {
            return null;
        }
        Invoice invoice = new Invoice();
        invoice.setId(id);
        return invoice;
    }
}
