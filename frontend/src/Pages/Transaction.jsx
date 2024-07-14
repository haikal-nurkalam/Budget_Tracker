import React from "react";

import Navigation from "../Template/Navigation";
import Header from "../Template/Header";
import http from "../Util/http";
function Transaction() {
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
    <div className="flex flex-col items-center bg-slate-100">
      <div className="sm:w-[600px] px-10  w-full flex flex-col gap-y-4 bg-white">
        {/* Header */}
        <Header />

        <div>
          <p className="sm:text-2xl text-xl">Transaction</p>
          <p className="sm:text-lg text-sm text-slate-500 font-light">
            Here's your transaction, you can see all the money goes in & out
          </p>
        </div>

        <table className="table-fixed border border-1 rounded-lg border-slate-200">
          <tbody>
            {React.Children.toArray(
              data.map((item) => (
                <tr className="border-b border-slate-200">
                  <td className="p-4 ">
                    {item.inOrOut === 1 ? (
                      <div className="flex flex-col gap-2">
                        {item?.category ?? "-"}
                        <div className="px-4 py-1 rounded-lg bg-red-300 w-fit">
                          <p className="sm:text-xs">Expense</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {item?.category ?? "-"}
                        <div className="px-4 py-1 rounded-lg bg-blue-300 w-fit">
                          <p className="sm:text-xs">Income</p>
                        </div>
                      </div>
                    )}
                  </td>

                  <td className="p-4 w-8">
                    <div className="flex flex-col gap-2">
                      {formatter.format(item?.amount)}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Navigation */}
        <Navigation />
      </div>
    </div>
  );
}

export default Transaction;
