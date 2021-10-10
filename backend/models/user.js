const mongoose=require("mongoose");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken")



const userSchema=new mongoose.Schema({
    userName:String,
    email:String,
    password:String
},{
    timestamps:true
});


// Generate Token
userSchema.methods.genToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
      expiresIn: process.env.JWT_EXPIRE_IN,
    });
  };

// Decrypt Hashed Password
userSchema.methods.matchPassword = async function (Password) {
    return await bcryptjs.compare(Password, this.password);
  };
  
  // Encrypting Password
  userSchema.pre("save", async function (next) {
      console.log("=====SAVE PRE HOOK CALLED=====")
    if (this.isNew || this.isModified("password")) {
      // Generate Salt Which Is Just A Series Of Random String
      const salt = await bcryptjs.genSalt(10);
      // Hash Password With The Help Of Salt
      this.password = await bcryptjs.hash(this.password, salt);
    }
    next();
  });

module.exports=mongoose.model("user",userSchema);
