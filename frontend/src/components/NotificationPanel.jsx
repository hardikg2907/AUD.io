import { useEffect, useState } from "react";
import { useMusicContext } from "../context/MusicContext";
import { AiOutlineClose } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const LikesNotifications = ({ item }) => (
  <div className="border-b-[1px] border-white p-3 flex justify-start gap-7 items-center">
    <img src={item?.icon} alt="dp" className="w-10 w- h-10 rounded-full" />
    <p>{item?.message}</p>
  </div>
);

const RequestsNotifications = ({
  item,
  accessAllowed,
  setAccessAllowed,
  setReRender,
}) => {
  const giveEditAccess = async (status) => {
    const res = await axios.patch(
      `submissions/access/${item?.submissionId}/${item?.userId}`,
      {
        status,
      }
    );
    if (res?.data) {
      setReRender((prev) => !prev);
    }
    // console.log(res?.data);
  };

  return (
    <div className="border-b-[1px] border-white p-3 flex justify-start items-center gap-7">
      <img src={item?.icon} alt="dp" className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-4">
        <p>{item?.message}</p>
        <div className="flex text-xs gap-4">
          <BsCheckLg
            className={`w-14 border-[1px] rounded-md px-2 py-1 h-8 border-blue-500 text-blue-500 cursor-pointer ${
              accessAllowed?.[item?.id]
                ? "bg-blue-500 !text-white"
                : "hover:opacity-60"
            } transition-all duration-300 ease-in-out`}
            onClick={() =>
              //   setAccessAllowed((prev) => ({ ...prev, [item?.id]: true }))
              giveEditAccess("accepted")
            }
            title="Allow"
          />
          <AiOutlineClose
            className={`w-14 border-[1px] rounded-md px-2 py-1 h-8 border-red-500 text-red-500 cursor-pointer ${
              accessAllowed?.[item?.id] === false
                ? "bg-red-500 !text-white"
                : "hover:opacity-60"
            } transition-all duration-300 ease-in-out`}
            onClick={() =>
              //   setAccessAllowed((prev) => ({ ...prev, [item?.id]: false }))
              giveEditAccess("rejected")
            }
            title="Deny"
          />
          {/* <AiOutlineClose className='w-14 border-[1px] rounded-md px-2 py-1 h-8 border-red-500 text-red-500 cursor-pointer' /> */}
        </div>
      </div>
    </div>
  );
};

const NotificationPanel = () => {
  const { isNotificationClicked, setIsNotificationClicked } = useMusicContext();
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState("All");
  const [notificationItems, setNotificationItems] = useState([]);
  const [accessAllowed, setAccessAllowed] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [reRender, setReRender] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const notificationMenu = [
    {
      name: "All",
    },
    {
      name: "Likes",
    },
    {
      name: "Requests",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "like",
      message: "Parth liked your song Test-1",
      icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      id: 2,
      type: "like",
      message: "Deepak liked your song Test-2",
      icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
    {
      id: 5,
      type: "like",
      message: "Deepak liked your song Test-5",
      icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    },
  ];

  const handelChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    const newData = notificationItems.filter((item) =>
      item?.message.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(newData);
  };

  const fetchData = async () => {
    const res = await axios.get(`user/requests/${user?._id}`);
    // console.log(res?.data);
    if (res?.data) {
      setNotificationItems((prev) => [
        ...res?.data?.map((e, index) => ({
          id: index + 1000,
          type: "req",
          message: `${e?.username} requested edit access to ${e?.submission?.name}`,
          icon: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          submissionId: e?.submission?._id,
          userId: e?.userId,
        })),
      ]);
    }
  };
  useEffect(() => {
    fetchData();
  }, [isNotificationClicked, reRender]);

  useEffect(() => {
    setSearchTerm("");
    if (activeTab === "Likes") {
      //   const notifs = notifications.filter((item) => item?.type === "like");
      //   setNotificationItems(notifs);
      //   setFilteredData(notifs);
    } else if (activeTab === "Requests") {
      //   const notifs = notifications.filter((item) => item?.type === "req");
      //   setNotificationItems(notifs);
      //   setFilteredData(notifs);
    } else {
      //   setNotificationItems(notifications);
      //   setFilteredData(notifications);
    }
  }, [activeTab]);
  // console.log(notificationItems);

  useEffect(() => {
    setActiveTab("All");
    setNotificationItems(notifications);
    setFilteredData(notifications);
    setSearchTerm("");
  }, [isNotificationClicked]);

  return (
    // isNotificationClicked && (<div className='absolute top-0 h-screen w-screen bg-[#1E1E1E] bg-opacity-80 z-40'>
    <div
      className={`bg-[#151515] h-screen ${
        isNotificationClicked ? "w-1/3 p-3" : "w-0"
      } transition-[width] duration-300 ease-in-out overflow-hidden scrollbar-hide absolute right-0 flex z-50 text-white`}
    >
      {isNotificationClicked && (
        <div className={`flex flex-col gap-4 h-full w-full`}>
          <div className="flex justify-between items-center w-full h-10">
            <h2 className="text-xl">Notifications</h2>
            <AiOutlineClose
              className="text-xl cursor-pointer"
              onClick={() => setIsNotificationClicked(false)}
              title="Close"
            />
          </div>
          <div className="flex w-full p-2 border-b-2 border-[#f03a47] gap-3 justify-evenly items-center">
            {notificationMenu.map((item) => (
              <button
                className={`rounded-md p-2 w-full ${
                  activeTab === item?.name
                    ? "bg-[#f03a47]"
                    : "hover:bg-[#5b2428]"
                } transition-all duration-300 ease-in-out`}
                onClick={() => setActiveTab(item?.name)}
              >
                {item.name}
              </button>
            ))}
          </div>
          <input
            type="text"
            className="w-full outline-none text-black p-2 rounded-sm"
            placeholder="Search"
            value={searchTerm}
            onChange={handelChange}
          />
          <div className="flex flex-col py-2 gap-2 h-full overflow-auto scrollbar-hide">
            {notificationItems?.filter((item) => item?.type === "req")
              .length ? (
              notificationItems
                ?.filter((item) => item?.type === "req")
                .map((item) => {
                  if (item.type === "like") {
                    return <LikesNotifications item={item} />;
                  } else if (item.type === "req") {
                    return (
                      <RequestsNotifications
                        item={item}
                        accessAllowed={accessAllowed}
                        setAccessAllowed={setAccessAllowed}
                        setReRender={setReRender}
                      />
                    );
                  }
                })
            ) : (
              <p>No notifications found</p>
            )}
          </div>
        </div>
      )}
    </div>
    // </div>)
  );
};

export default NotificationPanel;
