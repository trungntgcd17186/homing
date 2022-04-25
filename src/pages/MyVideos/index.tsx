import { Input } from "antd";
import React from "react";
import DropVideo from "../../assets/image/DropVideo.svg";
import "./index.css";

export default function MyVideos() {
  return (
    <div className="container">
      <h1 className="title-page">My videos</h1>
      <h3 className="intro-video">Intro Video:</h3>
      <p className="description-intro">
        Add your intro video to tells the buyer everything they need to know
        about your product/service and business
      </p>

      <div className="drop-video">
        <img src={DropVideo} />
      </div>

      <div className="upload-url-container flex-col">
        <label className="upload-url">Or upload from a URL</label>
        <Input style={{ marginTop: "12px", width: "500px", height: "32px" }} />
      </div>

      <div className="all-video-container">
        <h3 className="intro-video">Videos about locations I serve:</h3>
        <div className="mgt-16">
          <p className="type-video">Places I serve</p>
          <div className="flex">
            <p className="video-content">
              You don't have any video for the educational content
            </p>
            <p className="add-video-btn">Add video</p>
          </div>
        </div>

        <div className="mgt-18">
          <p className="type-video">Educational content:</p>
          <div className="flex">
            <p className="video-content">
              You don't have any video for the educational content
            </p>
            <p className="add-video-btn">Add video</p>
          </div>
        </div>

        <div className="mgt-18">
          <p className="type-video">About me or my busines:</p>
          <div className="flex">
            <p className="video-content">
              You don't have any video for the about me or my busines
            </p>
            <p className="add-video-btn">Add video</p>
          </div>
        </div>

        <div className="mgt-18">
          <p className="type-video">Homing concierge videos:</p>
          <div className="flex">
            <p className="video-content">
              You don't have any video for the Homing concierge videos
            </p>
            <p className="add-video-btn">Add video</p>
          </div>
        </div>
      </div>
    </div>
  );
}
