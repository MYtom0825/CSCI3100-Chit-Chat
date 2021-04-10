import React from "react";
import "./profile.css";

import ProfileDetail from "./profileDetail";

const profile = () => {
  const user = [{ name: "Tom",
                gender: "Male",
                picture: "",
                description: "Hi I am using react",
                facalty: "Engineering",
                university: "CUHK",
                years: "3",
                status: "A0",
                interest: ["Dancing","Pop music","Classic music"] 
              }];

  return (
    <nav>
      <img
        className="profile_img"
        src="https://placeimg.com/400/400/tech"
        alt="test"
        width="300"
        height="300"
      ></img>

      <div className="profile_detail">
        {user.map((user) => (
          <ProfileDetail
            na={user.name}
            gen={user.gender}
            pic={user.picture}
            des={user.description}
            fac={user.facalty}
            u={user.university}
            yrs={user.years}
            sts={user.status}
            int={user.interest}
          />
        ))}
      </div>
    </nav>
  );
};

export default profile;
