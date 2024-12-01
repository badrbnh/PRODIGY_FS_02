package com.prodigy.server.crud.service;

import com.prodigy.server.crud.model.Department;
import com.prodigy.server.crud.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class for managing Department-related operations.
 * Author: Badreddine
 **/
@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    /**
     * Save a new department or update an existing one.
     *
     * @param department the department entity to save or update
     * @return the saved/updated department entity
     */
    public Department saveOrUpdateDepartment(Department department) {
        return departmentRepository.save(department);
    }

    /**
     * Retrieve a department by its ID.
     *
     * @param departmentId the ID of the department
     * @return the department entity
     * @throws RuntimeException if no department with the given ID is found
     */
    public Department getDepartmentById(Integer departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found with ID: " + departmentId));
    }

    /**
     * Delete a department by its ID.
     *
     * @param departmentId the ID of the department to delete
     * @throws RuntimeException if no department with the given ID exists
     */
    public void deleteDepartmentById(Integer departmentId) {
        if (departmentRepository.existsById(departmentId)) {
            departmentRepository.deleteById(departmentId);
        } else {
            throw new RuntimeException("Cannot delete. Department not found with ID: " + departmentId);
        }
    }

    /**
     * Retrieve all departments.
     *
     * @return a list of all departments
     */
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }
}
