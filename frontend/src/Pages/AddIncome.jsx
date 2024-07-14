import React from "react";
import toast, { Toaster } from "react-hot-toast";
import moment from "moment";
import http from "../Util/http";
import { useNavigate } from "react-router-dom";

function AddIncome() {
  const navigate = useNavigate();
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const userId = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!userId || !userId.id) {
        toast.error("User ID is missing. Please login again.");
        setIsLoading(false);
        return;
      }
      await http.post("/transaction", {
        userId: userId.id,
        amount,
        inOrOut: 2,
        category,
        description,
        transactionDate: moment().format("YYYY-MM-DD"),
      });

      navigate("/expense");

      setIsLoading(true);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center h-screen bg-slate-100">
      <div className="sm:w-[600px] px-10  w-full flex flex-col gap-y-4 h-screen bg-white">
        <Toaster />
        <div className="w-full  bg-white py-3 border-b border-gray-100">
          <ul className="flex justify-between">
            <li>
              <a
                href="/expense"
                className="text-gray-600 hover:text-gray-900  py-2 block"
              >
                &#x25c0; Back
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="sm:text-2xl text-xl">Add Income</p>
          <p className="sm:text-lg text-sm text-slate-500 font-light">
            Add your income now
          </p>
        </div>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-y-4">
          <div className="flex flex-col gap-2">
            <label for="income" className="text-sm font-medium text-gray-900">
              Income
            </label>
            <input
              type="number"
              className="border-solid border-2 py-2 px-4"
              placeholder="Input your income"
              name="income"
              id="income"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="category" className="text-sm font-medium text-gray-900">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="border-solid border-2 py-2 px-4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={"Salary"}>Salary</option>
              <option value={"Freelance"}>Freelance</option>
              <option value={"Investments"}>Investments</option>
              <option value={"Business Revenue"}>Business Revenue</option>
              <option value={"Other"}>Other</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label
              for="description"
              className="text-sm font-medium text-gray-900"
            >
              Description
            </label>
            <input
              type="text"
              className="border-solid border-2 py-2 px-4"
              placeholder="Input your description"
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            className="w-full py-3 bg-blue-500 rounded-lg text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddIncome;
