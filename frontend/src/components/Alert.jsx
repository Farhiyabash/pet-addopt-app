// src/components/Alert.jsx

import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message, type }) => {
    return (
        <div className={`alert alert-${type}`} role="alert">
            {message}
        </div>
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'danger']).isRequired,
};

export default Alert;
