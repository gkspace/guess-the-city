import { Router } from "express";
import Destination from "../models/Destination.js";
import { findById as _findById } from "../models/User.js";
const router = Router();

// Get a random destination
router.get("/destination", async (req, res) => {
  try {
    const count = await Destination.countDocuments();
    const random = Math.floor(Math.random() * count);
    const destination = await Destination.findOne().skip(random);

    res.json({
      success: true,
      destination: {
        id: destination._id,
        city: destination.city,
        clues: destination.clues,
        options: destination.options,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Submit an answer
router.post("/answer", async (req, res) => {
  try {
    const { destinationId, answer, userId } = req.body;

    const destination = await Destination.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }

    const user = await _findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isCorrect = destination.city === answer;

    if (isCorrect) {
      user.correctAnswers += 1;
    } else {
      user.incorrectAnswers += 1;
    }
    await user.save();

    res.json({
      success: true,
      correct: isCorrect,
      destination: {
        id: destination._id,
        city: destination.city,
        country: destination.country,
        clues: destination.clues,
        trivia: destination.trivia,
        funFacts: destination.funFacts,
        options: destination.options,
      },
      updatedProfile: {
        id: user._id,
        username: user.username,
        correctAnswers: user.correctAnswers,
        incorrectAnswers: user.incorrectAnswers,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;