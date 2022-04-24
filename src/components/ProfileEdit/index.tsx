import { Button, Form, Input, Modal, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { RouteKeyContext } from "../../Context/RouteContext";
import Facebook from "../../image/Facebook.svg";
import In from "../../image/In.svg";
import Instagram from "../../image/Instagram.svg";
import Line from "../../image/LineSocialMedia.svg";
import Pinterest from "../../image/Pinterest.svg";
import Twitter from "../../image/Twitter.svg";
import Vimeo from "../../image/Vimeo.svg";
import { db } from "../firebaseConfig";
import Editor from "./Editor";
import "./style.css";

interface IProp {
  disabled: boolean;
  handleSaveProfile: any;
}

const getSrcFromFile = (file: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.originFileObj);
    reader.onload = () => resolve(reader.result);
  });
};

export default function ProfileEdit({ disabled, handleSaveProfile }: IProp) {
  const context = useContext(RouteKeyContext);
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

  const [message, setMessage] = useState("");
  const [socialObject, setSocialObject] = useState({});

  useEffect(() => {
    getUsers();
  }, [context.edit]);

  const getUsers = async () => {
    const q = query(usersCollectionRef);

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

  const callbackFunction = (childData: string) => {
    setMessage(childData);
  };

  const onFinish = async (values: any) => {
    console.log("Success:", {
      ...values,
      aboutMe: message,
      avatar: context.img,
    });
    // Add a new document in collection "cities"
    try {
      const userDoc = doc(db, "users", "1RljEtbnk0BcXx2oq3ws");
      await updateDoc(userDoc, {
        ...values,
        aboutMe: message,
        socialMedia: socialObject,
        avatar: context.img,
      });
      console.log("Document written");

      context.setEdit(!context.edit);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleChangeInput = (e: any, key: string) => {
    setSocialObject({ ...socialObject, [key]: e.target.value });
  };

  function getBase64(img: any, callback: any) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

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

  const handleChange = (info: any) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        context.setImg(imageUrl)
      );
    }
  };

  const handleDeleteImage = () => {
    context.setImg("");
  };

  return disabled ? (
    <div className="information mgr flex">
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          className="item"
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

        <div className="item flex">
          <p>Phone number:</p>
          <p className="add-phonenumber" onClick={showModal}>
            Add your phone number
          </p>
        </div>

        <Form.Item
          className="item"
          style={{ marginTop: "10px" }}
          label="License#"
          name="license"
        >
          <Input className="form-input" />
        </Form.Item>

        <Form.Item label="Experience" name="experience">
          <Input className="form-input" />
        </Form.Item>

        <Form.Item label="Languages" name="languages">
          <Input className="form-input" />
        </Form.Item>

        <Form.Item label="Location" name="location">
          <Input className="form-input" />
        </Form.Item>

        <Form.Item label="Social Media" name="socialMedia">
          <Input
            defaultValue={user.socialMedia.Twitter}
            onChange={(e) => handleChangeInput(e, "Twitter")}
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

          <Input
            defaultValue={user.socialMedia.Pinterest}
            onChange={(e) => handleChangeInput(e, "Pinterest")}
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

          <Input
            defaultValue={user.socialMedia.Facebook}
            onChange={(e) => handleChangeInput(e, "Facebook")}
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

          <Input
            defaultValue={user.socialMedia.Instagram}
            onChange={(e) => handleChangeInput(e, "Instagram")}
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

          <Input
            defaultValue={user.socialMedia.Vimeo}
            onChange={(e) => handleChangeInput(e, "Vimeo")}
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

          <Input
            defaultValue={user.socialMedia.In}
            onChange={(e) => handleChangeInput(e, "In")}
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
        </Form.Item>

        <Form.Item label="" name="aboutMe">
          <p className="items-name">About me:</p>
          <Editor parentCallback={callbackFunction} />
        </Form.Item>

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
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

          <button
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
            type="submit"
            onClick={handleSaveProfile}
          >
            Save
          </button>
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

      <div style={{ marginLeft: "100px" }}>
        <ImgCrop shape="round" grid>
          <Upload
            className="avatar-uploader"
            name="avatar"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            onChange={handleChange}
            onPreview={onPreview}
          >
            {context.img ? (
              <>
                <img
                  src={context.img}
                  alt=""
                  style={{ borderRadius: "50%", width: "120px" }}
                  className="avatar"
                />
                <div className="flex" style={{ color: "#8551DB" }}>
                  <p>Change</p>
                  <p style={{ marginLeft: "28px" }} onClick={handleDeleteImage}>
                    Delete
                  </p>
                </div>
              </>
            ) : (
              <div
                className="flex"
                style={{ color: "#8551DB", marginTop: "120px" }}
              >
                <p>Change</p>
                <p style={{ marginLeft: "28px" }} onClick={handleDeleteImage}>
                  Delete
                </p>
              </div>
            )}
          </Upload>
        </ImgCrop>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
