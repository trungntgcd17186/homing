import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import In from "../../image/In.svg";
import Line from "../../image/LineSocialMedia.svg";
import { db } from "../firebaseConfig";
interface IProp {
  disabled: boolean;
}
export default function ProfileContent({ disabled }: IProp) {
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
  }, []);

  const getUsers = async () => {
    const q = query(
      usersCollectionRef,
      where("id", "==", " t1Ox77TWQibrKfEt9D8J")
    );

    const data: { docs: any[] } = await getDocs(q);

    const listUser = data.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setUser(listUser[0]);
  };

  const showModal = () => {};

  const Icon: any = {
    Twitter: "/static/media/Twitter.5e3bee320b0235937e011820c5275185.svg",
    Facebook: "/static/media/Facebook.6e8e1dac00846bcfae2810fc4ea58d24.svg",
    Pinterest: "/static/media/Pinterest.ba21f25a619aeb5d6b198a45f98a24f5.svg",
    Instagram: "/static/media/Instagram.e612619e937436d983a26968658674f8.svg",
    Vimeo: "/static/media/Vimeo.689f47b40b8907537f778ea426b5bd99.svg",
    In: "/static/media/In.dc0ea9ddc9ccc212ac1fe52e7b755064.svg",
  };

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
        <p className={"paragraph"}>{user.aboutMe}</p>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
