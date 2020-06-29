import React, { useState } from 'react';
import './App.css';
import Alert from './components/Alert';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import uuid from 'uuid/dist/v4';

function App() {


  const initialExpenses = [
    {id: uuid(), charge: "rent", amount: 1200},
    {id: uuid(), charge: "Bill Payment", amount: 1600},
    {id: uuid(), charge: "Credit card charges", amount: 1000},
  ];

   // *****************************************state values ******************************************
   //all expenses
   const [expenses, setExpenses] = useState(initialExpenses);

   //single expenses 
   const [charge, setCharge] = useState("")

    //single amount
   const [amount, setAmount] = useState("")

   //alert
   const [alert, setAlert] = useState({show: false});

   //edit
   const [edit, setEdit] = useState(false)

   //edit item
   const [id, setId] = useState(0)

    // ***************************************** functionality ******************************************
    //handle charge
    const handleCharge = e => {
      setCharge(e.target.value);
    }
    //handle Amount
    const handleAmount = e => {
      setAmount(e.target.value);
    }
    //handle submit
    const handleSubmit = e => {
      e.preventDefault();
      if(charge !== "" && amount > 0) {
        if(edit) {
          let tempExpenses = expenses.map(item => {
            return item.id === id ? {...item,charge,amount} : item
          })
          setExpenses(tempExpenses);
          setEdit(false);
        } else {
          const singleExpense = {id: uuid, charge, amount};
          setExpenses([...expenses, singleExpense]);
          handleAlert({type: "success", text: 'Item Added'})
        }
      setCharge("")
      setAmount("")
      } else {
        handleAlert({type: "danger", text: 'Error! amount and/or value field cannot be empty'})
      }
      
    }
    
      //handle alert
      const handleAlert = ({type, text}) => {
        setAlert({show: true, type, text});
        setTimeout(() => {
          setAlert({show: false})
        }, 5000)
      }
    
    //clear all items
    const clearItems = () => {
      setExpenses([]);
      handleAlert({type: "danger", text: "All items Deleted"})
    }

    // handle delete
    const handleDelete = id => {
      const tempExpenses = expenses.filter(item => item.id !== id)
      setExpenses(tempExpenses)
      handleAlert({type: "danger", text: "Item deleted"})
    }

    //handle edit
    const handleEdit = id => {
      let expense = expenses.find(item => item.id === id)
      let {charge, amount} = expense;
      setCharge(charge)
      setAmount(amount)
      setEdit(true)
      setId(id)
    }


  return (
    <>
    {
      alert.show && <Alert type={alert.type} text={alert.text} />
    }
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm charge={charge}
                     amount={amount}
                     handleCharge={handleCharge}
                     handleAmount={handleAmount}
                     handleSubmit={handleSubmit} 
                     edit={edit}
                      />
        <ExpenseList expenses={expenses}
                     clearItems={clearItems} 
                     handleDelete={handleDelete}
                     handleEdit={handleEdit}
                      />
      </main>
      <h1>
        total expenses : $ {" "} {
          expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount))
          }, 0)
        }
      </h1>
    </>
  );
}

export default App;
