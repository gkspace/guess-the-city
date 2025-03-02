import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../utils/api";
import "./Play.css";

function Play() {
  const [destination, setDestination] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showInviteInput, setShowInviteInput] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [invitedFriend, setInvitedFriend] = useState(null);
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
    setShowInviteInput(true);
  };

  const sendInvite = () => {
    if (!friendName.trim()) {
      alert("Please enter a name before inviting!");
      return;
    }

    const inviteLink = `${
      window.location.origin
    }/register?invite=true&name=${encodeURIComponent(friendName)}`;
    const message = `Hey ${friendName}, I challenge you to play this game! Click here to join: ${inviteLink}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");

    setShowInviteInput(false);
    setFriendName("");

    // Store the invited friend's name
    setInvitedFriend({ name: friendName, score: { correct: 0, total: 0 } });
  };

  if (!destination)
    return <div className="text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="play-container">
      <div className="score-container">
        {userProfile && (
          <div className="score-card">
            <h3>{userProfile.username}</h3>
            <p>
              Score: {userProfile.correctAnswers} /{" "}
              {userProfile.correctAnswers + userProfile.incorrectAnswers}
            </p>
          </div>
        )}

        {invitedFriend && (
          <div className="score-card">
            <h3>{invitedFriend.name}</h3>
            <p>
              Score: {invitedFriend.score.correct} / {invitedFriend.score.total}
            </p>
          </div>
        )}
      </div>

      <div className="play-card">
        <h2 className="play-title">Where am I?</h2>

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

        {!showInviteInput ? (
          <button onClick={handleChallengeFriend} className="challenge-button">
            Challenge a Friend
          </button>
        ) : (
          <div className="invite-container">
            <input
              type="text"
              placeholder="Enter friend's name"
              value={friendName}
              onChange={(e) => setFriendName(e.target.value)}
              className="invite-input"
            />
            <button onClick={sendInvite} className="send-invite-button">
              Send Invite
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Play;
