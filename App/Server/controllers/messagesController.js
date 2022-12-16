const messageModel = require("../model/messageModel");
const mongoose = require("mongoose");

module.exports.addMessage = async (req,res,next)=>{
    try{
        const { name, room, message } = req.body;
        const _id = mongoose.Types.ObjectId();
        const data = await messageModel.create({
            _id,
            name,
            room,
            message
        });
        if (data)
        {
            return res.json({
                messageID:_id,
                msg:"Message added Successfully"
            });
        }
        else
        {
            return res.json({msg:"Failed to add message in Database"});
        }
    }
    catch(err){
        next(err)
    }
}