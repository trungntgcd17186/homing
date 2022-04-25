import { Input, Modal } from "antd";
import React, { useContext, useState } from "react";
import Avatar from "../../assets/image/Avatar.svg";
import Edit from "../../assets/image/Edit.svg";
import ProfileContent from "../../components/ProfileContent";
import ProfileEdit from "../../components/ProfileEdit";
import { RouteKeyContext } from "../../Context/RouteContext";
import "./index.css";

function Profile() {
  const context = useContext(RouteKeyContext);
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

      <div className={"avatar-container" + " " + hideAvatar}>
        <img
          style={{ borderRadius: "50%" }}
          width="120"
          src={context.img || Avatar}
          alt="avatar"
        />
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
