import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboard";



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());




// Use the authentication routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);


async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user-auth');
    console.log('Connected to MongoDB');
    // Start your server or perform other actions that depend on the database connection.
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the async function to connect to MongoDB
(async () => {
  await connectToMongoDB();
  // Any code here will be executed after the database connection is established.
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

})();



export default  app 