import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAllEmployees } from "../services/employeeService";

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);


    useEffect(() => {
        async function loadEmployees() {
            try {
                const data = await fetchAllEmployees();
                setEmployees(data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        }
        loadEmployees();
    }, []);

    return (
        <EmployeeContext.Provider
            value={{
                employees,
                setEmployees,
                selectedEmployee,
                setSelectedEmployee,
            }}
        >
            {children}
        </EmployeeContext.Provider>
    );
}

export function useEmployeeContext() {
    return useContext(EmployeeContext);
}
