import { Input, Modal } from "antd";
import React, { useState } from "react";
import Edit from "../../assets/image/Edit.svg";
import AvatarComponent from "../../components/Avatar";
import ProfileContent from "../../components/ProfileContent";
import ProfileEdit from "../../components/ProfileEdit";
import "./index.css";

function Profile() {
  const [hideComponentContent, setHideComponentContent] = useState(true);
  const [hideComponentEdit, setHideComponentEdit] = useState(false);
  const [hideElement, setHideElement] = useState("");

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
    setHideElement("none");
  };

  const handleSaveProfile = () => {
    //Set time để không bị disconnect submit form từ component con.
    setTimeout(() => {
      setHideComponentEdit(false);
      setHideComponentContent(true);
      setHideElement("");
    }, 1);
  };

  return (
    <div className="container flex">
      <div>
        <div className="flex" style={{ alignItems: "center" }}>
          <p className="title-page">Edit Profile</p>
          <img
            src={Edit}
            alt="icon"
            style={{
              marginLeft: "16px",

              cursor: "pointer",
              height: "20px",
              width: "20px",
            }}
            className={hideElement}
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

      <AvatarComponent hideComponentEdit={hideComponentEdit} />

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
