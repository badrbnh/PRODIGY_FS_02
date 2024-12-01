import { useEmployeeContext } from "../app/context/EmployeeProvider";
import {useEffect} from "react";

export default function EmployeeControl() {
    const { employees, setSelectedEmployee, selectedEmployee } = useEmployeeContext();

    const handleSelect = (employee) => {
        setSelectedEmployee(employee);
    };
    // useEffect(() => {
    //     console.log("Employees Updated:", employees);
    // }, [employees]);


    return (
        <div>
            <table className="w-full rounded-3xl">
                <thead className="bg-slate-400 w-full h-12">
                {employees.length > 0 && (
                    <tr>
                        {Object.keys(employees[0]).map((key) => (
                            <th
                                className="border-r-stone-300 border font-bold text-lg"
                                key={key}
                            >
                                {key}
                            </th>
                        ))}
                    </tr>
                )}
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr
                        key={employee.id}
                        className={`h-10 ${
                            selectedEmployee?.id === employee.id
                                ? "bg-blue-300"
                                : "bg-slate-100"
                        }`}
                        onClick={() => handleSelect(employee)}
                    >
                        {Object.values(employee).map((value, index) => (
                            <td className="font-semibold px-2" key={index}>
                                {value}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
