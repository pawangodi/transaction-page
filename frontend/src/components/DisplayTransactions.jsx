import { useState, useEffect } from "react"
import { Plus } from 'lucide-react';
import TransactionModel from "./TransactionModel"
import { TRANSACTION_API_END_POINT } from '../Utils/Constant.js'
import axios from "axios"

const DisplayTransactions = () => {
  const [addTransaction, setAddTransaction] = useState(false);
  const [data, setData] = useState([]);


  useEffect(() => {
    fetchAlltransaction();
  }, []);

  const fetchAlltransaction = async () => {
    try {
      const res = await axios.get(`${TRANSACTION_API_END_POINT}/alltransactions`, {
        withCredentials: true
      });
      setData(res.data.data)

    } catch (error) {
      console.log(error);
    }
  };


  //toggle function for transaction model
  const close = () => {
    setAddTransaction(!addTransaction)
  }

  const renderAllTransactions = () => (
    <>
      <div className="flex justify-between items-ecnter mt-8 mb-8">
        <h1 className="text-2xl  font-bold font-Roboto ">Office Transactions</h1>
        <button type="button" className="flex  items-center border-2 border-green-500 px-3 py-1 shadow rounded-sm hover:rounded-full" onClick={close}><Plus className="w-4 h-4 mr-1" /><span className="font-bold text-gray-700">Add Transaction</span></button>
      </div>
      <table className='min-w-full border-collapse border border-gray-200'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-200 px-2 py-2'>Date</th>
            <th className='border border-gray-200 px-8 py-2'>Description</th>
            <th className='border border-gray-200 px-2 py-2'>Credit</th>
            <th className='border border-gray-200 px-2 py-2'>Debit</th>
            <th className='border border-gray-200 px-3 py-2'>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction._id} className="hover:bg-gray-100 hover:font-bold">
              <td className="border border-gray-200 px-2 py-2">{new Date(transaction.createdAt).toLocaleTimeString()}</td>
              <td className="border border-gray-200 px-2 py-2">{transaction.description}</td>
              <td className="border border-gray-200 px-2 py-2">{transaction.transactionType === "Credit" ? transaction.amount : ""}</td>
              <td className="border border-gray-200 px-2 py-2">{transaction.transactionType === "Debit" ? transaction.amount : ""}</td>
              <td className="border border-gray-200 px-2 py-2">{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )

  return (
    <div className="w-4/5 h-screen m-auto">
      {renderAllTransactions()}
      {addTransaction && <TransactionModel close={close} reloadPage = {fetchAlltransaction} />}
    </div>
  )

}

export default DisplayTransactions