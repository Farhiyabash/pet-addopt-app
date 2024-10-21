// src/components/ReviewList.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const ReviewList = ({ reviews }) => {
    return (
        <div>
            <h2 className="text-dark">Reviews</h2>
            {reviews.map((review) => (
                <Card className="mb-3" key={review.id}>
                    <Card.Body>
                        <Card.Title>{review.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Rating: {review.rating}</Card.Subtitle>
                        <Card.Text>{review.content}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default ReviewList;
