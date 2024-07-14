import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import http from "../Util/http";
import Navigation from "../Template/Navigation";
import Header from "../Template/Header";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const userDetail = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    fetchingData();
  }, []);

  const fetchingData = () => {
    http.get(`/transaction/${userDetail.id}`).then((response) => {
      // save data from backend to state variable, kasih ke transactions
      setData(response?.data.transactions ?? []);
    });
  };

  return (
    <div className="flex flex-col items-center h-screen bg-slate-100">
      <div className="sm:w-[600px] px-10  w-full flex flex-col gap-y-4 h-screen bg-white">
        {/* Header */}
        <Header />
        {/* Dashboard */}
        <div className="flex flex-col gap-y-2 py-8 bg-blue-200 items-center rounded-md">
          <p className="sm:text-lg text-sm text-slate-500">Balance Right Now</p>
          <p className="sm:text-3xl text-2xl text-slate-800">$2000</p>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="flex flex-col gap-y-2 py-8 bg-blue-200 items-center rounded-md w-full">
            <p className="sm:text-lg text-sm text-slate-500">Total Income</p>
            <p className="sm:text-3xl text-2xl text-slate-800">$2000</p>
          </div>
          <div className="flex flex-col gap-y-2 py-8 bg-blue-200 items-center rounded-md w-full">
            <p className="sm:text-lg text-sm text-slate-500">Total Expense</p>
            <p className="sm:text-3xl text-2xl text-slate-800">$2000</p>
          </div>
        </div>

        {/* Transaction */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p className="sm:text-xl text-lg text-slate-500">Total Expense</p>
            <a
              href="/transaction"
              className="text-blue-400 font-semibold sm:text-xl text-lg"
            >
              View All
            </a>
          </div>

          <table className="table-fixed border border-1 rounded-lg border-slate-200">
            <tbody>
              {React.Children.toArray(
                data
                  .filter((item) => item.inOrOut === 1)
                  .slice(0, 5)
                  .map((item) => (
                    <tr className="border-b border-slate-200">
                      <td className="p-4 ">{item?.category ?? "-"}</td>
                      <td className="p-4 w-8">
                        {formatter.format("-" + item?.amount)}
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        <Navigation />
      </div>
    </div>
  );
}

export default Dashboard;
