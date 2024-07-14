import React from "react";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import http from "../Util/http";
import toast, { Toaster } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isloading, setIsloading] = React.useState(false);

  //   If there is user in localstorage, set to /
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { data } = await http.post("/user/login", {
        email,
        password,
      });

      if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
        setIsloading(false);
      } else {
        setIsloading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-slate-100">
      <div className="sm:w-[600px] px-10 pt-8 w-full flex flex-col gap-y-4 h-screen bg-white">
        <Toaster />
        <div>
          <p className="sm:text-2xl text-xl">Welcome to Budget Tracker</p>
          <p className="sm:text-lg text-sm text-slate-500 font-light">
            Budget tracker is an good budget tracker for your expense
          </p>
        </div>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-y-4">
          <div className="flex flex-col gap-2">
            <label for="Email" className="text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="text"
              className="border-solid border-2 py-2 px-4"
              placeholder="Email Admin"
              name="Email"
              id="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="Password" className="text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="text"
              className="border-solid border-2 py-2 px-4"
              placeholder="Password Admin"
              name="Password"
              id="Password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full py-4 bg-slate-800 rounded-lg text-white"
            type="submit"
            disabled={isloading}
          >
            {isloading ? "Loading..." : "Login"}
          </button>
        </form>
        <div className="flex flex-col items-center">
          <p className="sm:text-lg text-sm text-slate-400 font-light">
            Didn't have account?
          </p>
          <a
            href="/register"
            className="sm:text-xl text-lg text-yellow-700 underline"
          >
            Register Here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
