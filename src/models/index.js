const mongoose = require('mongoose');
const redis = require("redis");

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.redis = redis.createClient();

db.user = require("./user.model");
db.comment = require("./comment.model");

module.exports = db;