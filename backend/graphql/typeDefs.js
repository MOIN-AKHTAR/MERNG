const {gql}=require("apollo-server");

const typeDefs=gql`
input RegisterInput{
    userName:String!
    email:String!
    password:String!
}
input LoginInput{
    email:String!
    password:String!
}
input CreatePostInput{
    body:String!
}
type Comment{
    _id:ID!
    body:String!
    userName:String!
    createdAt:String!
    updatedAt:String!
}
type Like{
    _id:ID!
    userName:String!
    createdAt:String!
    updatedAt:String!
}
type Post{
    _id:ID!
    body:String!
    userName:String!
    comments:[Comment]!
    likes:[Like]!
    commentCount:Int
    likeCount:Int
    createdAt:String!
    updatedAt:String!
}
type User{
    _id:ID!
    email:String!
    token:String!
    userName:String!
}

type Query{
    getPosts:[Post]!
    getPost(postId:ID!):Post!
}
type Mutation{
    registerUser(registerInput:RegisterInput):User!
    loginUser(loginInput:LoginInput):User!
    createPost(body:String!):Post!
    deletePost(postId:ID!):String!
    createComment(postId:ID!,body:String!):Post!
    deleteComment(postId:ID!,commentId:ID!):Post!
    likePost(postId:ID!):Post!
}
`

module.exports=typeDefs;