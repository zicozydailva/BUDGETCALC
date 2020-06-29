import React from 'react'
import ExpenseItem from './ExpenseItem';
import {MdDelete} from "react-icons/md"

const ExpenseList = ({expenses, clearItems, handleDelete, handleEdit}) => {
  return (
    <>
     <ul className="list"> 
       {
         expenses.map(expense => {
           return  <ExpenseItem key={expense.id} expense={expense} handleDelete={handleDelete} handleEdit={handleEdit} />
         })
       }
     </ul>
     {
       expenses.length > 0 && <button onClick={clearItems} className="btn" >clear expenses <MdDelete className="btn-icon" /> </button>
     }
    </>
  )
}

export default ExpenseList
