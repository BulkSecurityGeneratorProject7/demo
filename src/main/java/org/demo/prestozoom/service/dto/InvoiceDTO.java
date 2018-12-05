package org.demo.prestozoom.service.dto;

import java.io.Serializable;
import java.util.Objects;
import org.demo.prestozoom.domain.enumeration.Payment;

/**
 * A DTO for the Invoice entity.
 */
public class InvoiceDTO implements Serializable {

    private Long id;

    private Long amount;

    private Payment payment;

    private Long serviceRequestId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Long getServiceRequestId() {
        return serviceRequestId;
    }

    public void setServiceRequestId(Long serviceRequestId) {
        this.serviceRequestId = serviceRequestId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        InvoiceDTO invoiceDTO = (InvoiceDTO) o;
        if (invoiceDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), invoiceDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "InvoiceDTO{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", payment='" + getPayment() + "'" +
            ", serviceRequest=" + getServiceRequestId() +
            "}";
    }
}
