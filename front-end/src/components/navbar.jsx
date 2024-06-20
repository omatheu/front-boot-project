// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './style/navbar.css'; 
import Logo from '../imgs/boot_logo.png';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <img onClick={() => window.location.href = 'about'} src={Logo} alt="Logo" className="navbar-logo" />
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/input" className={({ isActive }) => isActive ? 'active' : ''}>Simulation</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
