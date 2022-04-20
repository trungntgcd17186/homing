import React from "react";
import { Switch } from "antd";
import "./index.css";

interface IProps {
  modeName: string;
  des: string;
  margin: string;
  borderBottom: string;
}

export default function NotificationContent({
  modeName,
  des,
  margin,
  borderBottom,
}: IProps) {
  function onChange(checked: any) {
    console.log(`switch to ${checked}`);
  }
  return (
    <div style={{ marginTop: `${margin}` }}>
      <div
        style={{
          borderBottom: `${borderBottom}`,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "85%",
            justifyContent: "space-between",
            borderBottom: "1px solid #F1F1F1",
          }}
        >
          <div>
            <p className="mode-notification color1">{modeName}</p>
            <p className="mode-notification color2">{des}</p>
          </div>

          <div>
            <div style={{ display: "flex" }}>
              <Switch defaultChecked onChange={onChange} />
              <p className="mode">Push</p>
            </div>

            <div style={{ display: "flex" }}>
              <Switch defaultChecked onChange={onChange} />
              <p className="mode">Email</p>
            </div>

            <div style={{ display: "flex" }}>
              <Switch onChange={onChange} />
              <p className="mode">SMS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
