package com.prodigy.server.crud.service;

import com.prodigy.server.crud.model.Employees;
import com.prodigy.server.crud.repository.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for managing Employee-related operations.
 * Author: Badreddine
 **/
@Service
public class EmployeeService {

    @Autowired
    private EmployeesRepository employeeRepository;

    /**
     * Save a new employee or update an existing one.
     *
     * @param employee the employee entity to save or update
     * @return the saved/updated employee
     */
    public Employees saveOrUpdateEmployee(Employees employee) {
        return employeeRepository.save(employee);
    }

    /**
     * Retrieve an employee by their ID.
     *
     * @param id the employee ID
     * @return the employee entity, or null if not found
     */
    public Employees getEmployeeById(Integer id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));
    }

    /**
     * Delete an employee by their ID.
     *
     * @param id the employee ID
     */
    public void deleteEmployeeById(Integer id) {
        if (employeeRepository.existsById(id)) {
            employeeRepository.deleteById(id);
        } else {
            throw new RuntimeException("Cannot delete. Employee not found with ID: " + id);
        }
    }

    /**
     * Retrieve all employees.
     *
     * @return a list of all employees
     */
    public List<Employees> getAllEmployees() {
        return employeeRepository.findAll();
    }

    /**
     * Retrieve an employee by their email.
     *
     * @param email the employee email
     * @return the employee entity
     */
    public Employees getEmployeeByEmail(String email) {
        return Optional.ofNullable(employeeRepository.findByEmail(email))
                .orElseThrow(() -> new RuntimeException("Employee not found with email: " + email));
    }

    /**
     * Retrieve an employee by email along with their department details.
     *
     * @param email the employee email
     * @return the employee with department details
     */
    public Employees getEmployeeWithDepartmentByEmail(String email) {
        return employeeRepository.findByEmailWithDepartment(email)
                .orElseThrow(() -> new RuntimeException("Employee with department not found for email: " + email));
    }
}
