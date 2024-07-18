const mongoose= require("mongoose");

const urlSchema= new mongoose.Schema({
    ShortId: {
        type: String,
        required: true,
        unique: true,
    },
    //original URL
    redirectURL:{
        type: String,
        required: true,
    }, 
    visitHistory: [{ 
        timestamp :{type: Number}
    }],
    default:[],
},{timestamps: true}
);

const URL= mongoose.model("url", urlSchema);

module.exports=URL; 