import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="p-3">
      <div className="w-full flex gap-2 justify-end">
        <Link to={"/login"}>
          <button className="text-white rounded-md bg-transparent px-2 py-1 hover:bg-slate-600 duration-200 ease-out border border-white">
            Login
          </button>
        </Link>
        <Link to={"/signup"}>
          <button className="text-white rounded-md bg-transparent px-2 py-1 hover:bg-slate-600 duration-200 ease-out border border-white">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
