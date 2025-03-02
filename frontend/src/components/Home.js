import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Welcome to Globetrotter Challenge</h1>
        <p className="home-text">Test your knowledge of famous destinations around the world!</p>

        <div className="home-buttons">
          <Link to="/register" className="home-button">
            Start Playing
          </Link>
          <Link to="/about" className="home-button secondary">
            How to Play
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
