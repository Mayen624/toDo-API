import mongoose from "mongoose";

const statusShemma = mongoose.Schema({
    status      : {type: String},
    createAt    : {type: String}
});

export default mongoose.model('statuses', statusShemma);