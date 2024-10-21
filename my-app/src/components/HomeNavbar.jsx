import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/userService';
import './HomeNavbar.css'; // Import custom CSS for additional styling

const HomeNavbar = ({ setIsAuthenticated }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        setIsAuthenticated(false);
        navigate('/'); // Redirect to landing page
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm animated-navbar">
            <div className="container-fluid">
                <Link className="navbar-brand text-dark" to="/pets">Pawsitive Connections</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/pets">Pets</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorites">Favorites</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/reviews">Reviews</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/adoptions">Adoption Requests</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default HomeNavbar;
