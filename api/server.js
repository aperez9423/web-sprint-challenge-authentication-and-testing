require("dotenv/config")
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted');

const authRouter = require('./auth/auth-router');
const jokesRouter = require('./jokes/jokes-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/jokes", jokesRouter); // only logged-in users should have access!

server.get ("/", (req, res) => {
    res.json({
        message: "Welcome to our API!",
    })
}) 

server.use((err, req, res, next) =>{
    console.log(err)

    res.status(500).json({
        message: "Something went wrong."
    })
})

module.exports = server;
