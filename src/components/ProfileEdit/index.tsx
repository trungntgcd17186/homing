import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import Facebook from "../../image/Facebook.svg";
import Instagram from "../../image/Instagram.svg";
import Line from "../../image/LineSocialMedia.svg";
import Pinterest from "../../image/Pinterest.svg";
import Twitter from "../../image/Twitter.svg";
import Vimeo from "../../image/Vimeo.svg";
import In from "../../image/In.svg";

import { $getRoot, $getSelection } from "lexical";
import LexicalComposer from "@lexical/react/LexicalComposer";
import LexicalPlainTextPlugin from "@lexical/react/LexicalPlainTextPlugin";
import LexicalContentEditable from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalOnChangePlugin from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface IProp {
  disabled: boolean;
  handleSaveProfile: any;
}

export default function ProfileEdit({ disabled, handleSaveProfile }: IProp) {
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

  const theme = {
    // Theme styling goes here
  };

  // When the editor changes, you can get notified via the
  // LexicalOnChangePlugin!
  function onChangeText(editorState: any) {
    editorState.read(() => {
      // Read the contents of the EditorState here.
      const root = $getRoot();
      const selection = $getSelection();

      console.log(root, selection);
    });
  }

  // Lexical React plugins are React components, which makes them
  // highly composable. Furthermore, you can lazy load plugins if
  // desired, so you don't pay the cost for plugins until you
  // actually use them.
  function MyCustomAutoFocusPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      // Focus the editor when the effect fires!
      editor.focus();
    }, [editor]);

    return null;
  }

  // Catch any errors that occur during Lexical updates and log them
  // or throw them as needed. If you don't throw them, Lexical will
  // try to recover gracefully without losing user data.
  function onError(error: any) {
    console.error(error);
  }

  const initialConfig = {
    theme,
    onError,
  };

  function Editor() {
    return (
      <LexicalComposer initialConfig={initialConfig}>
        <LexicalPlainTextPlugin
          contentEditable={<LexicalContentEditable />}
          placeholder={<div>Enter some text...</div>}
        />
        <LexicalOnChangePlugin onChange={onChangeText} />
        <HistoryPlugin />
        <MyCustomAutoFocusPlugin />
      </LexicalComposer>
    );
  }

  return disabled ? (
    <div className="information">
      <Form
        name="basic"
        initialValues={{ remember: true }}
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
          <p className="add-phonenumber" onClick={showModal}>
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

        <p className="items-name">About me:</p>
        <Editor />

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
