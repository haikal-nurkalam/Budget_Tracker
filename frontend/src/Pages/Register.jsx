import React from "react";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import http from "../Util/http";
import toast, { Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isloading, setIsloading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true); // Move this to the beginning of the function to indicate the start of the loading process

    try {
      const { data } = await http.post("/user", {
        username,
        email,
        password,
      });

      if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsloading(false); // Ensure this is called in the finally block to stop the loading indicator
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-slate-100">
      <div className="sm:w-[600px] px-10 pt-8 w-full flex flex-col gap-y-4 h-screen bg-white">
        <Toaster />
        <div>
          <p className="sm:text-2xl text-xl">Register</p>
          <p className="sm:text-lg text-sm text-slate-500 font-light">
            Register your account to login to Budget Tracker
          </p>
        </div>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-y-4">
          <div className="flex flex-col gap-2">
            <label for="Username" className="text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              className="border-solid border-2 py-2 px-4"
              placeholder="Input your username"
              name="Username"
              id="Username"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="Email" className="text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="text"
              className="border-solid border-2 py-2 px-4"
              placeholder="Input your email"
              name="Email"
              id="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label for="Email" className="text-sm font-medium text-gray-900">
              Password
            </label>
            <input
              type="password"
              className="border-solid border-2 py-2 px-4"
              placeholder="Input your password"
              name="Email"
              id="Email"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full py-4 bg-slate-800 rounded-lg text-white"
            type="submit"
            disabled={isloading}
          >
            {isloading ? "Loading..." : "Register Now"}
          </button>
        </form>
        <div className="flex flex-col items-center">
          <p className="sm:text-lg text-sm text-slate-400 font-light">
            Have an account?
          </p>
          <a
            href="/login"
            className="sm:text-xl text-lg text-yellow-700 underline"
          >
            Login Here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
