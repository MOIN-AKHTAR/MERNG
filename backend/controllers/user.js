const UserModel=require("../models/user");

exports.registerUser=async (parent,{registerInput:{userName,email,password}},ctx,info)=>{
    try {
        const user=await UserModel.findOne({email});
        if(user){
           throw new Error("Email is already in use-");
        }
        const newUser=new UserModel({userName,email,password});
        await newUser.save();
        const token=newUser.genToken();
        return {
            ...newUser.toObject(),
            token
        }
    } catch (error) {
        throw new Error(error)
    }
}


exports.loginUser=async (parent,{loginInput:{email,password}},ctx,info)=>{
    try {
        const user=await UserModel.findOne({email});
       
        const isMatched= await user.matchPassword(password);
        if(!isMatched){
            throw new Error("Invalid email or password-");
         }
         const token=user.genToken();
         return {
            ...user.toObject(),
            token
        }
    } catch (error) {
        throw new Error(error)
    }
}