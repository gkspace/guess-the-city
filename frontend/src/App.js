import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./app.css"; // Import the new CSS file
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Play from "./components/Play";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/play" component={Play} />
            <Route path="/about" component={About} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
