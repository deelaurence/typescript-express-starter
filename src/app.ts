import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes";
import dashboardRoutes from "./routes/dashboard";



const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/user-auth")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Use the authentication routes
app.use("/api/auth", authRoutes);
app.use("/api", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default  app 