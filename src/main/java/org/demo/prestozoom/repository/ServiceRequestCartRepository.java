package org.demo.prestozoom.repository;

import org.demo.prestozoom.domain.ServiceRequestCart;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ServiceRequestCart entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ServiceRequestCartRepository extends JpaRepository<ServiceRequestCart, Long> {

}
