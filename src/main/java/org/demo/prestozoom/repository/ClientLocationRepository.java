package org.demo.prestozoom.repository;

import org.demo.prestozoom.domain.ClientLocation;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ClientLocation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientLocationRepository extends JpaRepository<ClientLocation, Long> {

}
