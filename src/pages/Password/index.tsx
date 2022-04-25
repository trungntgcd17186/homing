import { Input, Form, Button } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";
import React from "react";

import "./index.css";
interface IPassword {
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
}
export default function Password() {
  const onFinish = (values: IPassword) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<IPassword>) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="container">
      <div>
        <h1 className="title-page">Password</h1>
        <p className="description">
          It’s a good idea to use a strong password to better protect your
          account.
        </p>
      </div>
      <div style={{ marginTop: "32px" }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label=""
            name="currentPassword"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="after ">Current Password: </label>
              <Input
                style={{ marginTop: "12px", width: "400px", height: "32px" }}
              />
            </div>
          </Form.Item>

          <Form.Item
            label=""
            name="newPassword"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="after">New password: </label>
              <Input.Password
                style={{ marginTop: "12px", width: "400px", height: "32px" }}
              />
            </div>
          </Form.Item>

          <Form.Item
            label=""
            name="confirmPassword:"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label className="after">Confirm new password: </label>
              <Input.Password
                style={{ marginTop: "12px", width: "400px", height: "32px" }}
              />
            </div>
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
              >
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
