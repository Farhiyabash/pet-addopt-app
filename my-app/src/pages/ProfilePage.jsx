// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../services/userService';
import HomeNavbar from '../components/HomeNavbar';
import './ProfilePage.css'; // Import custom CSS for additional styling

const ProfilePage = ({ setIsAuthenticated }) => {
    const [profile, setProfile] = useState(null);
    
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div className="text-center mt-5"><h2>Loading...</h2></div>; // Show loading state
    }

    return (
        <div className="profile-page">
            <HomeNavbar setIsAuthenticated={setIsAuthenticated} />
            <div className="container mt-5">
                <div className="card shadow-lg border-0 animate__animated animate__fadeInUp">
                    <div className="card-body p-5 text-center">
                        <h1 className="card-title text-pink">Welcome, {profile.name}!</h1>
                        <p className="card-text">Email: <strong>{profile.email}</strong></p>
                        <hr />
                        <h5 className="card-subtitle mb-3 text-dark-pink">Profile Summary</h5>
                        <p className="card-text">
                            Here you can manage your account, view your favorite pets, and track your adoption requests.
                        </p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-dark-pink me-2">Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
