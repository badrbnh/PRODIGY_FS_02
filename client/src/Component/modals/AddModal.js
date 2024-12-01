import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { VscAdd } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { Backdrop } from "@mui/material";
import { fetchAllDepartments } from "../../app/services/departmentService";
import { addEmployee } from "../../app/services/employeeService";
import {useEmployeeContext} from "../../app/context/EmployeeProvider";
import {fetchAllEmployees} from "../../app/services/employeeService";

export default function AddModal() {
    const { setEmployees } = useEmployeeContext();
    const [open, setOpen] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        department: { id: "" },
        position: "",
        salary: "",
        address: "",
        phone: "",
    });

    const { firstName, lastName, email, department, position, salary, address, phone } = formData;

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

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
            await addEmployee(formData);
            setOpen(false);
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                department: { id: "" },
                position: "",
                salary: "",
                address: "",
                phone: ""
            });
            const updatedEmployees = await fetchAllEmployees();
            setEmployees(updatedEmployees);
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="flex p-3 items-center justify-center gap-1 bg-green-500 rounded-3xl"
            >
                <p className="font-semibold">Add employee</p>
                <VscAdd />
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
                    <div className="modal-content bg-amber-100 p-6 rounded-lg shadow-lg">
                        <h1 className="text-center text-lg font-bold mb-4">Add Employee</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <input
                                    className="h-8 rounded-lg bg-amber-50 px-2 text-sm"
                                    value={firstName}
                                    placeholder="First name"
                                    type="text"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="h-8 rounded-lg bg-amber-50 px-2 text-sm"
                                    value={lastName}
                                    placeholder="Last name"
                                    type="text"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="h-8 rounded-lg bg-amber-50 px-2 text-sm"
                                    value={email}
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="h-8 rounded-lg bg-amber-50 px-2 text-sm"
                                    value={address}
                                    placeholder="Address"
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="h-8 rounded-lg bg-amber-50 px-2 text-sm"
                                    value={phone}
                                    placeholder="Phone"
                                    type="tel"
                                    name="phone"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="w-full">
                                    <select
                                        name="department"
                                        className="w-full h-8 rounded-lg bg-amber-50 px-2 text-sm"
                                        value={department.id} // Use department.id as the value
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select department</option>
                                        {departments.map((dept) => (
                                            <option key={dept.id} value={dept.id}>
                                                {dept.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <input
                                    className="h-8 rounded-lg bg-amber-50 px-2 text-sm"
                                    value={position}
                                    placeholder="Position"
                                    type="text"
                                    name="position"
                                    onChange={handleChange}
                                    required
                                />
                                <input
                                    className="h-8 rounded-lg bg-amber-50 px-2 text-sm"
                                    value={salary}
                                    placeholder="Salary"
                                    type="number"
                                    name="salary"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className={"flex gap-2"}>
                            <button
                                type="submit"
                                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg"
                            >
                                Add Employee
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
