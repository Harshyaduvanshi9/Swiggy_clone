import React, { useState } from "react";
import UserClass from "./UserClass";

const About = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleShowProfile = () => {
    setShowProfile((prevState) => !prevState);
  };

  return (
    <div className="min-h-[calc(100vh_-_152px)] flex flex-col justify-start items-center">
      <button
        className="bg-orange-400 text-white px-6 py-2 rounded-md hover:drop-shadow-lg"
        onClick={handleShowProfile}
      >
        About me
      </button>

      {showProfile && (
        <UserClass name={"First"} location={"Jaipur(Class)"} />
      )}
    </div>
  );
};

export default About;
