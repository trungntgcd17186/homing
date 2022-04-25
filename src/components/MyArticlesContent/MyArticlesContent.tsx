import { Carousel } from "antd";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import Next from "../../assets/image/Next.svg";
import Prev from "../../assets/image/Prev.svg";
import { db } from "../firebaseConfig";
export default function MyArticlesContent() {
  const slider = useRef<any>(null);
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
    slidesToScroll: 3,
  };

  return (
    <>
      <img
        style={{ cursor: "pointer", width: "50px", height: "50px" }}
        src={Prev}
        onClick={() => slider.current.prev()}
      />
      <Carousel
        {...carouselSettings}
        style={{ height: "295px", width: "847px" }}
        afterChange={onChange}
        ref={slider}
        autoplay
      >
        {content.map((item, index) => (
          <div key={index} className="post-container">
            <img
              className="img-content"
              src={`https://unsplash.it/150/200?image=${Math.floor(
                Math.random() * 100
              )}`}
              alt="random picture"
            />
            <p className="modal-title-content">{item.title}</p>

            <div
              style={{ marginLeft: "12px", fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: item.content
                  .split(`class="editor-input" contenteditable="true"`)
                  .join(""),
              }}
            />
          </div>
        ))}
      </Carousel>
      <img
        style={{ cursor: "pointer", width: "50px", height: "50px" }}
        src={Next}
        onClick={() => slider.current.next()}
      />
    </>
  );
}