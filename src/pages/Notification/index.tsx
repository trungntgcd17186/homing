import React from "react";
import NotificationContent from "../../components/NotificationContent";
import "./index.css";

export default function Notification() {
  return (
    <div className="container">
      <h1 className="title-page">Notification Setting</h1>
      <p className="description">
        We may still send you important notifications about your account outside
        of your notification settings.
      </p>

      <NotificationContent
        modeName={"General notice:"}
        des={"These are notifications for all activity ...."}
        margin={"28px"}
        borderBottom={"1px solid #F1F1F1"}
      />
      <NotificationContent
        modeName={"Showing notice:"}
        des={"These are notifications for showing"}
        margin={"12px"}
        borderBottom={"1px solid #F1F1F1"}
      />
      <NotificationContent
        modeName={"Nest egg notice:"}
        des={"These are notifications for ..."}
        margin={"12px"}
        borderBottom={"1px solid #F1F1F1"}
      />
      <NotificationContent
        modeName={"Listing notice:"}
        des={"These are notifications for ..."}
        margin={"12px"}
        borderBottom={"1px solid #F1F1F1"}
      />
      <NotificationContent
        modeName={"Other notice:"}
        des={"These are notifications for ..."}
        margin={"12px"}
        borderBottom={"none"}
      />
    </div>
  );
}
