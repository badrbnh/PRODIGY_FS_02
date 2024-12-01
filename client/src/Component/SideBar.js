
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {logout, reset} from "../app/features/auth/authSlice";
export default function SideBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCLick = () => {
        dispatch(logout());
        dispatch(reset());
        navigate("/");
    }
    const userProfiles = [
        {
            id: 1,
            name: "John Doe",
            email: "John@doe.a",
            phone: "1234567890",
            address: "123 Main St, City, State, 12345",
            department: "IT",
            position: "Manager",
            salary: 100000,
            status: "Active",
            picture: "https://randomuser.me/api/portraits",
        }];

    return (
        <div className={" flex flex-col py-2 w-1/5 bg-slate-400 h-screen"}>
            <div className={"flex gap-4 items-center mx-4"}>
                <div>
                    <img src={userProfiles[0].picture} alt="profile" className={"w-16 h-16 bg-amber-50 rounded-full mx-auto mt-4"} />
                </div>
                <div className={"flex flex-col gap-1"}>
                    <p className={"text-amber-50 font-bold text-xl"}>{userProfiles[0].name}</p>
                    <p className={"text-blue-950"}>{userProfiles[0].position}</p>
                </div>
            </div>
            <ul className={"flex flex-col gap-4 p-4"}>
                <li className={"text-white font-bold text-lg"}>Employees</li>
                <li className={"text-white font-bold text-lg"}>Departments</li>
            </ul>

            <button onClick={handleCLick} className={" bg-blue-950 text-amber-50 font-bold text-xl rounded-3xl mx-4 h-12 w-2/4"}>Logout</button>
        </div>
    )
}