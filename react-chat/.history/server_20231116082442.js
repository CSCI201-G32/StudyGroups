const express = require('express')
const cors = require('cors')

const app = express();

app.use(cors({
    origin: ['http://localhost:3000']
}))

app.use(express.json())

app.listen(8000)

console.log('listening to port 8000');