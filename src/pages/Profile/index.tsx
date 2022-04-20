import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState } from "react";
import Edit from "../../image/Edit.svg";
import Facebook from "../../image/Facebook.svg";
import Instagram from "../../image/Instagram.svg";
import Line from "../../image/LineSocialMedia.svg";
import Pinterest from "../../image/Pinterest.svg";
import Twitter from "../../image/Twitter.svg";
import Avatar from "../../image/UploadAvatar.svg";
import "./index.css";
import { Modal, Button } from "antd";

const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

function Profile() {
  const [fileList, setFileList] = useState<any>([
    {
      uid: "-1",
      url: Avatar,
    },
  ]);

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: any) => {
    const src = file.url || (await getSrcFromFile(file));
    const imgWindow = window.open(src);

    if (imgWindow) {
      const image = new Image();
      image.src = src;
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    console.log("object");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="container">
      <div className="flex">
        <p className="title-page">Edit Profile</p>
        <img
          src={Edit}
          alt="icon"
          style={{ marginLeft: "16px", marginTop: "-20px" }}
        />
      </div>

      <div className="content-container">
        <div className="items-name">
          <p>Name</p>
          <p>Email:</p>
          <p>Phone number:</p>
          <p>License#:</p>
          <p>Experience:</p>
          <p>Languages:</p>
          <p>Location:</p>
          <p>Social media:</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div className="information">
            <p>Dean Dircarlo</p>
            <p>Lisa11123@gmail.com</p>
            <p className="add-phonenumber">Add your phone number</p>
            <p>70980980</p>
            <p>5 Years</p>
            <p>English, French</p>
            <p>Orange County, Costa Meta </p>

            <div className="social-media-container">
              <div className="flex">
                <img width="16px" src={Twitter} alt="icon" />

                <img style={{ marginLeft: "14px" }} src={Line} alt="icon" />
                <p style={{ marginLeft: "20px" }}>
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
          <div className="avatar-container">
            <ImgCrop grid rotate>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 2 && "Change"}
              </Upload>
            </ImgCrop>
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <p className="items-name">About me:</p>
        <p className="paragraph">
          Lorem: ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem: ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscin.
        </p>
      </div>
    </div>
  );
}

export default Profile;
