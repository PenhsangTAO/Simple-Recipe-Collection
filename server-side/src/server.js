import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";


app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Hello World",
    message1: "Hello Worldzzzzzzzzzzzzz"
  })
})

dotenv.config({
  path: './.env'
})

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("Error", error)
      throw error;
    });
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  } catch (error) {
    console.log("MongoDB connection failed", error)
  }

}

startServer();