import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-card">
        <div className="about-header">
          <h2>About Globetrotter Challenge</h2>
          <p>
            An exciting game that tests your knowledge of famous destinations around the world
          </p>
        </div>

        <div className="about-content">
          <h3>How to Play</h3>
          <ul className="about-list">
            {[
              "Register with a unique username",
              "Read the clues about a mystery destination",
              "Choose your answer from multiple-choice options",
              "Submit your answer and see if you're correct",
              "Learn interesting facts about the destination",
              "Keep playing to improve your score and become a true Globetrotter!",
            ].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <div className="text-center">
            <Link to="/register" className="about-button">
              Start Your Adventure
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
