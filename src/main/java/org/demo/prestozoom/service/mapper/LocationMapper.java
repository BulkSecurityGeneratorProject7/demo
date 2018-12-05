package org.demo.prestozoom.service.mapper;

import org.demo.prestozoom.domain.*;
import org.demo.prestozoom.service.dto.LocationDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Location and its DTO LocationDTO.
 */
@Mapper(componentModel = "spring", uses = {CompanyMapper.class})
public interface LocationMapper extends EntityMapper<LocationDTO, Location> {

    @Mapping(source = "company.id", target = "companyId")
    LocationDTO toDto(Location location);

    @Mapping(source = "companyId", target = "company")
    Location toEntity(LocationDTO locationDTO);

    default Location fromId(Long id) {
        if (id == null) {
            return null;
        }
        Location location = new Location();
        location.setId(id);
        return location;
    }
}
