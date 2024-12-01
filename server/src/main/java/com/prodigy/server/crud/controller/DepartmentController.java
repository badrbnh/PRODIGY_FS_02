package com.prodigy.server.crud.controller;

import com.prodigy.server.crud.dto.DepartmentDto;
import com.prodigy.server.crud.model.Department;
import com.prodigy.server.crud.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author badreddine
 **/

@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    /**
     * Get all departments
     *
     * @return a list of all departments
     */
    @GetMapping("/all")
    public ResponseEntity<List<DepartmentDto>> getAllDepartments() {
        List<Department> departments = (List<Department>) departmentService.getAllDepartments();
        List<DepartmentDto> departmentDtos = departments.stream()
                .map(department -> new DepartmentDto(department))
                .collect(Collectors.toList());
        return ResponseEntity.ok(departmentDtos);

    }


    /**
     * Get a department by its name
     *
     * @param Id the department name
     * @return the department entity
     */
    @GetMapping("/{id}")
    public ResponseEntity<DepartmentDto> getDepartmentById(@PathVariable Integer id) {
        Department department = departmentService.getDepartmentById(id);
        if (department == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(new DepartmentDto(department));
    }


    /**
     * Delete a department by its ID
     *
     * @param id the department ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDepartmentById(@PathVariable Integer id) {
        Department department = departmentService.getDepartmentById(id);
        if (department == null) {
            return ResponseEntity.notFound().build();
        }
        departmentService.deleteDepartmentById(id);
        return ResponseEntity.ok("Department with ID " + id + " has been deleted.");
    }

    /**
     * Save or update a department
     *
     * @param department the department entity to save or update
     * @return the saved/updated department entity
     */
    @PostMapping("/")
    public ResponseEntity<Department> saveOrUpdateDepartment(@RequestBody Department department) {
        Department savedDepartment = departmentService.saveOrUpdateDepartment(department);
        return ResponseEntity.ok(savedDepartment);
    }


}
