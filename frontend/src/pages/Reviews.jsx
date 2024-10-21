import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Reviews.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Reviews = () => {
  const [customerReviews, setCustomerReviews] = useState([]);
  const [userProfiles, setUserProfiles] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const petId = 1; 

  const emojiOptions = ['😊', '😍', '🔥', '❤️', '😢', '😡', '😂', '✨', '👍', '🎉'];

  useEffect(() => {
    const fetchReviewsAndUsers = async () => {
      try {
        const [reviewsResponse, usersResponse] = await Promise.all([
          fetch('http://127.0.0.1:5000/reviews'),
          fetch('http://127.0.0.1:5000/users'),
        ]);

        if (!reviewsResponse.ok || !usersResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const reviewsData = await reviewsResponse.json();
        const usersData = await usersResponse.json();

        setCustomerReviews(reviewsData);
        setUserProfiles(usersData);
      } catch (error) {
        console.error('Error fetching reviews or users:', error);
        setErrorMessage('Could not load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsAndUsers();
  }, []);

  const handleReviewSubmission = async (e) => {
    e.preventDefault();
    if (!reviewContent.trim()) {
      setErrorMessage('Review content cannot be empty.');
      return;
    }

    if (userProfiles.length === 0) {
      setErrorMessage('No users available to submit a review.');
      return;
    }

    const randomUserId = userProfiles[Math.floor(Math.random() * userProfiles.length)].id;

    const newReview = {
      content: reviewContent,
      rating: reviewRating,
      user_id: randomUserId,
      pet_id: petId,
      likes: 0,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setCustomerReviews((prevReviews) => [...prevReviews, { ...data, liked: false }]);
      setReviewContent('');
      setReviewRating(5);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrorMessage('Could not submit review.');
    }
  };

  const handleLikeToggle = async (reviewId) => {
    const updatedReviews = customerReviews.map((review) => {
      if (review.id === reviewId) {
        const newLikedStatus = !review.liked;
        return {
          ...review,
          likes: newLikedStatus ? review.likes + 1 : review.likes - 1,
          liked: newLikedStatus,
        };
      }
      return review;
    });

    setCustomerReviews(updatedReviews);

    try {
      await fetch(`http://127.0.0.1:5000/reviews/${reviewId}/like`, {
        method: 'PATCH',
      });
    } catch (error) {
      console.error('Error updating like count:', error);
    }
  };

  const handleReviewDeletion = async (reviewId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setCustomerReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      setErrorMessage('Could not delete review.');
    }
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible((prev) => !prev);
  };

  const addEmojiToReview = (emoji) => {
    setReviewContent((prevContent) => prevContent + emoji);
    setIsEmojiPickerVisible(false);
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Customer Reviews</h1>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleReviewSubmission} className="mb-4 border p-3 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="review" className="form-label">Your Review</label>
          <div className="input-group">
            <ReactQuill
              value={reviewContent}
              onChange={setReviewContent}
              theme="snow"
              modules={{ toolbar: false }}
              className="review-input flex-grow-1 border"
              placeholder="Write your review here..."
            />
            <div className="emoji-container">
              <button type="button" className="btn btn-light emoji-btn" onClick={toggleEmojiPicker}>
                😊
              </button>
              {isEmojiPickerVisible && (
                <div className="emoji-picker shadow-sm">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="emoji-option btn btn-light"
                      onClick={() => addEmojiToReview(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="rating" className="form-label">Your Rating (1-5)</label>
          <input
            type="number"
            className="form-control"
            id="rating"
            min="1"
            max="5"
            value={reviewRating}
            onChange={(e) => setReviewRating(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
      <div className="reviews-list mt-4">
        <h2>User Reviews</h2>
        {customerReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          customerReviews.map((review) => {
            const user = userProfiles.find((user) => user.id === review.user_id);
            return (
              <div key={review.id} className="review mb-4 p-3 border rounded shadow-sm">
                <div dangerouslySetInnerHTML={{ __html: review.content }} />
                <p className="mt-2">
                  <small>
                    Rating: {review.rating} | By: {user ? user.name : 'Anonymous'}
                  </small>
                </p>
                <div className="review-actions">
                  <button
                    className={`btn ${review.liked ? 'btn-success' : 'btn-outline-success'} me-2`}
                    onClick={() => handleLikeToggle(review.id)}
                  >
                    <i className="fas fa-thumbs-up"></i> {review.likes}
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleReviewDeletion(review.id)}
                  >
                    <i className="fas fa-trash-alt"></i> Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Reviews;