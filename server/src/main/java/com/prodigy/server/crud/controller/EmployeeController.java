package com.prodigy.server.crud.controller;

import com.prodigy.server.crud.dto.EmployeesDto;
import com.prodigy.server.crud.model.Department;
import com.prodigy.server.crud.model.Employees;
import com.prodigy.server.crud.repository.DepartmentRepository;
import com.prodigy.server.crud.service.DepartmentService;
import com.prodigy.server.crud.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author badreddine
 **/
@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;


    @Autowired
    private DepartmentRepository departmentRepository;


    // Get all employees
    @GetMapping("/all")
    public ResponseEntity<List<EmployeesDto>> getAllEmployees() {
        List<Employees> employees = employeeService.getAllEmployees(); // Get Employees entities
        List<EmployeesDto> employeeDtos = employees.stream()
                .map(employee -> new EmployeesDto(employee)) // Convert entities to DTOs
                .collect(Collectors.toList());
        return ResponseEntity.ok(employeeDtos);
    }


    // Get an employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeesDto> getEmployeeById(@PathVariable Integer id) {
        Employees employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new EmployeesDto(employee));
    }

    // Delete an employee by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployeeById(@PathVariable Integer id) {
        Employees employee = employeeService.getEmployeeById(id);
        if (employee == null) {
            return ResponseEntity.notFound().build();
        }
        employeeService.deleteEmployeeById(id);
        return ResponseEntity.ok("Employee with ID " + id + " has been deleted.");
    }

    // Save or update an employee
    @PostMapping("/")
    public ResponseEntity<EmployeesDto> saveEmployee(@RequestBody Employees employee) {
        // Check if the department exists
        if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
            Department department = departmentRepository.findById(employee.getDepartment().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            employee.setDepartment(department);
        }

        Employees savedEmployee = employeeService.saveOrUpdateEmployee(employee);
        return ResponseEntity.ok(new EmployeesDto(savedEmployee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeesDto> updateEmployee(@PathVariable Integer id, @RequestBody Employees employee) {
        Employees existingEmployee = employeeService.getEmployeeById(id);
        if (existingEmployee == null) {
            return ResponseEntity.notFound().build();
        }

        // Check if the department exists
        if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
            Department department = departmentRepository.findById(employee.getDepartment().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            employee.setDepartment(department);
        }

        employee.setId(id);
        Employees updatedEmployee = employeeService.saveOrUpdateEmployee(employee);
        return ResponseEntity.ok(new EmployeesDto(updatedEmployee));
    }


}
