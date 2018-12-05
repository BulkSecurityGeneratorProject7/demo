package org.demo.prestozoom.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import org.demo.prestozoom.domain.enumeration.Service;

/**
 * A ServiceRequest.
 */
@Entity
@Table(name = "service_request")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ServiceRequest implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "service")
    private Service service;

    @Column(name = "amount")
    private Double amount;

    @Column(name = "start_time")
    private ZonedDateTime startTime;

    @Column(name = "end_time")
    private ZonedDateTime endTime;

    @OneToOne    @JoinColumn(unique = true)
    private Invoice invoice;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Job jobOrder;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ClientLocation clientLocation;

    @ManyToOne
    @JsonIgnoreProperties("")
    private ServiceRequestCart cartNo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Service getService() {
        return service;
    }

    public ServiceRequest service(Service service) {
        this.service = service;
        return this;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public Double getAmount() {
        return amount;
    }

    public ServiceRequest amount(Double amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public ZonedDateTime getStartTime() {
        return startTime;
    }

    public ServiceRequest startTime(ZonedDateTime startTime) {
        this.startTime = startTime;
        return this;
    }

    public void setStartTime(ZonedDateTime startTime) {
        this.startTime = startTime;
    }

    public ZonedDateTime getEndTime() {
        return endTime;
    }

    public ServiceRequest endTime(ZonedDateTime endTime) {
        this.endTime = endTime;
        return this;
    }

    public void setEndTime(ZonedDateTime endTime) {
        this.endTime = endTime;
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public ServiceRequest invoice(Invoice invoice) {
        this.invoice = invoice;
        return this;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public Job getJobOrder() {
        return jobOrder;
    }

    public ServiceRequest jobOrder(Job job) {
        this.jobOrder = job;
        return this;
    }

    public void setJobOrder(Job job) {
        this.jobOrder = job;
    }

    public ClientLocation getClientLocation() {
        return clientLocation;
    }

    public ServiceRequest clientLocation(ClientLocation clientLocation) {
        this.clientLocation = clientLocation;
        return this;
    }

    public void setClientLocation(ClientLocation clientLocation) {
        this.clientLocation = clientLocation;
    }

    public ServiceRequestCart getCartNo() {
        return cartNo;
    }

    public ServiceRequest cartNo(ServiceRequestCart serviceRequestCart) {
        this.cartNo = serviceRequestCart;
        return this;
    }

    public void setCartNo(ServiceRequestCart serviceRequestCart) {
        this.cartNo = serviceRequestCart;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ServiceRequest serviceRequest = (ServiceRequest) o;
        if (serviceRequest.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), serviceRequest.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ServiceRequest{" +
            "id=" + getId() +
            ", service='" + getService() + "'" +
            ", amount=" + getAmount() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            "}";
    }
}
