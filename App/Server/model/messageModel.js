const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        room:{
            type: String,
            required: true
        },
        messageDlt:{
            type: Boolean,
            default:false
        },
        message:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Messages",messageSchema);