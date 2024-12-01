import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useEffect, useState } from "react";
import { Backdrop } from "@mui/material";
import { SlPencil } from "react-icons/sl";
import { useEmployeeContext } from "../../app/context/EmployeeProvider";
import { fetchAllDepartments } from "../../app/services/departmentService";
import { updateEmployee, fetchAllEmployees } from "../../app/services/employeeService";

export default function EditModal() {
    const { selectedEmployee, setEmployees, setSelectedEmployee } = useEmployeeContext();
    const [open, setOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
        department: { id: "" },
        position: "",
        salary: "",
    });

    const handleClose = () => {
        setOpen(false);
        setSelectedEmployee(null);
    };

    const handleOpen = () => {
        if (selectedEmployee) {
            setFormData({
                firstName: selectedEmployee.firstName || "",
                lastName: selectedEmployee.lastName || "",
                email: selectedEmployee.email || "",
                address: selectedEmployee.address || "",
                phone: selectedEmployee.phone || "",
                department: { id: selectedEmployee.department?.id || "" },
                position: selectedEmployee.position || "",
                salary: selectedEmployee.salary || "",
            });
        }
        setOpen(true);
    };

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await fetchAllDepartments();
                setDepartments(data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };
        fetchDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "department") {
            setFormData((prevData) => ({
                ...prevData,
                department: { id: value },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(selectedEmployee.id, formData);
            setOpen(false);
            const updatedEmployees = await fetchAllEmployees();
            setEmployees(updatedEmployees);
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    };

    return (
        <>
            <button onClick={handleOpen} className={"flex p-3 items-center justify-center gap-1 bg-amber-500 rounded-3xl"}>
                <p className={"font-semibold"}>Edit employee</p>
                <SlPencil />
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <div className="modal-content bg-amber-50 p-6 rounded-lg shadow-lg">
                        <h1 className="text-center text-lg font-bold mb-4">Edit Employee</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <input
                                    className={`h-8 rounded-lg bg-amber-50 px-2 text-sm `}
                                    value={formData.firstName}
                                    placeholder="First Name"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                />
                                <input
                                    className={`h-8 rounded-lg bg-amber-50 px-2 text-sm`}
                                    value={formData.lastName}
                                    placeholder="Last Name"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                />
                                <input
                                    className={`h-8 rounded-lg bg-amber-50 px-2 text-sm`}
                                    value={formData.email}
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                />
                                <input
                                    className={`h-8 rounded-lg bg-amber-50 px-2 text-sm`}
                                    value={formData.address}
                                    placeholder="Address"
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                />
                                <input
                                    className={`h-8 rounded-lg bg-amber-50 px-2 text-sm`}
                                    value={formData.phone}
                                    placeholder="Phone"
                                    type="tel"
                                    name="phone"
                                    onChange={handleChange}
                                />
                                <select
                                    name="department"
                                    className="w-full h-8 rounded-lg bg-amber-50 px-2 text-sm"
                                    value={formData.department.id}
                                    onChange={handleChange}
                                >
                                    <option value="">Select department</option>
                                    {departments.map((dept) => (
                                        <option key={dept.id} value={dept.id}>
                                            {dept.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    className={`h-8 rounded-lg bg-amber-50 px-2 text-sm`}
                                    value={formData.position}
                                    placeholder="Position"
                                    type="text"
                                    name="position"
                                    onChange={handleChange}
                                />
                                <input
                                    className={`h-8 rounded-lg bg-amber-50 px-2 text-sm`}
                                    value={formData.salary}
                                    placeholder="Salary"
                                    type="number"
                                    name="salary"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={"flex gap-2"}>
                            <button
                                type="submit"
                                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleClose}
                                className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                            </div>
                        </form>

                    </div>
                </Fade>
            </Modal>
            <style>{`
                .modal-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 400px;
                    width: 90%;
                }
            `}</style>
        </>
    );
}
