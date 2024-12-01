package com.prodigy.server.crud.repository;

import com.prodigy.server.crud.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * @author badreddine
 **/
@Repository
public interface EmployeesRepository extends JpaRepository<Employees, Integer> {

    // Find employee by email
    Employees findByEmail(String email);

    // Find employee by email with associated department
    @Query("SELECT e FROM Employees e JOIN FETCH e.department WHERE e.email = :email")
    Optional<Employees> findByEmailWithDepartment(@Param("email") String email);
}
