import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/chatapp";

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, options)
  .then(() => {
    console.log("MongoDB initial connection successful");
    console.log("Connected to:", MONGO_URI);
  })
  .catch((err) => {
    console.error("MongoDB initial connection error:", err);
    console.error("Connection string:", MONGO_URI);
    // Don't exit the process, let it retry
  });

// Connection event handlers
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB");
});

mongoose.connection.on("reconnected", () => {
  console.log("Mongoose reconnected to MongoDB");
});

mongoose.connection.on("error", (error) => {
  console.error("Mongoose connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB");
});

// Handle application termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

export default mongoose;