import mongoose from "mongoose";

const statusShemma = mongoose.Schema({
    status      : {type: String},
    createdAt   : {type: Date},
    updatedAt   : {type: Date, default: null}
});

export default mongoose.model('statuses', statusShemma);