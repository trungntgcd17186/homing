import { Input, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useState, useEffect } from "react";
import Edit from "../../image/Edit.svg";

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
  const [fileList, setFileList] = useState<any>([
    {
      uid: "-1",
      url: Avatar,
    },
  ]);
  const [hideComponentContent, setHideComponentContent] = useState(true);
  const [hideComponentEdit, setHideComponentEdit] = useState(false);

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
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            // showUploadList={false}
            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 2 && "Change"}
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
