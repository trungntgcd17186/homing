import React from "react";
import NotificationContent from "../../components/NotificationContent";
import "./index.css";

export default function Notification() {
  const listNotifications = [
    {
      modeName: "General notice:",
      des: "These are notifications for all activity ....",
      margin: "28px",
      borderBottom: "1px solid #F1F1F1",
    },
    {
      modeName: "Showing notice:",
      des: "These are notifications for showing",
      margin: "12px",
      borderBottom: "1px solid #F1F1F1",
    },
    {
      modeName: "Nest egg notice:",
      des: "These are notifications for ...",
      margin: "12px",
      borderBottom: "1px solid #F1F1F1",
    },
    {
      modeName: "Listing notice:",
      des: "These are notifications for ...",
      margin: "12px",
      borderBottom: "1px solid #F1F1F1",
    },
    {
      modeName: "Other notice:",
      des: "These are notifications for ...",
      margin: "12px",
      borderBottom: "none",
    },
  ];
  return (
    <div className="container">
      <h1 className="title-page">Notification Setting</h1>
      <p className="description">
        We may still send you important notifications about your account outside
        of your notification settings.
      </p>

      {listNotifications.map((item, index) => (
        <NotificationContent
          key={index}
          modeName={item.modeName}
          des={item.des}
          margin={item.margin}
          borderBottom={item.borderBottom}
        />
      ))}
    </div>
  );
}
