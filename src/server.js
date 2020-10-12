const dotenv = require('dotenv');
dotenv.config({path: "../.env"});

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./models");
const dbConfig = require("./config/db.config");

const app = express();

const corsOptions = {
    origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

db.mongoose.connect(`mongodb://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Success connection to MongoDB.");
}).catch(err => {
    console.error("Connection error to MongoDB.", err);
    process.exit();
});

db.redis.on("error", function (err) {
    console.error("Connection error to Redis.", err);
    process.exit();
});

db.redis.on("ready", function () {
    console.log("Success connection to Redis.");
});

require('./routes/user.route')(app);
require('./routes/comment.route')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
