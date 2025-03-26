// const mongoose =  require("mongoose");
// const bcrypt = require("bcryptjs");

// const userSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     password:{
//         type:String,
//         required:true,
        
//     },
//     isAdmin:{
//         type:Boolean,
//         default:false,
//     },


// },{
//     timestamps:true,
// });

// userSchema.pre("save",async function (next){
//     if(!this.isModified("password")){
//         return next();
//     }
//     this.password = await bcrypt.hash(this.password, 10);
// });

// userSchema.methods.matchPassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password);
// };

// const User = mongoose.model("User",userSchema);
// module.exports = User;

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,  // Ensure emails are unique
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    scores: [
        {
            subject: { type: String, required: true },
            score: { type: Number, required: true, default: 0 }
        }
    ]
}, { timestamps: true });

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Method to check password match
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
