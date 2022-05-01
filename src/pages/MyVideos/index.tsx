import { Input, Progress, Upload, Form, Button } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useRef, useState } from "react";
import BorderUpload from "../../assets/image/BorderUpload.svg";
import DeleteVideo from "../../assets/image/Close.svg";
import DropVideo from "../../assets/image/DropVideo.svg";
import PauseVideo from "../../assets/image/PauseVideo.svg";
import "./index.css";

export default function MyVideos() {
  const { Dragger } = Upload;
  const videoRef = useRef<any>(null);
  const [progress, setProgress] = useState(0);

  const videoLink = localStorage.getItem("videoUrl");
  const [videoUrl, setVideoUrl] = useState(videoLink);
  const [isPause, setIsPause] = useState(false);

  const [status, setStatus] = useState(false);
  const [fileName, setFileName] = useState("");

  const [addVideoByUrl, setAddVideoByUrl] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [listVideo, setListVideo] = useState<any[]>([]);
  const [reRender, setReRender] = useState(false);

  const formHandler = (e: any) => {
    const file = e.file.originFileObj;
    uploadFiles(file);
  };

  const handlePlayVideo = () => {
    setIsPause(!isPause);

    if (isPause) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const handleDeleteVideo = () => {
    localStorage.removeItem("videoUrl");
    setVideoUrl("");
    setStatus(false);
  };

  const uploadFiles = async (file: any) => {
    setFileName(file.name);
    const storage = getStorage();
    const storageRef = ref(storage, `files/${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // if (action === "pause") {
    //   uploadTask.pause();
    // }

    // if (action === "cancel") {
    //   console.log("cancel");

    //   uploadTask.cancel();
    // }

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (
          progress <
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ) {
          return;
        } else {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        }

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            setStatus(true);
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoUrl(downloadURL);
          localStorage.setItem("videoUrl", downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const handleCheckIsAddVideoByUrl = () => {
    setTimeout(() => {
      setAddVideoByUrl(!addVideoByUrl);
    }, 1);
  };

  const handleAddVideo = (values: any) => {
    setShowVideo(true);
    setListVideo([...listVideo, { ...values, id: uuidv4() }]);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleDeleteVideoByUrl = (id: number) => {
    console.log(id);
    let newArray = [];
    for (let i = 0; i < listVideo.length; i++) {
      if (listVideo[i].id === id) {
        newArray = listVideo.splice(i, 1);
      }
      return setListVideo(newArray);
    }
  };

  return (
    <div className="container">
      <h1 className="title-page">My videos</h1>
      <h3 className="intro-video">Intro Video:</h3>
      <p className="description-intro">
        Add your intro video to tells the buyer everything they need to know
        about your product/service and business
      </p>

      {videoUrl ? (
        <div className="video-container">
          <video
            ref={videoRef}
            src={videoUrl ? videoUrl : ""}
            width={370}
            autoPlay
            loop
          />
          <div className="video-name">
            <p>Christine Remeo Realty</p>
          </div>
          <img
            src={PauseVideo}
            className="play-video-btn"
            onClick={handlePlayVideo}
          />

          <img
            className="delete-video-btn"
            src={DeleteVideo}
            onClick={handleDeleteVideo}
          />
        </div>
      ) : (
        <div className="drop-video">
          <Dragger
            onChange={formHandler}
            onDrop={formHandler}
            showUploadList={false}
          >
            {status ? (
              <div className="drop-container">
                <img src={BorderUpload} alt="icon" />
                <Progress
                  className="progress"
                  type="dashboard"
                  width={50}
                  strokeColor="#8551DB"
                  gapPosition="top"
                  percent={Number(progress.toFixed())}
                  gapDegree={30}
                />
                <p className="upload-name">{fileName}</p>
              </div>
            ) : (
              <img src={DropVideo} alt="icon" width={446} height={132} />
            )}
          </Dragger>

          <img
            // onClick={(e) => uploadFiles("", "pause")}
            className="pause-upload-btn"
            src={PauseVideo}
            alt="icon"
          />

          <img
            // onClick={(e) => uploadFiles("", "cancel")}
            className="delete-upload-btn"
            src={DeleteVideo}
            alt="icon"
          />
        </div>
      )}

      <div className="upload-url-container flex-col">
        <label className="upload-url">Or upload from a URL</label>

        <Input style={{ marginTop: "12px", width: "446px", height: "32px" }} />
      </div>

      <div className="all-video-container">
        <h3 className="intro-video">Videos about locations I serve:</h3>
        <div className="mgt-16">
          <p className="type-video">Places I serve</p>

          <div className="flex upload-video-by-url">
            {addVideoByUrl ? (
              <Form
                name="basic"
                onFinish={handleAddVideo}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label=""
                  name="url"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    placeholder="https://12345678.com"
                    className="input-video-url"
                    style={{ width: "446px" }}
                  />
                </Form.Item>

                <button
                  onClick={handleCheckIsAddVideoByUrl}
                  className="add-video-btn"
                  type="submit"
                >
                  Save
                </button>
              </Form>
            ) : (
              <p className="video-content">
                You don't have any video for the educational content
              </p>
            )}
            <p
              onClick={handleCheckIsAddVideoByUrl}
              className="add-video-btn cursor"
            >
              Add video
            </p>
          </div>

          <div className="flex">
            {showVideo
              ? listVideo.map(
                  (item: { url: string; id: number }, index: number) => (
                    <div key={index} className="video-container">
                      <video
                        ref={videoRef}
                        src={item.url ? item.url : ""}
                        width={370}
                        autoPlay
                        loop
                      />
                      <div className="video-name">
                        <p>Christine Remeo Realty</p>
                      </div>
                      <img
                        src={PauseVideo}
                        className="play-video-btn"
                        onClick={handlePlayVideo}
                      />

                      <img
                        className="delete-video-btn"
                        src={DeleteVideo}
                        onClick={() => handleDeleteVideoByUrl(item.id)}
                      />
                    </div>
                  )
                )
              : ""}
          </div>
        </div>

        <div className="mgt-18">
          <p className="type-video">Educational content:</p>
          <div className="flex">
            <p className="video-content">
              You don't have any video for the educational content
            </p>
            <p className="add-video-btn cursor">Add video</p>
          </div>
        </div>

        <div className="mgt-18">
          <p className="type-video">About me or my busines:</p>
          <div className="flex">
            <p className="video-content">
              You don't have any video for the about me or my busines
            </p>
            <p className="add-video-btn cursor">Add video</p>
          </div>
        </div>

        <div className="mgt-18">
          <p className="type-video">Homing concierge videos:</p>
          <div className="flex">
            <p className="video-content">
              You don't have any video for the Homing concierge videos
            </p>
            <p className="add-video-btn cursor">Add video</p>
          </div>
        </div>
      </div>
    </div>
  );
}
