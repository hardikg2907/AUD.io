import { Link } from "react-router-dom";
import StarsCanvas from "../components/Stars";
import EditAudio from "../components/landing_page/EditAudio";
import Home from "../components/landing_page/Home";
import Features from "../components/landing_page/Features";
import AppFlow from "../components/landing_page/AppFlow";
import Navbar from "../components/landing_page/Navbar";

const LandingPage = () => {

  return (
    <div className="bg-black h-screen relative flex flex-col items-center z-10 overflow-hidden">
      <Navbar/>
      <div className="h-[90vh] w-screen overflow-y-auto overflow-x-hidden px-3">
        <Home />
        <EditAudio />
        <StarsCanvas />
        <Features />
        <AppFlow />
      </div>
    </div>
  );
};

export default LandingPage;
