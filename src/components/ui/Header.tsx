import { Input } from "antd";
import React from "react";
import Homing from "../../image/Homing.svg";
import path573 from "../../image/Path5.svg";
import vector from "../../image/Vector.png";
import SearchIcon from "../../image/Search.svg";
import HomeIcon from "../../image/HomeIcon.svg";
import MessageIcon from "../../image/MessageIcon.svg";
import NotificationIcon from "../../image/NotificationIcon.svg";
import Line from "../../image/Line.svg";
import Path5 from "../../image/Path5.svg";
import Avatar from "../../image/Avatar.svg";
import DropdownIcon from "../../image/DropdownIcon.svg";
import Dean from "../../image/Dean.svg";
import TargetIcon from "../../image/TargetIcon.svg";
import "./index.css";

export default function Header() {
  return (
    <div className="header-container">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className="logo-container">
          <img src={Homing} alt="bird" />
        </div>

        <div className="input-icons">
          <Input placeholder="Add dress, City, Zip" />
        </div>
        <img style={{ marginLeft: "-30px" }} src={SearchIcon} alt="icon" />

        <img style={{ marginLeft: "30px" }} src={path573} alt="icon" />
        <img
          style={{ marginTop: "2px", marginLeft: "16px" }}
          src={TargetIcon}
          alt="icon"
        />
      </div>

      <div className="icon-container-right">
        <div className="title-container">
          <p className="title">Dashboard</p>
        </div>

        <img src={HomeIcon} alt="icon" />
        <img src={MessageIcon} alt="icon" />
        <img src={NotificationIcon} alt="icon" />
        <img src={Line} alt="icon" />
        <img src={Avatar} alt="icon" />
        <img src={Dean} alt="icon" />
        <img src={DropdownIcon} alt="icon" />
      </div>
    </div>
  );
}
