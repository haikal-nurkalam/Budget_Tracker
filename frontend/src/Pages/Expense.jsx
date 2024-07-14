import React from "react";
import Header from "../Template/Header";
import Navigation from "../Template/Navigation";
import { useNavigate } from "react-router-dom";

function Expense() {
  const navigate = useNavigate();
  const AddExpense = () => {
    navigate("/add-expense");
  };
  const AddIncome = () => {
    navigate("/add-income");
  };
  return (
    <div className="flex flex-col items-center h-screen bg-slate-100">
      <div className="sm:w-[600px] px-10  w-full flex flex-col gap-y-4 h-screen bg-white">
        <Header />
        <button
          onClick={AddExpense}
          className="w-full bg-red-200 py-16 flex flex-col gap-y-2 items-center rounded-lg"
        >
          <p className="sm:text-3xl text-2xl text-slate-900 sm:font-bold font-semibold ">
            Add Expense
          </p>
          <p className="sm:text-xl text-lg text-slate-500 sm:font-light font-thin ">
            Add your expense based on your transaction
          </p>
        </button>
        <button
          onClick={AddIncome}
          className="w-full bg-blue-200 py-16 flex flex-col gap-y-2 items-center rounded-lg"
        >
          <p className="sm:text-3xl text-2xl text-slate-900 sm:font-bold font-semibold ">
            Add Income
          </p>
          <p className="sm:text-xl text-lg text-slate-500 sm:font-light font-thin ">
            Add your income to track the balance
          </p>
        </button>
        <Navigation />
      </div>
    </div>
  );
}

export default Expense;
