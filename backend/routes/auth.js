import { Router } from "express";
import User, { findOne } from "../models/User.js";

const router = Router();

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username } = req.body;
    
    // Check if username is provided
    if (!username || username.trim().length < 3) {
      return res.status(400).json({ 
        success: false, 
        error: "Username must be at least 3 characters" 
      });
    }
    
    // Check if user already exists
    const existingUser = await findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: "Username already taken" 
      });
    }
    
    // Create new user
    const user = new User({ username });
    await user.save();
    
    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        correctAnswers: user.correctAnswers,
        incorrectAnswers: user.incorrectAnswers
      }
    });
    console.log("User registered:", user.username);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Server error during registration" 
    });
  }
});

// Login (or find) user
router.post("/login", async (req, res) => {
  try {
    const { username } = req.body;
    
    // Check if username is provided
    if (!username || username.trim().length < 3) {
      return res.status(400).json({ 
        success: false, 
        error: "Username must be at least 3 characters" 
      });
    }
    
    // Find or create user
    let user = await findOne({ username });
    if (!user) {
      user = new User({ username });
      await user.save();
    }
    
    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        correctAnswers: user.correctAnswers,
        incorrectAnswers: user.incorrectAnswers
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Server error during login" 
    });
  }
});

export default router;