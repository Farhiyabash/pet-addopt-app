import React, { useEffect, useState } from 'react';
import { fetchPets } from '../services/PetService';
import { getUserProfile } from '../services/userService';
import PetList from '../components/PetList';
import Spinner from '../components/Spinner'; // Spinner component for loading states
import Alert from '../components/Alert'; // Alert component for error handling
import HomeNavbar from '../components/HomeNavbar'; // Import the HomeNavbar component
import './PetsPage.css';

const PetsPage = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null); // State to hold user profile

    useEffect(() => {
        const loadPets = async () => {
            try {
                const petsData = await fetchPets();
                setPets(petsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfile(data); // Set the profile state
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        loadPets();
        fetchProfile(); // Fetch profile data
    }, []);

    if (loading) return <Spinner />;
    if (error) return <Alert message={error} />;

    return (
        <div className="pets-page">
            <HomeNavbar /> {/* Display the navigation bar */}
            <div className="container mt-5">
                {profile && (
                    <div className="alert alert-success text-center mt-3">
                        <h2 className="welcome-message animated bounce">
                            Welcome back, {profile.name}! Your pawsome adventure starts now! Let’s find your next furry friend!
                        </h2>
                    </div>
                )}
                <h1 className="adoption-header text-center animated fadeIn">These are the Adoption Pets!</h1>
                <PetList pets={pets} />
            </div>
        </div>
    );
};

export default PetsPage;
