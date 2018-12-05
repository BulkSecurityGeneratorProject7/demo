package org.demo.prestozoom.service.mapper;

import org.demo.prestozoom.domain.*;
import org.demo.prestozoom.service.dto.ClientLocationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ClientLocation and its DTO ClientLocationDTO.
 */
@Mapper(componentModel = "spring", uses = {ClientMapper.class})
public interface ClientLocationMapper extends EntityMapper<ClientLocationDTO, ClientLocation> {

    @Mapping(source = "client.id", target = "clientId")
    ClientLocationDTO toDto(ClientLocation clientLocation);

    @Mapping(source = "clientId", target = "client")
    ClientLocation toEntity(ClientLocationDTO clientLocationDTO);

    default ClientLocation fromId(Long id) {
        if (id == null) {
            return null;
        }
        ClientLocation clientLocation = new ClientLocation();
        clientLocation.setId(id);
        return clientLocation;
    }
}
