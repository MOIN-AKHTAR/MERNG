const mongoose=require("mongoose");


const comment=new mongoose.Schema({
    body:String,
    userName:String
},{
    timestamps:true
});


const like=new mongoose.Schema({
    userName:String
},{
    timestamps:true
})


const postSchema=new mongoose.Schema({
    body:String,
    userName:String,
    comments:[comment],
    likes:[like]
},{
    timestamps:true
});

module.exports=mongoose.model("post",postSchema);
