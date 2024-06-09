import { useState } from "react";
import { CiHome } from "react-icons/ci";
import { useNavigate } from "react-router";
import './NavigationBar.css';  // Import the CSS file

const NavigationBar = ({ children, onFilter }) => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('');

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilter(value);
        onFilter(value);
    }

    const handleNavigate = (route) => {
        navigate('/' + route);
    }

    return (
        <div className="navigation-bar">
            <div className="navigation-content">
                <div className="navigation-links">
                    <div onClick={() => handleNavigate("")} className="navigation-link">
                        <CiHome className="home-icon" />
                        <p>Dashboard</p>
                    </div>
                    <div onClick={() => handleNavigate("register")} className="navigation-link">
                        <p>Registro</p>
                    </div>
                </div>
                <input
                    className="filter-input"
                    type='text'
                    placeholder="Filtrar por nombre"
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>
            {children}
        </div>
    );
};

export default NavigationBar;
