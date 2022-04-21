import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import Facebook from "../../image/Facebook.svg";
import Instagram from "../../image/Instagram.svg";
import Line from "../../image/LineSocialMedia.svg";
import Pinterest from "../../image/Pinterest.svg";
import Twitter from "../../image/Twitter.svg";
import Vimeo from "../../image/Vimeo.svg";
import In from "../../image/In.svg";

import "./style.css";
import Editor from "./Editor";

import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

interface IProp {
  disabled: boolean;
  handleSaveProfile: any;
}

export default function ProfileEdit({ disabled, handleSaveProfile }: IProp) {
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log(user.aboutMe);

  return disabled ? (
    <div className="information mgr">
      <Form
        name="basic"
        initialValues={{
          name: user.name,
          email: user.email,
          license: user.license,
          experience: user.experience,
          languages: user.languages,
          location: user.location,
          socialMedia: user.socialMedia,
          aboutMe: user.aboutMe,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input className="form-input" />
        </Form.Item>

        <div className="flex">
          <p style={{ marginLeft: "3px" }}>Phone number:</p>
          <p className="add-phonenumber mgl32" onClick={showModal}>
            Add your phone number
          </p>
        </div>

        <Form.Item
          label="License#"
          name="license"
          rules={[{ required: true, message: "Please input your license!" }]}
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          label="Experience"
          name="experience"
          rules={[{ required: true, message: "Please input your experience!" }]}
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          label="Languages"
          name="languages"
          rules={[{ required: true, message: "Please input your languages!" }]}
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          label="Location"
          name="location"
          rules={[{ required: true, message: "Please input your location!" }]}
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item
          label="Social Media"
          name="socialMedia"
          rules={[
            {
              required: true,
              message: "Please input your Social Media!",
            },
          ]}
        >
          <div className="flex">
            <Input
              suffix={
                <div className="suffix-container">
                  <img width="16px" src={Twitter} alt="icon" />
                  <img
                    style={{ marginLeft: "14px", height: "20px" }}
                    src={Line}
                    alt="icon"
                  />
                </div>
              }
              className="form-input"
            />
          </div>

          <div className="flex">
            <Input
              suffix={
                <div className="suffix-container">
                  <img width="13px" src={Pinterest} alt="icon" />
                  <img
                    style={{ marginLeft: "17px", height: "20px" }}
                    src={Line}
                    alt="icon"
                  />
                </div>
              }
              className="form-input margin12"
            />
          </div>

          <div className="flex">
            <Input
              suffix={
                <div className="suffix-container">
                  <img width="9px" src={Facebook} alt="icon" />
                  <img
                    style={{ marginLeft: "21px", height: "20px" }}
                    src={Line}
                    alt="icon"
                  />
                </div>
              }
              className="form-input margin12"
            />
          </div>

          <div className="flex">
            <Input
              suffix={
                <div className="suffix-container">
                  <img width="16px" src={Instagram} alt="icon" />
                  <img
                    style={{ marginLeft: "14px", height: "20px" }}
                    src={Line}
                    alt="icon"
                  />
                </div>
              }
              className="form-input margin12"
            />
          </div>

          <div className="flex">
            <Input
              suffix={
                <div className="suffix-container">
                  <img width="16px" src={Vimeo} alt="icon" />
                  <img
                    style={{ marginLeft: "14px", height: "20px" }}
                    src={Line}
                    alt="icon"
                  />
                </div>
              }
              className="form-input margin12"
            />
          </div>

          <div className="flex">
            <Input
              suffix={
                <div className="suffix-container">
                  <img width="16px" src={In} alt="icon" />
                  <img
                    style={{ marginLeft: "14px", height: "20px" }}
                    src={Line}
                    alt="icon"
                  />
                </div>
              }
              className="form-input margin12"
            />
          </div>
        </Form.Item>

        <Form.Item
          label=""
          name="aboutMe"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <p className="items-name">About me:</p>
          <Editor />
        </Form.Item>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Form.Item name="remember" valuePropName="checked">
            <Button
              style={{
                width: "140px",
                height: "36px",
                background: "#FFFFFF",
                border: "1px solid #8551DB",
                boxSizing: "border-box",
                borderRadius: "29px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#8551DB",
              }}
            >
              Cancel
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              style={{
                width: "140px",
                height: "36px",
                background: "#8551DB",
                border: "1px solid #8551DB",
                boxSizing: "border-box",
                borderRadius: "29px",
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "20px",
                color: "#FFFFFF",
                marginLeft: "28px",
              }}
              type="primary"
              htmlType="submit"
              onClick={handleSaveProfile}
            >
              Save
            </Button>
          </Form.Item>
        </div>
      </Form>
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
  ) : (
    <div></div>
  );
}
