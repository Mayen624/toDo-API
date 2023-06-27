import mongoose from "mongoose";

const toDoShemma = mongoose.Schema({
    id_status   : {type: mongoose.Types.ObjectId, unique: true, ref: 'statuses'},
    title       : {type: String},
    content     : {type: String},
    commentary  : {type: String, default: null},
    createdAt   : {type: Date},
    updatedAt   : {type: Date, default: null}
})

export default mongoose.model('to-dos', toDoShemma);