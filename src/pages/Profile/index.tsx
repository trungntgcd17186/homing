import { Input, message, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState, useEffect } from "react";
import Edit from "../../image/Edit.svg";
import { SmileOutlined } from "@ant-design/icons";
import Avatar from "../../image/UploadAvatar.svg";
import "./index.css";
import { Modal, Button } from "antd";
import ProfileContent from "../../components/ProfileContent";
import ProfileEdit from "../../components/ProfileEdit";

const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

function Profile() {
  const [hideComponentContent, setHideComponentContent] = useState(true);
  const [hideComponentEdit, setHideComponentEdit] = useState(false);

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  // function beforeUpload(file: any) {
  //   const isJPG = file.type === "image/jpeg";
  //   if (!isJPG) {
  //     message.error("You can only upload JPG file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  //   return isJPG && isLt2M;
  // }

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

  const [img, setImg] = useState("");

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => setImg(imageUrl));
    }
  };

  const handleDeleteImage = () => {
    setImg("");
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleEditProfile = () => {
    setHideComponentContent(false);
    setHideComponentEdit(true);
  };

  const handleSaveProfile = () => {
    //Set time để không bị disconnect submit form từ component con.
    setTimeout(() => {
      setHideComponentEdit(false);
      setHideComponentContent(true);
    }, 1);
  };

  return (
    <div className="container flex">
      <div>
        <div className="flex">
          <p className="title-page">Edit Profile</p>
          <img
            src={Edit}
            alt="icon"
            style={{ marginLeft: "16px", marginTop: "-20px" }}
            onClick={handleEditProfile}
          />
        </div>

        <div className="content-container">
          <ProfileContent disabled={hideComponentContent} />
          <ProfileEdit
            handleSaveProfile={handleSaveProfile}
            disabled={hideComponentEdit}
          />
        </div>
      </div>

      <div className="avatar-container">
        <ImgCrop shape="round" grid>
          <Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChange}
            onPreview={onPreview}
          >
            {img ? (
              <>
                <img
                  src={img}
                  alt=""
                  style={{ borderRadius: "50%", width: "150px" }}
                  className="avatar"
                />
                <p>Change</p>
                <p onClick={handleDeleteImage}>Delete</p>
              </>
            ) : (
              <>
                <p>Change</p>
                <p onClick={handleDeleteImage}>Delete</p>
              </>
            )}
          </Upload>
        </ImgCrop>
      </div>

      <Modal
        title="Add Phone Number"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Fill Your Phone Number</p>
        <Input />
      </Modal>
    </div>
  );
}

export default Profile;
