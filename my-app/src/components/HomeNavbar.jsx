import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/userService';
import './HomeNavbar.css'; // Import custom CSS for additional styling
import { FaUserCircle } from 'react-icons/fa'; // Importing an icon for the profile
import logo from '../assets/logo.png'; // Import your logo image here

const HomeNavbar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        setIsAuthenticated(false);
        navigate('/'); // Redirect to landing page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid">
                {/* Logo Button */}
                <Link to="/pets" className="navbar-brand text-dark d-flex align-items-center">
                    <img src={logo} alt="Pawsitive Connections Logo" className="logo" />
                    <span className="ms-2 fw-bold fs-4">Pawsitive Connections</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link text-uppercase fw-bold" to="/pets">Companions</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-uppercase fw-bold" to="/adoptions">Inquiry</Link>
                        </li>
                        <li className="nav-item">
                            <div className="profile-container">
                                <Link to="/profile" className="profile-icon-link">
                                    <FaUserCircle size={24} className="profile-icon" />
                                </Link>
                                <button className="btn btn-link logout-button" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HomeNavbar;
