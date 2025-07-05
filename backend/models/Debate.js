const mongoose = require("mongoose");
const debateSchema = new mongoose.Schema({
    Category : String,
    Title : String,
    image : {
        public_id : String,
        url : String
    },
    owner : 
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    createdAt : 
    {
        type : Date,
        default : Date.now,
    },
    likes : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
            },
        },
    ],
    messages : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
            },
            message : {
                type : String,
                required : true
            },
            like : {
                type : Number
            },
            side : String
        },
    ],
    participants : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
            },
            side : String
        }
    ],
    comments : [
        {
            comment : String,
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
            },
        }
    ],
    isFinish : Boolean
});
module.exports = mongoose.model("Debate",debateSchema);