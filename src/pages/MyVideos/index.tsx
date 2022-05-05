import { Form, Input, Progress, Upload } from 'antd'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import React, { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import BorderUpload from '../../assets/image/BorderUpload.svg'
import DeleteVideo from '../../assets/image/Close.svg'
import DropVideo from '../../assets/image/DropVideo.svg'
import PauseVideo from '../../assets/image/PauseVideo.svg'
import MyVideosContent from '../../components/MyVideosContent/MyVideosContent'
import './index.css'

export default function MyVideos () {
  const { Dragger } = Upload
  const videoRef = useRef<any>(null)
  const [progress, setProgress] = useState(0)
  const [progressFromFireBase, setProgressFromFireBase] = useState(0)

  const videoLink = localStorage.getItem('videoUrl')
  const [videoUrl, setVideoUrl] = useState(videoLink)
  const [isPause, setIsPause] = useState(false)

  const [status, setStatus] = useState(false)
  const [fileName, setFileName] = useState('')

  const [addVideoByUrl, setAddVideoByUrl] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [listVideo, setListVideo] = useState<any[]>([])

  const handlePlayVideo = () => {
    setIsPause(!isPause)

    if (isPause) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  const handleDeleteVideo = () => {
    localStorage.removeItem('videoUrl')
    setVideoUrl('')
    setStatus(false)
  }

  useEffect(() => {
    if (progress < progressFromFireBase) {
      setProgress(progressFromFireBase)
    }
  }, [progressFromFireBase])

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setProgress(0)
      }, 1000)
    }
  })

  const uploadFiles = async (file: any) => {
    setFileName(file.name)
    const storage = getStorage()
    const storageRef = ref(storage, `files/${file.name}`)

    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressData =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100

        setProgressFromFireBase(progressData)

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            setStatus(true)
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoUrl(downloadURL)
          localStorage.setItem('videoUrl', downloadURL)
          console.log('File available at', downloadURL)
        })
      }
    )
  }

  const formHandler = (e: any) => {
    const file = e.file.originFileObj
    uploadFiles(file)
  }

  const handleCheckIsAddVideoByUrl = () => {
    setTimeout(() => {
      setAddVideoByUrl(!addVideoByUrl)
    }, 1)
  }

  // get url video from localStorage
  const urlVideo = localStorage.getItem('videoContent')
  const videoUrlLocalStorage = JSON.parse(urlVideo || '[]')

  const handleAddVideo = (values: any) => {
    setShowVideo(true)
    localStorage.setItem(
      'videoContent',
      JSON.stringify([...videoUrlLocalStorage, { ...values, id: uuidv4() }])
    )
    setListVideo([...listVideo, { ...values, id: uuidv4() }])
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  // const handleDeleteVideoByUrl = (id: number) => {
  //   console.log(id)
  //   let newArray = []
  //   for (let i = 0; i < listVideo.length; i++) {
  //     if (listVideo[i].id === id) {
  //       newArray = listVideo.splice(i, 1)
  //     }
  //     return setListVideo(newArray)
  //   }
  // }

  return (
    <div className="container">
      <h1 className="title-page">My videos</h1>
      <h3 className="intro-video">Intro Video:</h3>
      <p className="description-intro">
        Add your intro video to tells the buyer everything they need to know
        about your product/service and business
      </p>

      {videoUrl
        ? <div className="video-demo-container">
          <video
            ref={videoRef}
            src={videoUrl || ''}
            width={370}
            style={{ borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}
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
        : <div className="drop-video">
          <Dragger
            onChange={formHandler}
            onDrop={formHandler}
            showUploadList={false}
          >
            {status
              ? <div className="drop-container">
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
              : <img src={DropVideo} alt="icon" width={446} height={132} />
                }
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
          }

      <div className="upload-url-container flex-col">
        <label className="upload-url">Or upload from a URL</label>

        <Input style={{ marginTop: '12px', width: '446px', height: '32px' }} />
      </div>

      <div className="all-video-container">
        <h3 className="intro-video">Videos about locations I serve:</h3>
        <div className="mgt-16">
          {videoUrlLocalStorage.length > 0
            ? (
            <div className="flex" style={{ height: '20px' }}>
              <p className="type-video">Places I serve</p>
              <p
                onClick={handleCheckIsAddVideoByUrl}
                className="add-video-btn cursor"
              >
                + Add new video
              </p>
            </div>
              )
            : (
            <p className="type-video">Places I serve</p>
              )}

          <div className="flex upload-video-by-url">
            {addVideoByUrl
              ? (
              <Form
                name="basic"
                onFinish={handleAddVideo}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Form.Item
                  label=""
                  name="url"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Input
                    placeholder="https://12345678.com"
                    className="input-video-url"
                    style={{ width: '446px' }}
                  />
                </Form.Item>

                <button
                  onClick={handleCheckIsAddVideoByUrl}
                  className="add-video-save-btn cursor"
                  type="submit"
                >
                  Save
                </button>
              </Form>
                )
              : (
              <>
                {videoUrlLocalStorage.length > 0
                  ? (
                      ''
                    )
                  : (
                  <>
                    <p className="video-content">
                      You {"don't"} have any video for the educational content
                    </p>
                    <p
                      onClick={handleCheckIsAddVideoByUrl}
                      className="add-video-btn cursor"
                    >
                      Add video
                    </p>
                  </>
                    )}
              </>
                )}
          </div>

          <div style={{ marginTop: '16px' }}>
            <MyVideosContent showVideo={showVideo} listVideo={listVideo} />
          </div>
        </div>

        <div className="mgt-18">
          <p className="type-video">Educational content:</p>
          <div className="flex">
            <p className="video-content">
              You {"don't"} have any video for the educational content
            </p>
            <p className="add-video-btn cursor">Add video</p>
          </div>
        </div>

        <div className="mgt-18">
          <p className="type-video">About me or my busines:</p>
          <div className="flex">
            <p className="video-content">
              You {"don't"} have any video for the about me or my busines
            </p>
            <p className="add-video-btn cursor">Add video</p>
          </div>
        </div>

        <div className="mgt-18">
          <p className="type-video">Homing concierge videos:</p>
          <div className="flex">
            <p className="video-content">
              You {"don't"} have any video for the Homing concierge videos
            </p>
            <p className="add-video-btn cursor">Add video</p>
          </div>
        </div>
      </div>
    </div>
  )
}
