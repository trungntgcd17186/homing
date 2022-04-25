import { Button, Carousel, Form, Input, Modal } from "antd";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../components/firebaseConfig";
import MyArticlesContent from "../../components/MyArticlesContent/MyArticlesContent";
import Editor from "../../components/ProfileEdit/Editor";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import "./index.css";

export default function MyArticles() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const callbackFunction = (childData: string) => {
    setMessage(childData);
  };

  const onFinish = async (values: { title: string; content: string }) => {
    console.log("Success:", {
      ...values,
    });
    // Add a new document in collection "cities"
    try {
      const docRef = await addDoc(collection(db, "content"), {
        ...values,
        content: message,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<{ title: string; content: string }>
  ) => {
    console.log("Failed:", errorInfo);
  };

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
        <p className="title-content">Or upload new article from a URL</p>
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

      <div style={{ marginTop: "40px" }}>
        <div className="component-wrapper">
          <MyArticlesContent />
        </div>
      </div>
      <Modal
        title="Add your content"
        visible={isModalVisible}
        onOk={handleOk}
        footer={null}
        okText="Save"
        width="40%"
        style={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            style={{
              marginLeft: "24px",
              display: "flex",
              flexDirection: "column",
            }}
            label="Title"
            name="title"
          >
            <Input
              placeholder="Top tips fors taging your home"
              style={{
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "24px",
                color: "#484848",
              }}
            />
          </Form.Item>
          <div
            style={{
              marginLeft: "24px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Editor parentCallback={callbackFunction} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "100%",
              height: "60px",
              boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <button
              onClick={handleOk}
              type="submit"
              style={{
                marginRight: "24px",
                height: "36px",
                width: "140px",
                background: "#8551DB",
                border: "1px solid #8551DB",
                boxSizing: "border-box",
                borderRadius: "39px",
                color: "#FFFFFF",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "20px",
              }}
            >
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
