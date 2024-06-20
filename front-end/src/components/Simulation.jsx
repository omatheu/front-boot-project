import React from 'react';
import FeedbackCard from './FeedbackCard';

const feedbacks = [
    { id: 1, username: 'Serena', userHandle: 'serena_example', feedback: "Uber's service has really gone downhill lately. The wait times are longer, the fares are higher, and the drivers seem less professional. It's frustrating to pay more for a service that used to be reliable and efficient.", likes: 177, comments: 784, shares: 784 },
    { id: 2, username: 'Sarah', userHandle: 'sarah_example', feedback: "Recently, the quality of Uber's service has significantly declined. Wait times are longer, fares have increased, and drivers seem less professional. It's disappointing to pay more for a service that used to be reliable and efficient.", likes: 177, comments: 784, shares: 129 },
    // Add more feedback entries as needed
  ];
  
  function Simulation() {
    return (
      <div>
        {feedbacks.map(feedback => (
          <FeedbackCard
            key={feedback.id}
            username={feedback.username}
            userHandle={feedback.userHandle}
            feedback={feedback.feedback}
            likes={feedback.likes}
            comments={feedback.comments}
            shares={feedback.shares}
          />
        ))}
      </div>
    );
  }
  
  export default Simulation;