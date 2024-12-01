package com.prodigy.server.crud.repository;

import com.prodigy.server.crud.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author badreddine
 **/
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    @NonNull
    Optional<Department> findById(@NonNull Integer id);  // Return type should be Optional<Department>
}
