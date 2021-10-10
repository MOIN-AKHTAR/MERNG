const userController=require("../../controllers/user")

module.exports={
    Query:{
    },
    Mutation:{
        registerUser:userController.registerUser,
        loginUser:userController.loginUser
    }
};
    