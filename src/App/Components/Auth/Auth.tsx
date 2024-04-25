import { Outlet } from "react-router-dom";
import budgetManagementImage from './assets/images/budget-management.png';

const Auth = () => {
    return <main className="auth-container">
        <div className="auth-left-side">
            <div className="shadow-container"></div>
        </div>
        <div className="auth-right-side">
            <div className="logo-container">
                <img
                    src={budgetManagementImage} />
                <h3 className="logo-title">budgetmanager</h3>
            </div>
            <Outlet />
        </div>
    </main>
}

export default Auth;