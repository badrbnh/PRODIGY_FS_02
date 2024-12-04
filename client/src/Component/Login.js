
import { useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login, reset} from "../app/features/auth/authSlice";


export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const {email, password} = formData;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData( (prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            email, password
        }
        dispatch(login(userData));
    }

    useEffect(() => {
        if (isError) {
            console.log(message);
        }
        if (isSuccess || user) {
            console.log("User registered successfully");
            navigate("/control-panel");
        }

    }, [isError, isSuccess, user, dispatch, navigate])



    return (
        <div className={" h-screen bg-gray-800 text-amber-50"}>
            <div className={"flex flex-col gap-8 w-full items-center justify-center h-full"}>
                <div className={"flex flex-col justify-center items-center gap-2 w-2/4"}>
                    <h1 className={"text-4xl"}>Welcome back!!</h1>
                    <p className={"text-xl"}>Login to your account</p>
                </div>
                <form onSubmit={handleSubmit} method={"POST"}  className={"flex flex-col justify-center items-center gap-6 w-2/4"}>
                    <div className={"flex w-2/4 flex-col gap-2"}>
                        <label htmlFor={"email"}>Email</label>
                        <input id={"email"}  value={email} onChange={handleChange} autoComplete={"off"} required type="text" name="email" placeholder="example@mail.com" className={"h-10 w-full text-black rounded-xl px-2"}/>
                    </div>
                    <div className={"flex w-2/4 flex-col gap-2"}>
                        <label htmlFor={"password"}>Password</label>
                        <input id={"password"} value={password} onChange={handleChange} required type="password" name="password" placeholder="Password" className={"h-10 text-black w-full rounded-xl px-2"}/>
                    </div>
                    <button type="submit" className={"bg-blue-900 h-16 w-2/4 rounded-3xl text-xl font-bold "}>Login now</button>
                </form>
                <div className={"flex justify-center items-center w-2/4"}>
                    <p className={"w-2/4 text-slate-400"}>Don&apos;t have an account? <span className={"font-bold text-lg text-white"}><Link to={"/register"}>Create one now! </Link></span></p>
                </div>
                </div>
        </div>
    )
}