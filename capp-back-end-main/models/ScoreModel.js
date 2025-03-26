// const mongoose =  require("mongoose");

// const scoreSchema = new mongoose.Schema({
//     postBy:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User"
//     },
//     subjects:[
//         {
//             title:{
//                 type:String,
//                 required:true
//             },
//             scores: [
//                 {
//                     subject: { type: String, required: true },
//                     score: { type: Number, required: true }
//                 }
//             ]
//         }
//     ]
// },{
//     timestamps:true,
// });

// const Score = mongoose.model("Score",scoreSchema);
// module.exports = Score;

const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subjects: [
        {
            subject: { type: String, required: true },
            score: { type: Number, required: true, default: 0 }
        }
    ]
}, { timestamps: true });

const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;
