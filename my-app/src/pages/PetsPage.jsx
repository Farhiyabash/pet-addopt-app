import React, { useEffect, useState } from 'react';
import { fetchPets } from '../services/PetService';
import { getUserProfile } from '../services/userService';
import PetList from '../components/PetList';
import Spinner from '../components/Spinner'; 
import Alert from '../components/Alert'; 
import HomeNavbar from '../components/HomeNavbar'; 
import './PetsPage.css';

const PetsPage = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null); 

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
                setProfile(data); 
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        loadPets();
        fetchProfile(); 
    }, []);

    if (loading) return <Spinner />;
    if (error) return <Alert message={error} />;

    return (
        <div className="pets-page">
            <HomeNavbar /> 
            <div className="container mt-5">
                {profile && (
                    <div className="alert alert-success text-center mt-3 profile-prompt animated bounce">
                        <h2>
                            Welcome back, <span className="profile-name">{profile.name}</span>! Your pawsome adventure starts now! Let’s find your next furry friend!
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
