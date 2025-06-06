import React from 'react';
import './ProgramCard.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';

const ProgramCard = ({ program, onRegisterClick, onViewFeedbackClick, isRegistered }) => {
  // Handle registration button click
  const handleRegisterClick = () => {
    // Only call onRegisterClick if not already registered and program is not completed
    if (onRegisterClick && !isRegistered && program.status !== 'completed') {
      onRegisterClick(program.id); // Call the parent handler with program ID
    }
  };

  // Handle feedback button click
  const handleFeedbackClick = () => {
      if (onViewFeedbackClick) {
          onViewFeedbackClick(program.id);
      }
  };

  const isCompleted = program.status === 'completed';

  // Determine button text and class based on status and registration state
  let registerButtonText = 'Đăng ký tham gia';
  let registerButtonClass = 'register-button';
  let isRegisterButtonDisabled = isCompleted || isRegistered; // Disable if completed or already registered

  if (isCompleted) {
      registerButtonText = 'Đã kết thúc';
  } else if (isRegistered) {
      registerButtonText = 'Đã đăng ký';
      registerButtonClass = 'register-button registered'; // Add a new class for registered state
  }

  return (
    <div className="program-card">
      <div 
        className="program-image"
        style={{ background: program.image }}
      />
      <div className="program-content">
        <h3 className="program-title">{program.title}</h3>
        <div className="program-info">
          <FaCalendarAlt />
          {program.date}
        </div>
        <div className="program-info">
          <FaMapMarkerAlt />
          {program.location}
        </div>
        <div className="program-info">
          <FaUsers />
          {program.participants} người tham gia
        </div>
        <p className="program-description">{program.description}</p>

        <div className="program-interaction">
          {/* Registration Button/Status */}
          <button
             className={registerButtonClass} // Use dynamic class
             onClick={handleRegisterClick} // Add the click handler
             disabled={isRegisterButtonDisabled} // Use dynamic disabled state
          >
             {isRegistered && !isCompleted && <FaCheckCircle style={{ marginRight: '5px' }} />} {/* Show check icon if registered and not completed */}
             {registerButtonText}
          </button>

          {/* Feedback Section Placeholder */}
          {/* This could be a button to leave feedback or a section to show feedback summary */}
          <div className="feedback-placeholder">
              {isCompleted && (
                  <button className="feedback-button" onClick={handleFeedbackClick}>
                      Gửi Phản hồi
                  </button>
              )}
          </div>
        </div>
      </div>
      <div className="program-footer">
        <span className={`program-status ${program.status}`}>
          {program.status === 'upcoming' && 'Sắp diễn ra'}
          {program.status === 'ongoing' && 'Đang diễn ra'}
          {program.status === 'completed' && 'Đã kết thúc'}
        </span>
      </div>
    </div>
  );
};

export default ProgramCard; 