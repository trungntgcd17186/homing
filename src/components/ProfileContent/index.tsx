import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { RouteKeyContext } from "../../Context/RouteContext";

import Line from "../../assets/image/LineSocialMedia.svg";
import Twitter from "../../assets/image/Twitter.svg";
import Facebook from "../../assets/image/Facebook.svg";
import Pinterest from "../../assets/image/Pinterest.svg";
import Instagram from "../../assets/image/Instagram.svg";
import Vimeo from "../../assets/image/Vimeo.svg";
import In from "../../assets/image/In.svg";

import { db } from "../firebaseConfig";
interface IProp {
  disabled: boolean;
}
export default function ProfileContent({ disabled }: IProp) {
  const context = useContext(RouteKeyContext);
  const usersCollectionRef = collection(db, "users");
  const [user, setUser] = useState<IData>({
    socialMedia: {},
    aboutMe: "",
  });

  useEffect(() => {
    getUsers();
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

  const showModal = () => {};

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

  return disabled ? (
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
                  {Object.keys(user.socialMedia).length === 0 ? (
                    <p>Please enter your social media</p>
                  ) : (
                    Object.keys(user.socialMedia).map((value, index) => (
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
                        <p style={{ marginLeft: "20px", marginTop: "10px" }}>
                          {user.socialMedia[value]}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p className="add-phonenumber" onClick={showModal}>
                Add your phone number
              </p>
              <p>{user.license}</p>
              <p>{user.experience}</p>
              <p>{user.languages}</p>
              <p>{user.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", marginTop: "20px" }}>
        <p className={"items-name"}>About me:</p>

        <div dangerouslySetInnerHTML={{ __html: dataFromTextEditor }} />
      </div>
    </div>
  ) : (
    <div></div>
  );
}
