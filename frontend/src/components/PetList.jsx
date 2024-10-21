import React from 'react';
import PropTypes from 'prop-types';
import PetCard from './PetCard';

const PetList = ({ pets }) => {
    return (
        <div className="container">
            <div className="row">
                {pets.length === 0 ? (
                    <div className="col-12">
                        <p>No pets available for adoption at the moment.</p>
                    </div>
                ) : (
                    pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
                )}
            </div>
        </div>
    );
};

PetList.propTypes = {
    pets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            breed: PropTypes.string.isRequired,
            age: PropTypes.number.isRequired,
            description: PropTypes.string.isRequired,
            image_url: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default PetList;
