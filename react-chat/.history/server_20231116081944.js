const express = require('express')
const cors = require('')

const app = express();

app.use(cors({
    origin: ['http:localhost:3000']
}))