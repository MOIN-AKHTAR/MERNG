const postModel=require("../models/post");
const isAuth=require("../utils/isAuth")
exports.getPosts=async ()=>{
    try {
        const posts=await postModel.find({}).sort({createdAt:-1});
        return posts;
    } catch (error) {
        throw new Error(error)
    }
}

exports.getPost=async (parent,{postId})=>{
    try {
        const post=await postModel.findById(postId);
        if(!post){
            throw new Error("No post found")
        }
        return post;
    } catch (error) {
        throw new Error(error)
    }
}

exports.createPost=async (_,{body},ctx)=>{
    try {
        const user=await isAuth(ctx);
        const post=new postModel({
            body,
            userName:user.userName
        });
        await post.save();
        return post;
    } catch (error) {
        throw new Error(error)
    }
}


exports.deletePost=async (_,{postId},ctx)=>{
    try {
        const user=await isAuth(ctx);
        const post=await postModel.findById(postId);
        if(!post){
            throw new Error("No post found");
        }
        if(post.userName===user.userName){
            await post.delete();
            return `Delete post with id ${postId} successfully!!!`
        }else{
            throw new Error("You are not authorized for this action")
        }
    } catch (error) {
        throw new Error(error)
    }
}


exports.createComment=async (_,{postId,body},ctx)=>{
    try {
        const user=await isAuth(ctx);
        const post=await postModel.findById(postId);
        if(!post){
            throw new Error("No post found");
        }
        let comment={
            userName:user.userName,
            body
        }
        post.comments.unshift(comment);
        await post.save();
        return post;
    } catch (error) {
        throw new Error(error)
    }
}



exports.deleteComment=async (_,{postId,commentId},ctx)=>{
    try {
        const user=await isAuth(ctx);
        const post=await postModel.findById(postId);
        if(!post){
            throw new Error("No post found");
        }
        const commentIndex=post.comments.findIndex(comment=>comment._id.toString()===commentId);
        if(commentIndex>-1){
         if(post.comments[commentIndex].userName===user.userName){
             post.comments.splice(commentIndex,1);
             await post.save();
             return post;
         }else{
             throw new Error("You are not authorized for this action")
         }
        }else{
            throw new Error("No comment found")
        }
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}


exports.likePost=async (_,{postId},ctx)=>{
    try {
        const user=await isAuth(ctx);
        const post=await postModel.findById(postId);
        if(!post){
            throw new Error("No post found");
        }
        if(!post.likes.find(like=>like.userName===user.userName)){
            post.likes.push({
                userName:user.userName
            })
        }else{
             post.likes=post.likes.filter(like=>like.userName!==user.userName);
        }
        await post.save();
        return post;
    } catch (error) {
        throw new Error(error)
    }
}