import React, { useState, useEffect } from "react";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const UserClass = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Default",
    login: "Default",
    location: "Default",
    avatar_url: "Default",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.github.com/users/Harshyaduvanshi9");
        const data = await response.json();
        console.log(data);
        
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();

    // Cleanup function for unmounting (if necessary)
    return () => {
      console.log("Component unmounted");
    };

  }, []);

  const { name, location, avatar_url, login } = userInfo;

  return (
    <div className="border border-blue-300 rounded-3xl flex items-center gap-6 p-4 w-96 m-auto">
      <img className="h-40" src={avatar_url} alt="User Avatar" />

      <div className="text-lg">
        <p>Name: {name}</p>
        <p>Username: @{login}</p>
        <p>Location: {location}</p>
        <a
          className="flex items-center gap-2 pt-4 font-bold uppercase text-sm tracking-widest text-sky-400"
          href="https://github.com/n4ryn"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub <BsFillArrowUpRightCircleFill />
        </a>
      </div>
    </div>
  );
};

export default UserClass;
