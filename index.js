require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const pool = require("./config/connection");
const router = require("./app/router");


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/api", router);

app.listen(process.env.APP_PORT);