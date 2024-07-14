import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../Util/http";

function Header() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear("user");
    navigate("/login");
  };
  return (
    <div className="w-full  bg-white py-3 border-t-2 border-gray-100">
      <ul className="flex justify-between">
        <li>
          <p className="text-gray-600 hover:text-gray-900  py-2 block">
            Budget Tracker
          </p>
        </li>
        <li>
          <button
            onClick={logOut}
            className="text-gray-600 hover:text-gray-900 px-4 block py-2 border border-slate-500"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Header;
