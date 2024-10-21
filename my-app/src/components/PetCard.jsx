import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './PetCard.css';

const PetCard = ({ pet }) => {
    return (
        <div className="col-md-4 mb-4">
            <div className="card pet-card h-100 shadow-sm rounded">
                <img 
                    src={pet.image_url || 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} 
                    alt={pet.name ? `${pet.name} the ${pet.breed}` : 'Unknown Pet'} 
                    className="card-img-top pet-image" 
                />
                <div className="card-body">
                    <h5 className="card-title">{pet.name || 'Unknown Pet'}</h5>
                    <p className="card-text"><strong>Pet ID:</strong> {pet.id}</p> 
                    <Link to={`/pets/${pet.id}`} className="btn btn-primary adopt-button">View Details</Link>
                </div>
            </div>
        </div>
    );
};

PetCard.propTypes = {
    pet: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        breed: PropTypes.string,
        age: PropTypes.number,
        description: PropTypes.string,
        image_url: PropTypes.string,
    }).isRequired,
};

export default PetCard;
