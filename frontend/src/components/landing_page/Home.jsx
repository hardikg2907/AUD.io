import { motion } from "framer-motion";
import { BsPersonFillAdd } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <motion.div className="w-screen h-[90vh] overflow-hidden flex flex-col justify-center items-center relative">
      <div className="absolute inset-0 bg-bg-image bg-80 bg-no-repeat bg-center -z-10"></div>
      <div className="absolute inset-0 bg-black opacity-60 -z-10"></div>
      <p className="text-white text-7xl mb-5 z-10">MAKE YOUR OWN MUSIC</p>
      <p className="text-white text-3xl text-center z-10">
        Choose your musical style and start to lay <br /> down, record and share
        your mix
      </p>
      <div className="flex justify-between gap-10 items-center text-white text-2xl z-10 mt-8">
        <button
          style={{
            background:
              "linear-gradient(90deg, rgba(166,67,164,1) 0%, rgba(140,0,255,1) 50%, rgba(8,9,246,1) 100%)",
          }}
          className="rounded-full px-5 py-3 flex justify-center items-center gap-2 duration-200 hover:opacity-80"
          onClick={() => navigate("/login")}
        >
          <BiLogIn />
          Log In
        </button>
        <button
          style={{
            background:
              "linear-gradient(90deg, rgba(67,166,118,1) 0%, rgba(25,198,227,1) 50%, rgba(75,158,244,1) 100%)",
          }}
          className="rounded-full px-5 py-3 flex justify-center items-center gap-2 duration-200 hover:opacity-80"
          onClick={() => navigate("/signup")}
        >
          <BsPersonFillAdd />
          Sign Up
        </button>
      </div>
    </motion.div>
  );
};

export default Home;
