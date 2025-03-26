const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/UserRouter");
dotenv.config();
const app = express();
const User = require("./models/UserModel");

app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Set your frontend URL
    credentials: true, // ✅ Allow cookies/session
  })
);
app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("Connected to DB")).catch((err)=> console.log("MongoDB connection Failed",err));

app.use("/api/users",userRouter);


// app.get("/api/users/:userId/scores", async (req, res) => {
//   const user = await User.findById(req.params.userId);
//   res.json({ scores: user.scores });
// });


const PORT = process.env.PORT || 5555;
app.listen(PORT, console.log("Server started",PORT));