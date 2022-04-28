import { Input, Modal } from "antd";
import React, { useContext, useState } from "react";
import Avatar from "../../assets/image/Avatar.svg";
import Edit from "../../assets/image/Edit.svg";
import AvatarComponent from "../../components/Avatar";
import ProfileContent from "../../components/ProfileContent";
import ProfileEdit from "../../components/ProfileEdit";
import { RouteKeyContext } from "../../Context/RouteContext";
import "./index.css";

function Profile() {
  const [hideComponentContent, setHideComponentContent] = useState(true);
  const [hideComponentEdit, setHideComponentEdit] = useState(false);
  const [hideAvatar, setHideAvatar] = useState("");

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
    setHideAvatar("none");
  };

  const handleSaveProfile = () => {
    //Set time để không bị disconnect submit form từ component con.
    setTimeout(() => {
      setHideComponentEdit(false);
      setHideComponentContent(true);
      setHideAvatar("");
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

      <AvatarComponent />

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
