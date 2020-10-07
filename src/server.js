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

// parse requests of content-type - application/json
app.use(bodyParser.json());

db.mongoose.connect(`mongodb://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("Successfully connection to MongoDB.");
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});

// routes
require('./routes/user.route')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
