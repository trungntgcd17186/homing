import React from "react";
import Facebook from "../../image/Facebook.svg";
import Instagram from "../../image/Instagram.svg";
import Line from "../../image/LineSocialMedia.svg";
import Pinterest from "../../image/Pinterest.svg";
import Twitter from "../../image/Twitter.svg";

interface IProp {
  disabled: boolean;
}
export default function ProfileContent({ disabled }: IProp) {
  const showModal = () => {};
  return disabled ? (
    <div className="information">
      <div className="flex">
        <div className="items-name">
          <p>Name</p>
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
              <div className="flex">
                <img width="16px" src={Twitter} alt="icon" />

                <img style={{ marginLeft: "14px" }} src={Line} alt="icon" />
                <p style={{ marginLeft: "20px", marginTop: "10px" }}>
                  plus.google.com/hdsfdjkshfd
                </p>
              </div>

              <div className="flex">
                <img width="13px" src={Pinterest} alt="icon" />
                <img style={{ marginLeft: "17px" }} src={Line} alt="icon" />
                <p style={{ marginLeft: "20px", marginTop: "12px" }}>
                  plus.google.com/hdsfdjkshfd
                </p>
              </div>
              <div className="flex">
                <img width="9px" src={Facebook} alt="icon" />
                <img style={{ marginLeft: "21px" }} src={Line} alt="icon" />
                <p style={{ marginLeft: "20px", marginTop: "12px" }}>
                  plus.google.com/hdsfdjkshfd
                </p>
              </div>
              <div className="flex">
                <img width="16px" src={Instagram} alt="icon" />
                <img style={{ marginLeft: "14px" }} src={Line} alt="icon" />
                <p style={{ marginLeft: "20px", marginTop: "12px" }}>
                  plus.google.com/hdsfdjkshfd
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Dean Dircarlo</p>
          <p>Lisa11123@gmail.com</p>
          <p className="add-phonenumber" onClick={showModal}>
            Add your phone number
          </p>
          <p>70980980</p>
          <p>5 Years</p>
          <p>English, French</p>
          <p>Orange County, Costa Meta </p>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
