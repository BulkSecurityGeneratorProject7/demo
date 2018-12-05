package org.demo.prestozoom.service.dto;

import java.time.Instant;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ServiceRequestCart entity.
 */
public class ServiceRequestCartDTO implements Serializable {

    private Long id;

    private String description;

    private Instant date;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ServiceRequestCartDTO serviceRequestCartDTO = (ServiceRequestCartDTO) o;
        if (serviceRequestCartDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceRequestCartDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceRequestCartDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
