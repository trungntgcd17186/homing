import { Carousel } from 'antd'
import React, { useRef, useState } from 'react'
import DeleteVideo from '../../assets/image/Close.svg'
import Next from '../../assets/image/Next.svg'
import PauseVideo from '../../assets/image/PauseVideo.svg'
import Prev from '../../assets/image/Prev.svg'

interface IProps {
  showVideo: boolean;
  listVideo: any[];
}
export default function MyVideosContent ({ showVideo, listVideo }: IProps) {
  const slider = useRef<any>(null)
  const videoRef = useRef<any>(null)
  const [isPause, setIsPause] = useState(false)

  // get url video from localStorage
  const urlVideo = localStorage.getItem('videoContent')
  const videoUrlLocalStorage = JSON.parse(urlVideo || '[]')

  const carouselSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    infinite: videoUrlLocalStorage.length > 3
  }

  const handleNextSlide = () => {
    slider.current.prev()
  }

  const handlePlayVideo = () => {
    setIsPause(!isPause)

    if (isPause) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  return (
    <>
      {videoUrlLocalStorage.length > 0
        ? <div className="my-videos-slider-container">
          {videoUrlLocalStorage.length > 3
            ? <>
                <img
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    top: '20%',
                    left: '-1.5%',
                    zIndex: '999'
                  }}
                  src={Prev}
                  onClick={handleNextSlide}
                />
                <img
                  style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    zIndex: '999',
                    top: '20%',
                    right: '-1.53%'
                  }}
                  src={Next}
                  onClick={() => slider.current.next()}
                />
            </>
            : ''
              }

          <Carousel
            {...carouselSettings}
            style={{ height: '201px', width: '847px' }}
            // afterChange={onChange}
            ref={slider}
          >
            {videoUrlLocalStorage?.map(
              (item: { url: string; id: number }, index: number) => (
                <div key={index} className="video-container">
                  <video
                    ref={videoRef}
                    src={item.url ? item.url : ''}
                    width={268}
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
                    // onClick={() => handleDeleteVideoByUrl(item.id)}
                  />
                </div>
              )
            )}
          </Carousel>
        </div>
        : ''
      }
    </>
  )
}
