import mongoose from "mongoose"

const transactionSchema = new  mongoose.Schema({
    transactionType :{
        type : String,
        required : true
    },
    amount :{
        type : Number,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    balance :{
        type : Number,
        required : true
    }

},  {timestamps:true});

export const Transaction = mongoose.model("Transaction" , transactionSchema)