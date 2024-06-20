import React from 'react';
import './style/FeedbackCard.css'; 

function FeedbackCard({ username, userHandle, feedback, likes, comments, shares }) {
  return (
    <div className="feedback-card">
      <div className="feedback-header">
        <img src={`https://i.pravatar.cc/150?u=${userHandle}`} alt="user" className="user-avatar"/>
        <h3>{username}</h3>
        <p>@{userHandle}</p>
      </div>
      <p className="feedback-content">{feedback}</p>
      <div className="feedback-stats">
        <span>{likes} ❤️</span>
        <span>{comments} 💬</span>
        <span>{shares} 🔁</span>
      </div>
    </div>
  );
}

export default FeedbackCard;
