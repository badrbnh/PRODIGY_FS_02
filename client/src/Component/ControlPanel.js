import SideBar from "./SideBar";
import Operations from "./Operations";
import EmployeeControl from "./EmployeeControl";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {EmployeeProvider} from "../app/context/EmployeeProvider";


export default function ControlPanel() {
    const user = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className={"flex"}>
            <SideBar/>
            <div className={"w-full p-2"}>
                <EmployeeProvider >
                <Operations/>
                <EmployeeControl/>
                </EmployeeProvider>
            </div>
        </div>
    )
}