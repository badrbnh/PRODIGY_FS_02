package com.prodigy.server.crud.dto;

import com.prodigy.server.crud.model.Department;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author badreddine
 **/
@Data
public class DepartmentDto {

    private Integer id;
    private String name;
    private String description;

    public DepartmentDto(Department department) {
        this.id = department.getId();
        this.name = department.getName();
        this.description = department.getDescription();
    }

}
