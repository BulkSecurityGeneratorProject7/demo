package org.demo.prestozoom.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.Objects;
import org.demo.prestozoom.domain.enumeration.Service;

/**
 * A DTO for the ServiceRequest entity.
 */
public class ServiceRequestDTO implements Serializable {

    private Long id;

    private Service service;

    private Double amount;

    private ZonedDateTime startTime;

    private ZonedDateTime endTime;

    private Long invoiceId;

    private Long jobOrderId;

    private Long clientLocationId;

    private Long cartNoId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Long getJobOrderId() {
        return jobOrderId;
    }

    public void setJobOrderId(Long jobId) {
        this.jobOrderId = jobId;
    }

    public Long getClientLocationId() {
        return clientLocationId;
    }

    public void setClientLocationId(Long clientLocationId) {
        this.clientLocationId = clientLocationId;
    }

    public Long getCartNoId() {
        return cartNoId;
    }

    public void setCartNoId(Long serviceRequestCartId) {
        this.cartNoId = serviceRequestCartId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ServiceRequestDTO serviceRequestDTO = (ServiceRequestDTO) o;
        if (serviceRequestDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceRequestDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceRequestDTO{" +
            "id=" + getId() +
            ", service='" + getService() + "'" +
            ", amount=" + getAmount() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", invoice=" + getInvoiceId() +
            ", jobOrder=" + getJobOrderId() +
            ", clientLocation=" + getClientLocationId() +
            ", cartNo=" + getCartNoId() +
            "}";
    }
}
