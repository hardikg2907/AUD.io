import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import StarsCanvas from "../components/Stars";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { signIn } from "../authFirebase";

const inputStyling =
  "w-full bg-[#383838] rounded-lg h-10 p-2 focus:outline-none";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center shadow-2xl">
      <StarsCanvas />

      <form
        className="bg-[#303030] flex py-3 px-3 justify-center flex-col items-center gap-4 rounded-sm w-1/3"
        onSubmit={(e) => {
          e.preventDefault();
          login(formData);
        }}
      >
        <h1 className="text-3xl text-white font-bold">Sign in</h1>
        <p className="text-white text-xs">
          To upload music and images, you must accept our
          <br />{" "}
          <a
            href=""
            className="text-blue-400 hover:border-dashed hover:border-b hover:border-blue-400"
          >
            terms and conditions
          </a>{" "}
          on the registration website
        </p>

        <div className="flex flex-col gap-2 w-full text-xs text-white">
          <input
            autoFocus
            id="email"
            type="email"
            placeholder="Email"
            className={inputStyling}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <div className={inputStyling + " flex justify-between items-center"}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              className="bg-[#383838] w-full h-full focus:outline-none"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {showPassword ? (
              <AiOutlineEye
                className="scale-150 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="scale-150 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            )}
          </div>
        </div>
        <a
          href=""
          className="text-[10px] self-start -mt-3 text-blue-400 hover:border-dashed hover:border-b hover:border-blue-400"
        >
          Forgot your password?
        </a>
        <div className="flex gap-3 w-full">
          <button
            type="button"
            className="duration-300 bg-[#252525] rounded-lg px-3 py-1 w-1/4 h-10 flex justify-center items-center"
            onClick={async () => {
              const user = await signIn();
              login(user);
            }}
          >
            <FcGoogle className="scale-150" />
          </button>
          <button className="bg-[#252525] w-full rounded-lg font-semibold duration-300 text-white text-xs">
            Sign in
          </button>
        </div>
        <p className="text-xs text-[#7b7b7b]">
          Not a member?{" "}
          <Link
            className="text-white font-semibold hover:underline"
            to={"/signup"}
          >
            Sign up
          </Link>{" "}
          now
        </p>
      </form>
    </div>
  );
};

export default Login;
