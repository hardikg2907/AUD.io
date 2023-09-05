import {useState} from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const inputStyling =
  "w-full bg-[#383838] rounded-md h-10 p-2 focus:outline-none";

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="bg-[#303030] flex py-2 px-3 justify-center flex-col items-center gap-4 rounded-sm w-1/3">
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
          <input type="text" placeholder="Full Name" className={inputStyling} />
          <input type="email" placeholder="Email" className={inputStyling} />
          <div className={inputStyling + " flex justify-between items-center"}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="bg-[#383838] w-full h-full focus:outline-none"
            />
            {showPassword ? <AiOutlineEye className="scale-150 cursor-pointer" onClick={()=>setShowPassword(prev=>!prev)}/>: <AiOutlineEyeInvisible className="scale-150 cursor-pointer" onClick={()=>setShowPassword(prev=>!prev)}/> }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
