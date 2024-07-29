import express from "express"
import {createTransaction, allTransactions } from "../controllers/transactionController.js"

const router = express.Router();

router.route("/createTransaction").post(createTransaction);



router.route("/alltransactions").get(allTransactions);


export default router;