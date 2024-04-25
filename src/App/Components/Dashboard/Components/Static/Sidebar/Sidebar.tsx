import { Link, useLocation } from "react-router-dom";
import Icon from "../../../../../others/minicomponents/Icon/Icon";

const sidebarNavs = [
    {
        path: '/dashboard',
        title: 'dashboard',
        icon: 'budget-allocation'
    },
    {
        path: '/dashboard/budget',
        title: 'budget',
        icon: 'money-manager'
    },
    {
        path: '/dashboard/categories',
        title: 'categories',
        icon: 'category'
    },
];

const Sidebar = () => {
    const location = useLocation();

    return <aside className="dashboard-sidebar">
        <h1 className="navbar-brand"><Link to={'/dashboard'}>BudgetManager</Link></h1>

        <ul className="sidebar-nav">
            {sidebarNavs?.map(((sidebarNav, key) => <li
                key={key}
                className={location.pathname === sidebarNav.path ? 'active' : ''}>
                <Link to={sidebarNav.path}>
                    <Icon>{sidebarNav.icon}</Icon>{sidebarNav.title}
                </Link>
            </li>))}
        </ul>
    </aside>
}

export default Sidebar;