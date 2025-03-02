import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
    required: true,
  },
  clues: {
    type: [String],
    required: true,
  },
  funFacts: {
    type: [String],
    required: true,
  },
  trivia: {
    type: [String],
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

// Static method to seed multiple destinations
destinationSchema.statics.seedDestinations = async function(destinationsData) {
  try {
    // Clear existing destinations
    await this.deleteMany({});
    
    // Insert new destinations
    const result = await this.insertMany(destinationsData);
    return result;
  } catch (error) {
    console.error("Error seeding destinations:", error);
    throw error;
  }
};

// Static method to find a random destination
destinationSchema.statics.findRandomDestination = async function() {
  try {
    const count = await this.countDocuments();
    const random = Math.floor(Math.random() * count);
    return this.findOne().skip(random);
  } catch (error) {
    console.error("Error finding random destination:", error);
    throw error;
  }
};

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;