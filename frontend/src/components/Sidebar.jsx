import { useState } from "react";
import { FiHome, FiFolder, FiMusic, FiUser, FiCompass } from "react-icons/fi";
import logo from "/logo.png";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState("Home");

  const sideMenu = [
    {
      name: "Home",
      icon: <FiHome />,
    },
    {
      name: "Discover",
      icon: <FiCompass />,
    },
    {
      name: "Submit Music",
      icon: <FiMusic />,
    },
    {
      name: "Submissions",
      icon: <FiFolder />,
    },
    {
      name: "Account",
      icon: <FiUser />,
    },
  ];

  return (
    <div className="flex flex-col items-center gap-2 h-fit py-5 pl-2 rounded-3xl w-full bg-[#303030]">
      <img src={logo} className="mb-10 scale-[2.5] -ml-2" />
      {sideMenu?.map((item) => (
        <div
          key={item.name}
          className={`flex flex-col text-[#7B7B7B] cursor-pointer transition-[color] duration-300 ease-in-out w-full items-center py-5 text-center  text-[0.7rem] ${
            selectedItem === item.name
              ? "bg-[#1E1E1E] tab"
              : "hover:text-gray-300"
          }`}
          onClick={() => setSelectedItem(item?.name)}
        >
          {item?.icon}
          <p>{item?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
