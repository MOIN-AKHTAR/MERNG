const {ApolloServer}=require("apollo-server");
const mongoose=require("mongoose");
const typeDefs=require("./graphql/typeDefs");
const resolvers=require("./graphql/resolvers")

require("dotenv").config({
    path:".env"
});

const server=new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>({req})
})

mongoose.connect(process.env.URI,(err)=>{
    if(err){
        console.log(error);
        process.exit(0);
        return;
    }else{
        server.listen(process.env.PORT,()=>{
            console.log("Running on port 5000")
        })
    }
    
})