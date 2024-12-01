package com.prodigy.server.crud.dto;

import com.prodigy.server.crud.model.Employees;
import lombok.Data;
import lombok.RequiredArgsConstructor;

/**
 * @author badreddine
 **/

@Data
public class EmployeesDto {

        private Integer id;
        private String firstName;
        private String lastName;
        private String position;
        private String email;
        private String phone;
        private String address;
        private Integer Salary;
        private String departmentName;



        public EmployeesDto(Employees employees) {
            this.id = employees.getId();
            this.firstName = employees.getFirstName();
            this.lastName = employees.getLastName();
            this.email = employees.getEmail();
            this.phone = employees.getPhone();
            this.address = employees.getAddress();
            this.Salary = employees.getSalary();
            this.position = employees.getPosition();
            this.departmentName = employees.getDepartment().getName();

        }

}
