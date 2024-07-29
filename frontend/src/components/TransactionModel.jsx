import { useState } from "react"
import { X, Save } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import {TRANSACTION_API_END_POINT} from "../Utils/Constant.js"

const TransactionModel = (props) => {
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")
    const [transactionType, setTransactionType] = useState("")
    
    const closeModel= () =>{
        props.close() 
        props.reloadPage()
    }

    const formHandler =async (e) =>{
        e.preventDefault()
    
        try {
            const transactionData = {
                transactionType,
                description,
                amount
            };
            const response = await axios.post(`${TRANSACTION_API_END_POINT}/createTransaction`,transactionData , {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
             
            if (response.data.success) {
                toast.success(response.data.message)
            
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
    }
    

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="w-100 mx-w-96 bg-white shadow  p-5 rounded-md ">
                <div className=" flex justify-end">
                    <button className=" w-8 h-8 bg-none outline-none hover:text-red-700 " onClick ={closeModel}><X /></button>
                </div>
                <h1 className=" text-2xl font-bold font-sans text-{#000080}-600 mb-10">New Transaction</h1>
                <form onSubmit={formHandler}>
                    <div className="flex items-center mb-5">
                        <label className="w-40 text-lg text-gray-500 font-semibold font-Sans mr-20 ">Transaction Type</label>
                        <select className=" px-28 border border-b-gray-400" value = {transactionType} onChange = {(e) =>{setTransactionType(e.target.value)}}>
                            <option value="Credit" name="Credit">Credit</option>
                            <option value="Debit" name="Debit" default >Debit</option>
                        </select>
                    </div>
                    <div className="flex items-center mb-5">
                        <label  className="w-40 text-lg text-gray-500 font-semibold font-Sans mr-20 ">Amount</label>
                        <input
                            className="w-64 border-none border-b-1 border-gray-500  px-2 py-1"
                            type="number"
                            id="amount"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => { setAmount(e.target.value) }}
                            required
                        />
                    </div>
                    <div   className="flex items-center mb-5">
                        <label className=" w-40 text-lg text-gray-500 font-semibold font-Sans mr-20 ">Description</label>
                        <input
                            className="w-64 border-npone border-b-1-gray-500  px-2 py-1"
                            type="text" 
                            id="description"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => { setDescription(e.target.value) }}
                            required
                        />
                    </div>
                    <div className="flex  justify-end  ml-0 mt-24">
                        <button className="flex justify-center item-center bg-blue-500 px-3 py-1 rounded-md text-white mr-3" type="submit"><Save  className="h-4 w-4 self-center mr-1"/><span>SAVE</span></button>
                        <button className=" border-2 border-black-700 rounded-md flex justify-center item-center  px-3 py-1  " type="button"  onClick ={closeModel}><X   className="h-4 w-4 self-center mr-1 "/><div className="">CANCEL</div></button>

                    </div>
                </form>
            </div>
        </div>
    )
}
export default TransactionModel