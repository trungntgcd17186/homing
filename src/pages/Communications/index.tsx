import React from "react";
import { Switch } from "antd";
import "./index.css";

export default function Communications() {
  function onChange(checked: boolean) {
    console.log(`switch to ${checked}`);
  }
  return (
    <div className="container">
      <div>
        <h1 className="title-page">Communications</h1>
        <p className="description">
          We will contact you when we have important information
        </p>
      </div>

      <div style={{ marginTop: "28px" }}>
        <div style={{ display: "flex", height: "20px" }}>
          <Switch size="small" defaultChecked onChange={onChange} />
          <p style={{ marginLeft: "17px", marginTop: "-4px" }}>Email</p>
        </div>

        <div style={{ display: "flex", marginTop: "12px" }}>
          <Switch size="small" defaultChecked onChange={onChange} />
          <p style={{ marginLeft: "17px", marginTop: "-4px" }}>Phone</p>
        </div>
      </div>
    </div>
  );
}
