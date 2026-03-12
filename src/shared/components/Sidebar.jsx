import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '@/features/user/userSlice'

export default function Sidebar() {
    const user = useSelector(selectUser)

    const menuItems = [
        { path: '/', label: 'Dashboard', icon: 'bi-speedometer2' },
        { path: '/settings', label: 'Settings', icon: 'bi-gear' }
    ];


    return (
        <div className="d-flex flex-column h-100 p-3 flex-fill">
            <ul className="nav nav-pills flex-column mb-auto">
                {menuItems.map((item) => (
                    <li className="nav-item" key={item.label}>
                        <NavLink to={item.path} className={({ isActive }) => `nav-link gap-3 d-flex align-items-center ${isActive ? 'active' : ''}`}>
                            <i className={`bi ${item.icon}`}></i>
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="dropdown">
                <a href="#" className="d-flex btn btn-light align-items-center text-dark text-decoration-none dropdown-toggle" id="dropdownUser" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
                        <i className="bi bi-person text-primary"></i>
                    </div>
                    <strong className="text-truncate" style={{ maxWidth: '160px' }}>{user.name}</strong>
                </a>
                <ul className="dropdown-menu shadow w-100" aria-labelledby="dropdownUser">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>
    );
}