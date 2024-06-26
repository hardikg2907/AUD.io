import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useLogin";
import StarsCanvas from "../components/Stars";
import { signIn } from "../authFirebase";

const inputStyling =
  "w-full bg-[#383838] rounded-lg h-10 p-2 focus:outline-none";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useRegister();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    pfp: "",
  });
  const [checked, setChecked] = useState(false);
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center shadow-2xl">
      <StarsCanvas />

      <form
        className="bg-[#303030] flex py-2 px-3 justify-center flex-col items-center gap-4 rounded-sm w-1/3"
        onSubmit={(e) => {
          e.preventDefault();
          register(formData);
        }}
      >
        <h1 className="text-3xl text-white font-bold">Sign up</h1>
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
            type="text"
            placeholder="Username"
            className={inputStyling}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <input
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
        <div className="flex gap-3 w-full">
          <button
            type="button"
            className="duration-300 bg-[#252525] rounded-lg px-3 py-1 w-1/4 h-10 flex justify-center items-center"
            onClick={async () => {
              const user = await signIn();
              register(user);
            }}
          >
            <FcGoogle className="scale-150" />
          </button>
          <button className="bg-[#252525] w-full rounded-lg font-semibold duration-300 text-white text-xs">
            Sign up
          </button>
        </div>
        <div className="flex justify-start items-center gap-2">
          <input type="checkbox" />
          <p className="text-xs text-[#7b7b7b]">
            I read and accepted the{" "}
            <a
              href=""
              className="text-blue-400 hover:border-dashed hover:border-b hover:border-blue-400"
            >
              terms and conditions
            </a>{" "}
          </p>
        </div>
        <p className="text-xs text-[#7b7b7b]">
          Already a member?{" "}
          <Link
            className="text-white font-semibold hover:underline"
            to={"/login"}
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
