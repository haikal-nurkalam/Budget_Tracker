import React from "react";
import NotFoundImage from "../img/404.png";

function NotFound() {
  return (
    <div className="flex flex-col items-center h-screen bg-slate-100">
      <div className="sm:w-[600px] px-10 pt-8 w-full flex flex-col gap-y-4 h-screen bg-white justify-center">
        <img
          src={NotFoundImage}
          alt="404 Not Found"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <p className=" sm:text-2xl text-xl sm:font-bold font-semibold ">
          Oops! Page Not Found
        </p>
        <p className=" sm:text-lg text-sm sm:font-light font-extralight ">
          It looks like the page you're trying to reach doesn't exist. Don't
          worry, let's get you back on track!
        </p>
        <a
          href="/"
          className="bg-blue-400 text-slate-100 py-2 text-center rounded-lg "
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;
