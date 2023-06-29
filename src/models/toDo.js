import mongoose from "mongoose";

const toDoShemma = mongoose.Schema({
    id_status   : {type: mongoose.Types.ObjectId, ref: 'statuses'},
    title       : {type: String, required: true},
    content     : {type: String, required: true},
    commentary  : {type: String, default: null},
    createdAt   : {type: Date},
    updatedAt   : {type: Date, default: null}
})

export default mongoose.model('to-dos', toDoShemma);