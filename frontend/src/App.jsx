import React from 'react'
import TransactionModel from "./components/TransactionModel"
import DisplayTransactions from "./components/DisplayTransactions"
import {Toaster} from "react-hot-toast"

const App = () =>{
  return (
    <div>
        <DisplayTransactions />
        <Toaster />
    </div>
  )
}

export default App