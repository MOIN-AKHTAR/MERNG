const jwt=require("jsonwebtoken");
const userModel=require("../models/user")


module.exports= async (ctx)=>{
    try {
        const authHeader=ctx.req.headers.authorization;
        if(authHeader){
        const token=authHeader.split("Bearer ")[1];
        if(token){
        const payload=jwt.verify(token,process.env.JWT_SECRETE,{ignoreExpiration:true});
        let user=await userModel.findById(payload.id);
        if(!user){
            throw new Error("No user found");
        }
        return user;
        }else{
            throw new Error("You are not authorized")
        }
        }else{
            throw new Error("You are not authorized")
        }
    } catch (error) {
        throw new Error(error);
    }
}