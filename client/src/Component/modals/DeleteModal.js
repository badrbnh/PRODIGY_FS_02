


import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { VscTrash} from "react-icons/vsc";
import { useState } from "react";
import { Backdrop } from "@mui/material";
import {useEmployeeContext} from "../../app/context/EmployeeProvider";
import {deleteEmployee, fetchAllEmployees} from "../../app/services/employeeService";


export default function DeleteModal() {
    const { setEmployees, selectedEmployee, setSelectedEmployee } = useEmployeeContext();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
        setSelectedEmployee(null);
    };
    const handleOpen = () => setOpen(true);


    const handleDelete = async () => {
        try {
            await deleteEmployee(selectedEmployee.id);
            const updatedEmployees = await fetchAllEmployees();
            setEmployees(updatedEmployees);
            handleClose();
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    };

    return (
        <>
            <button onClick={handleOpen} className={"flex p-3 items-center justify-center gap-1 bg-red-500 rounded-3xl"}>
                <p className={"font-semibold"}>Delete employee</p>
                <VscTrash/>
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <div
                        className="modal-content bg-amber-50 p-6 rounded-lg shadow-lg"
                    >
                        <h1 className="text-center text-lg font-bold mb-4">Delete Employee</h1>
                        <p className="text-center">Are sure you want to delete user</p>
                        <div className={"flex gap-2"}>
                            <button
                                onClick={handleDelete}
                                disabled={!selectedEmployee}
                                className={`mt-4 w-full py-2 px-4 rounded-lg text-white ${
                                    selectedEmployee ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"
                                }`}
                            >
                                Delete
                            </button>
                            <button
                                onClick={handleClose}
                                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>

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
