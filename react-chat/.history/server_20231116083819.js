const express = require('express')
const cors = require('cors')
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1692543",
  key: "b15a2b251df1eba24fc8",
  secret: "0761ba93f50bda77d767",
  cluster: "us3",
  useTLS: true
});

const app = express();

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3000']
}))

app.use(express.json())

app.listen(8000)

app.post('/api/messages', async (req, res) => {
    try {
        await pusher.trigger("chat", "message", {
            username: req.body.username,
            message: req.body.message
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: 'Failed to send message' });
    }
});


console.log('listening to port 8000');

