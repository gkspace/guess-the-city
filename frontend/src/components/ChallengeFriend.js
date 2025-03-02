import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../utils/api";
import ChallengeFriend from "./ChallengeFriend"; // Import the component
import "./Play.css";

function Play() {
  const [destination, setDestination] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [invited, setInvited] = useState(false); 
  const history = useHistory();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      history.push("/register");
    } else {
      fetchUserProfile(userId);
      fetchNewDestination();
    }
  }, [history]);

  const fetchUserProfile = async (userId) => {
    try {
      const response = await api.get(`/auth/profile/${userId}`);
      setUserProfile(response.data.profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchNewDestination = async () => {
    try {
      const response = await api.get("/game/destination");
      setDestination(response.data.destination);
      setSelectedAnswer("");
      setFeedback(null);
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  const handleAnswerSubmit = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.post("/game/answer", {
        destinationId: destination.id,
        answer: selectedAnswer,
        userId,
      });
      setFeedback(response.data);
      setUserProfile(response.data.updatedProfile);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  const handleChallengeFriend = () => {
    setInvited(true);
    console.log("Invited");
  };

  if (!destination)
    return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="play-container">
      <div className="play-card">
        <h2 className="play-title">Where am I?</h2>

        {userProfile && (
          <div className="user-profile">
            <p>
              Score: {userProfile.correctAnswers} /{" "}
              {userProfile.correctAnswers + userProfile.incorrectAnswers}
            </p>
          </div>
        )}

        <div className="clue-box">
          {destination.clues.map((clue, index) => (
            <p key={index} className="clue-text">
              {clue}
            </p>
          ))}
        </div>

        <div className="options-grid">
          {destination.options.map((option) => (
            <button
              key={option}
              onClick={() => setSelectedAnswer(option)}
              className={`option-button ${
                selectedAnswer === option ? "selected" : "default"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <button
          onClick={handleAnswerSubmit}
          disabled={!selectedAnswer}
          className="submit-button"
        >
          Submit Answer
        </button>

        {feedback && (
          <div
            className={`feedback-box ${
              feedback.correct ? "correct" : "incorrect"
            }`}
          >
            <p>
              {feedback.correct ? "Correct!" : "Incorrect."} The answer was{" "}
              <strong>{feedback.destination.city}</strong>.
            </p>
            <p className="mt-2 font-bold">Fun Fact:</p>
            <p>{feedback.destination.funFacts[0]}</p>

            <button onClick={fetchNewDestination} className="next-button">
              Next Question
            </button>
          </div>
        )}

        {/* Show Challenge Friend Button */}
        {userProfile && !invited && (
          <button onClick={handleChallengeFriend} className="challenge-button">
            Challenge a Friend
          </button>
        )}

        {/* Show ChallengeFriend Component after inviting */}
        {invited && <ChallengeFriend username={userProfile.username} score={userProfile.correctAnswers} />}
      </div>
    </div>
  );
}

export default Play;
