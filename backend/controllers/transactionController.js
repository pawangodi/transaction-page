import { Transaction } from '../models/transactionSchema.js'

export const createTransaction = async (req, res) => {
    try {
        const { transactionType, amount, description } = req.body
        // basic validation
        if (!transactionType || !amount || !description) {
            return res.status(401).json({
                message: "all fields are required",
                success: false
            });
        };

        //check transaction type 
        if (transactionType === "Credit") {
            //logic for Credit 
            try {
                const latestTransaction = await Transaction.findOne().sort({ createdAt: -1 });
                const balance = latestTransaction ? latestTransaction.balance : 0
                await Transaction.create({
                    transactionType,
                    amount,
                    description,
                    balance: balance + amount
                });
                return res.status(201).json({
                    message: `${amount} is credited successfully`,
                    success: true
                });

            } catch (error) {
                console.log(error)
            }

        } 
        // logic for debit
        const latestTransaction = await Transaction.findOne().sort({ createdAt: -1 });
            if (!latestTransaction) {
                return res.status(201).json({
                    message: `No balance`,
                    success: true
                });
            } else if (latestTransaction.balance < amount) {
                return res.status(201).json({
                    message: `balance is not sufficient`,
                    success: true
                });
            }
            const balance = latestTransaction.balance
            await Transaction.create({
                transactionType,
                amount,
                description,
                balance: balance - amount
            });
        return res.status(201).json({
            message: `${amount} is debited successfully`,
            success: true
        });

    } catch (error) {
        console.log(error)
    }

}


export const allTransactions =async (req , res) =>{
    try{
        const data = await Transaction.find().sort({ createdAt: -1 });
      
        return res.status(201).json({
            data,
            success: true
        });
    }catch(error){
        console.log(error)
    }
} 