import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { RouteKeyContext } from "../../Context/RouteContext";

import Line from "../../image/LineSocialMedia.svg";
import { db } from "../firebaseConfig";
interface IProp {
  disabled: boolean;
}
export default function ProfileContent({ disabled }: IProp) {
  const context = useContext(RouteKeyContext);
  const usersCollectionRef = collection(db, "users");
  const [user, setUser] = useState<{
    name: string;
    email: string;
    phoneNumber: number;
    license: number;
    experience: string;
    languages: string;
    location: string;
    socialMedia: any;
    aboutMe: string;
  }>({
    name: "",
    email: "",
    phoneNumber: 0,
    license: 0,
    experience: "",
    languages: "",
    location: "",
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
    Twitter: "/static/media/Twitter.b5e2a5ef6f07796d5a4fce77bb3a01f4.svg",
    Facebook: "/static/media/Facebook.4eb940287a5145d16f1dd20380022f80.svg",
    Pinterest: "/static/media/Pinterest.6010af6825fb60cd492793ca646453e3.svg",
    Instagram: "/static/media/Instagram.04bb7483af5eda8317806d8690b820f2.svg",
    Vimeo: "/static/media/Vimeo.992606791065f80a8c074dffdd24c2c0.svg",
    In: "/static/media/In.17e7f2e4703f84216e4c90d385356166.svg",
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
