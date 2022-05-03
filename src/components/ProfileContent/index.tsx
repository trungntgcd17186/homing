import { Spin } from "antd";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Facebook from "../../assets/image/Facebook.svg";
import In from "../../assets/image/In.svg";
import Instagram from "../../assets/image/Instagram.svg";
import Line from "../../assets/image/LineSocialMedia.svg";
import Pinterest from "../../assets/image/Pinterest.svg";
import Twitter from "../../assets/image/Twitter.svg";
import Vimeo from "../../assets/image/Vimeo.svg";
import { Context } from "../../Context/RouteContext";
import AddPhone from "../AddPhone";
import { db } from "../firebaseConfig";
import VerifyPhoneNumber from "../VerifyPhoneNumber";

interface IProp {
  disabled: boolean;
}
export default function ProfileContent({ disabled }: IProp) {
  const context = useContext(Context);
  const [showSpinLoading, setShowSpinLoading] = useState(false);

  const usersCollectionRef = collection(db, "users");

  const [user, setUser] = useState<IData>({
    socialMedia: {},
    aboutMe: "",
  });

  useEffect(() => {
    getUsers();
    setShowSpinLoading(true);
    setTimeout(() => {
      setShowSpinLoading(false);
    }, 300);
  }, [context.edit]);

  const getUsers = async () => {
    const q = query(usersCollectionRef);

    const data: { docs: any[] } = await getDocs(q);

    const listUser = data.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setUser(listUser[0]);
  };

  const Icon: any = {
    Twitter: Twitter,
    Facebook: Facebook,
    Pinterest: Pinterest,
    Instagram: Instagram,
    Vimeo: Vimeo,
    In: In,
  };

  //Xử lý xóa attribute contenteditable gây ra lỗi không click link được.
  const dataFromTextEditor = user.aboutMe.split("contenteditable").join("");

  const handleCheckEmptyLicense = () => {
    if (user.license) {
      return <p>{user.license}</p>;
    } else {
      return <p className="empty-value-input">Please enter your license</p>;
    }
  };

  const handleCheckEmptyExperience = () => {
    if (user.experience?.length !== 0) {
      return <p>{user.experience}</p>;
    } else {
      return <p className="empty-value-input">Please enter your experience</p>;
    }
  };

  const handleCheckEmptyLanguage = () => {
    if (user.languages?.length !== 0) {
      return <p>{user.languages + ","} </p>;
    } else {
      return <p className="empty-value-input">Please enter your languages</p>;
    }
  };

  const handleCheckEmptyLocation = () => {
    if (user.location?.length !== 0) {
      return <p>{user.location + ","}</p>;
    } else {
      return <p className="empty-value-input">Please enter your location</p>;
    }
  };

  const handleCheckEmptySocialMedia = () => {
    if (Object.keys(user.socialMedia).length === 0) {
      return (
        <p className="empty-value-input">Please enter your social media</p>
      );
    } else {
      return Object.keys(user.socialMedia).map((value, index) => (
        <div className="flex" key={index}>
          <img
            width={value === "Facebook" ? "9px" : "15px"}
            src={Icon[value]}
            alt="icon"
          />

          <img
            style={
              value === "Facebook"
                ? { marginLeft: "20px" }
                : { marginLeft: "14px" }
            }
            src={Line}
            alt="icon"
          />
          <p
            style={{
              marginLeft: "20px",
              marginTop: "10px",
            }}
          >
            {user.socialMedia[value]}
          </p>
        </div>
      ));
    }
  };

  const handleCheckEmptyAboutMe = () => {
    if (dataFromTextEditor) {
      return (
        <div
          className="text-editor-wrraper"
          dangerouslySetInnerHTML={{
            __html: dataFromTextEditor,
          }}
        />
      );
    } else {
      return <p className="empty-value-input">Please introduce your self</p>;
    }
  };

  return (
    <>
      {(() => {
        if (showSpinLoading) return <Spin />;
        else {
          if (disabled) {
            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div className="information">
                    <div className="flex">
                      <div className="items-name">
                        <p>Name:</p>
                        <p>Email:</p>
                        <p>Phone number:</p>
                        <p>License#:</p>
                        <p>Experience:</p>
                        <p>Languages:</p>
                        <p>Location:</p>

                        <div className="flex">
                          <div>
                            <p style={{ width: "140px" }}>Social media:</p>
                          </div>
                          <div className="social-media-container">
                            {handleCheckEmptySocialMedia()}
                          </div>
                        </div>
                      </div>
                      <div style={{ height: "272px", width: "400px" }}>
                        <p>
                          {user.name ? user.name : "Please enter your name"}
                        </p>
                        <p>
                          {user.email ? user.email : "Please enter your email"}
                        </p>

                        <AddPhone />

                        {handleCheckEmptyLicense()}
                        {handleCheckEmptyExperience()}
                        {handleCheckEmptyLanguage()}
                        {handleCheckEmptyLocation()}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    dataFromTextEditor
                      ? "about-me-container"
                      : "about-me-container flex"
                  }
                >
                  <p className="items-name">About me:</p>

                  {handleCheckEmptyAboutMe()}
                </div>
              </div>
            );
          }
        }
      })()}
    </>
  );
}
