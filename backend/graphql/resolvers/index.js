const postResolver=require("./post");
const userResolver=require("./user");

module.exports={
     // Whenever Any Resolver Sending Back Post As Response This Modifier Will Run Before It Send Back To Client-
     Post:{
          // Here We Are Setting CommentCount And LikeCount Property Before Response Go Back To Client-
      commentCount:parent=>parent.comments.length,
      likeCount:parent=>parent.likes.length
     },
    Query:{
         ...postResolver.Query,
         ...userResolver.Query
    },
    Mutation:{
         ...postResolver.Mutation,
         ...userResolver.Mutation
    }
};
    