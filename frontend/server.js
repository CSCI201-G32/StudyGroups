const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");

//API Key
const pusher = new Pusher({
  appId: "1692543",
  key: "f8627fe05e44c2e9db83",
  secret: "e238c140c7f4c2765ab1",
  cluster: "us3",
  useTLS: true,
});

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:3000", "https://csci201-g32.github.io"];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
      } else {
          callback(new Error("Not allowed by CORS"));
      }
  }
};

app.use(cors(corsOptions));

app.use(express.json());

const port = 8000;

app.listen(port);

//Sending the message to everyone connected to the pusher channel 'chat' and listening on the the event 'message'
app.post("/api/messages", async (req, res) => {
  try {
    await pusher.trigger("chat", "message", {
      username: req.body.username,
      message: req.body.message,
    });

    res.json({ success: true });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
});

//Grab sent messages from database to be displayed
app.get("/servlet/oldmessages", async (req, res) => {
  try {
    const response = await fetch(
      "http://localhost:8080/StudyGroups/DisplayMessages",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
});

app.post("/servlet/getuser", async (req, res) => {
  try {
    const response = await fetch("http://localhost:8080/StudyGroups/GetUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: req.body.user_id,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch username");
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching username:", error);
    res.status(500).json({ success: false, error: "Failed to fetch username" });
  }
});

console.log("listening to port " + port);
