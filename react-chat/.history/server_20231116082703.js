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
    origin: ['http://localhost:3000']
}))

app.use(express.json())

app.listen(8000)

app.post('/api/messages', async (req,res) => {
    await pusher.trigger("my-channel", "my-event", {
        message: "hello world"
    });
})

console.log('listening to port 8000');

