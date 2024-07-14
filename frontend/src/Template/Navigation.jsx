import React from "react";

function Navigation() {
  return (
    <div className="fixed bottom-0 sm:w-[600px] left-1/2 transform -translate-x-1/2 bg-white py-3 border-t-2 border-gray-100 ">
      <ul className="flex justify-around items-center py-2">
        <li className="">
          <a href="/" className="text-gray-600 hover:text-gray-900 px-4 py-2 ">
            Home
          </a>
        </li>
        <li className="">
          <a
            href="/expense"
            className="text-gray-600 hover:text-gray-900 px-4 py-2 "
          >
            Add
          </a>
        </li>
        <li className="">
          <a
            href="/transaction"
            className="text-gray-600 hover:text-gray-900 px-4 py-2 "
          >
            Transaction
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
