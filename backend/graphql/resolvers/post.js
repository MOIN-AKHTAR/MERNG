const postController=require("../../controllers/post")

module.exports={
    Query:{
        getPosts:postController.getPosts,
        getPost:postController.getPost
    },
    Mutation:{
        createPost:postController.createPost,
        deletePost:postController.deletePost,
        likePost:postController.likePost,
        createComment:postController.createComment,
        deleteComment:postController.deleteComment
    }
};
    