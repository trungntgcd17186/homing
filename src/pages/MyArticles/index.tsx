import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import Editor from "../../components/ProfileEdit/Editor";
import "./index.css";

export default function MyArticles() {
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

  const callbackFunction = () => {};
  return (
    <div className="container">
      <div>
        <h1 className="title-page">MyArticles</h1>
        <p className="description">You don't have any article...</p>
      </div>

      <div style={{ marginTop: "32px" }}>
        <p className="title-content">Create content</p>
        <Button
          style={{
            marginTop: "13px",
            height: "32px",
            width: "446px",
            borderRadius: "4px",
            border: "1px solid #8551db",
            boxSizing: "border-box",
            color: "#8551DB",
            fontWeight: "500",
            fontFamily: "Poppins",
            fontStyle: "normal",
          }}
          onClick={showModal}
        >
          Add your content
        </Button>
      </div>

      <div style={{ marginTop: "27px" }}>
        <p className="title-content">Or upload from a URL</p>
        <Input
          style={{
            marginTop: "12px",
            height: "32px",
            width: "446px",
            borderRadius: "4px",
            background: "#FFFFFF",
            border: "1px solid #DDE1E9",
          }}
        />
      </div>
      <Modal
        title="Add your content"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{
          style: {
            height: "36px",
            width: "140px",
            background: "#8551DB",
            border: "1px solid #8551DB",
            boxSizing: "border-box",
            borderRadius: "39px",
          },
        }}
        okText="Save"
        width="40%"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <p
          style={{
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#484848",
          }}
        >
          Title 1
        </p>
        <Editor parentCallback={callbackFunction} />
      </Modal>
    </div>
  );
}
