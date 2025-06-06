import React, { useState } from 'react';
import './FeedbackModal.css';
import { FaStar } from 'react-icons/fa'; // Import star icon

// Accept program, isOpen, onClose, currentUser, and onSubmitFeedback props
const FeedbackModal = ({ isOpen, onClose, program, currentUser, onSubmitFeedback }) => {
  // State to manage feedback input
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // Assuming rating is a number, e.g., 0-5
  const [hoverRating, setHoverRating] = useState(0); // State for handling hover effect on stars

  // If modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  // Handle rating change (by clicking on a star)
  const handleClickStar = (value) => {
      setRating(value);
  };

  // Handle hover over a star
  const handleMouseEnter = (value) => {
      setHoverRating(value);
  };

  // Handle mouse leaving the star area
  const handleMouseLeave = () => {
      setHoverRating(0); // Reset hover state
  };

  // Handle comment change
  const handleCommentChange = (e) => {
      setComment(e.target.value);
  };

  // Handle feedback submission
  const handleSubmitFeedback = () => {
      // Basic validation (optional, but good practice)
      // if (rating === 0) {
      //     alert('Vui lòng chọn số sao đánh giá.');
      //     return;
      // }
      // Comment can be empty based on ERD (N)

      // Call the onSubmitFeedback prop passed from the parent
      if (onSubmitFeedback) {
          onSubmitFeedback(program.id, currentUser.userId, rating, comment);
      }

      // Close the modal after submission
      onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}> {/* Click outside to close */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing */}
        <div className="modal-header">
          <h2>Phản hồi về chương trình</h2>
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {program ? (
            <>
              <h3>{program.title}</h3>
              <p className="modal-program-info">Chương trình: {program.title}</p>

              {/* Feedback Form Elements */}
              <div className="feedback-form">
                {/* Rating with Stars */}
                <div className="form-group">
                    <label>Đánh giá:</label>
                    <div className="star-rating" onMouseLeave={handleMouseLeave}> {/* Add mouse leave handler here */}
                        {[...Array(5)].map((star, index) => {
                            const ratingValue = index + 1;
                            return (
                                <label key={index}>
                                    {/* Hidden radio button for accessibility/form submission if needed */}
                                    {/* <input 
                                        type="radio" 
                                        name="rating" 
                                        value={ratingValue} 
                                        onClick={() => handleClickStar(ratingValue)}
                                        style={{ display: 'none' }}
                                    /> */}
                                    <FaStar
                                        className="star"
                                        // Determine star color based on hover or selected rating
                                        color={ratingValue <= (hoverRating || rating) ? "#ffc107" : "#e4e5e9"} // Yellow for filled, grey for empty
                                        size={30}
                                        onMouseEnter={() => handleMouseEnter(ratingValue)}
                                        onClick={() => handleClickStar(ratingValue)} // Add click handler
                                    />
                                </label>
                            );
                        })}
                    </div>
                </div>
                
                {/* Comment Textarea */}
                <div className="form-group">
                    <label htmlFor="comment">Nhận xét:</label>
                    <textarea 
                        id="comment" 
                        rows="4" 
                        value={comment} 
                        onChange={handleCommentChange}
                        placeholder="Viết nhận xét của bạn về chương trình..."
                    />
                </div>
              </div>
              
            </>
          ) : (
            <p>Không tìm thấy thông tin chương trình.</p>
          )}
          
          {/* Submit button */}
          <div className="modal-footer-actions">
             <button className="submit-feedback-button" onClick={handleSubmitFeedback}>Gửi Phản hồi</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal; 