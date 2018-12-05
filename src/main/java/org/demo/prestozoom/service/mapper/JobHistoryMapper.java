package org.demo.prestozoom.service.mapper;

import org.demo.prestozoom.domain.*;
import org.demo.prestozoom.service.dto.JobHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity JobHistory and its DTO JobHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {JobMapper.class, DepartmentMapper.class, EmployeeMapper.class, InvoiceMapper.class})
public interface JobHistoryMapper extends EntityMapper<JobHistoryDTO, JobHistory> {

    @Mapping(source = "job.id", target = "jobId")
    @Mapping(source = "department.id", target = "departmentId")
    @Mapping(source = "employee.id", target = "employeeId")
    @Mapping(source = "invoice.id", target = "invoiceId")
    JobHistoryDTO toDto(JobHistory jobHistory);

    @Mapping(source = "jobId", target = "job")
    @Mapping(source = "departmentId", target = "department")
    @Mapping(source = "employeeId", target = "employee")
    @Mapping(source = "invoiceId", target = "invoice")
    JobHistory toEntity(JobHistoryDTO jobHistoryDTO);

    default JobHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        JobHistory jobHistory = new JobHistory();
        jobHistory.setId(id);
        return jobHistory;
    }
}
