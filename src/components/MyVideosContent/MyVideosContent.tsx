import { Carousel } from "antd";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Next from "../../assets/image/Next.svg";
import Prev from "../../assets/image/Prev.svg";
import Prev2 from "../../assets/image/Prev2.svg";
import { db } from "../firebaseConfig";
import DeleteVideo from "../../assets/image/Close.svg";
import PauseVideo from "../../assets/image/PauseVideo.svg";

interface IProps {
  showVideo: boolean;
  listVideo: any[];
}
export default function MyVideosContent({ showVideo, listVideo }: IProps) {
  const slider = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const [content, setContent] = useState<any[]>([]);
  const contentCollectionRef = collection(db, "content");
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const q = query(contentCollectionRef);

    const data: { docs: any[] } = await getDocs(q);

    const listUser = data.docs.map((doc: any) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setContent(listUser);
  };

  function onChange(currentSlide: number) {
    console.log(currentSlide);
  }

  const carouselSettings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    infinite: listVideo.length > 3 ? true : false,
  };

  const handleNextSlide = () => {
    slider.current.prev();
  };

  console.log(listVideo);

  return (
    <>
      {listVideo.length > 0 ? (
        <div className="my-videos-slider-container">
          {listVideo.length > 3 ? (
            <>
              <img
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  top: "20%",
                  left: "-1.5%",
                  zIndex: "999",
                }}
                src={Prev}
                onClick={handleNextSlide}
              />
              <img
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  zIndex: "999",
                  top: "20%",
                  right: "-1.53%",
                }}
                src={Next}
                onClick={() => slider.current.next()}
              />
            </>
          ) : (
            ""
          )}

          <Carousel
            {...carouselSettings}
            style={{ height: "201px", width: "847px" }}
            // afterChange={onChange}
            ref={slider}
          >
            {listVideo.map(
              (item: { url: string; id: number }, index: number) => (
                <div key={index} className="video-container">
                  <video
                    ref={videoRef}
                    src={item.url ? item.url : ""}
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
                    // onClick={handlePlayVideo}
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
      ) : (
        ""
      )}
    </>
  );
}
