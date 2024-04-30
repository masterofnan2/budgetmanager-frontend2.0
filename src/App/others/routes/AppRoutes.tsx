import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import GuestRoutes from "./GuestRoutes";
import Auth from "../../Components/Auth/Auth";
import Login from "../../Components/Auth/Components/Login/Login";
import Signup from "../../Components/Auth/Components/Signup/Signup";
import Home from "../../Components/Home/Home";
import Dashboard from "../../Components/Dashboard/Dashboard";
import Overview from "../../Components/Dashboard/Components/Dynamic/Overview/Overview";
import Budget from "../../Components/Dashboard/Components/Dynamic/Budget/Budget";
import useSelector from "../storage/core/useSelector";
import Categories from "../../Components/Dashboard/Components/Dynamic/Categories/Categories";
import Confirmation from "../../Components/Auth/Components/Confirmation/Confirmation";
import { User } from "../constants/dataTypes";
import useAuthenticateUser from "../api/hooks/useAuthenticateUser";
import PasswordForgotten from "../../Components/Auth/Components/PasswordForgotten/PasswordForgotten";
import ResetPassword from "../../Components/Auth/Components/ResetPassword/ResetPassword";

const AppRoutes = React.memo(() => {

    const user = useSelector(state => state.user) as User;
    const authenticate = useAuthenticateUser();

    React.useEffect(() => {
        (user === null) && authenticate();
    }, [user]);

    if (user !== null) {
        return <Routes>
            <Route element={<Home />} path='/' />
            <Route element={<AuthRoutes />} path='/'>
                <Route element={<Auth />} path='/auth'>
                    <Route element={<Confirmation />} path="confirmation" />
                </Route>

                <Route element={<Dashboard />} path='dashboard'>
                    <Route index element={<Overview />} />
                    <Route element={<Budget />} path='budget' />
                    <Route element={<Categories />} path='categories' />
                </Route>
            </Route>
            <Route element={<GuestRoutes />} path='/'>
                <Route element={<Auth />} path='auth'>
                    <Route element={<Login />} path="login" />
                    <Route element={<Signup />} path="signup" />
                    <Route element={<PasswordForgotten />} path="password-forgotten" />
                    <Route element={<ResetPassword />} path="reset-password/:token" />
                </Route>
            </Route>
        </Routes>
    }
})

export default AppRoutes;