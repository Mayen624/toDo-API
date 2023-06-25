import mongoose from "mongoose";

const statusShemma = mongoose.Schema({
    status      : {type: String},
    createAt    : {type: String}
});

module.exports = mongoose.model('statuses', statusShemma);