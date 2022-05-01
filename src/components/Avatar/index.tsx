import { Upload, Spin } from "antd";

import ImgCrop from "antd-img-crop";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from "antd/lib/upload/interface";
import { doc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import Avatar from "../../assets/image/Avatar.svg";
import { RouteKeyContext } from "../../Context/RouteContext";
import { db } from "../firebaseConfig";

interface IProps {
  hideComponentEdit: boolean;
}

export default function AvatarComponent({ hideComponentEdit }: IProps) {
  const context = useContext(RouteKeyContext);
  const [showSpinLoading, setShowSpinLoading] = useState(false);

  useEffect(() => {
    setShowSpinLoading(true);
    setTimeout(() => {
      setShowSpinLoading(false);
    }, 300);
  }, [context.edit]);

  const handleChange = (info: UploadChangeParam<UploadFile<unknown>>) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.

      getBase64(info.file.originFileObj, async (imageUrl: string) => {
        const userDoc = doc(db, "users", "1RljEtbnk0BcXx2oq3ws");
        await updateDoc(userDoc, {
          ...context.dataUser,
          avatar: imageUrl,
        });
        context.setEdit(!context.edit);
      });
    }
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        console.log(typeof reader);
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;

    const imgWindow: Window | null = window.open(src);
    if (imgWindow) imgWindow.document.write(image.outerHTML);
  };

  const getBase64 = (img: RcFile | Blob | undefined, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    if (img !== undefined) {
      reader.readAsDataURL(img);
    }
  };

  const handleDeleteImage = (e: any) => {
    context.setImg("");
    e.preventDefault();
  };

  return (
    <>
      {(() => {
        if (showSpinLoading) return;
        else {
          return (
            <div
              className={
                hideComponentEdit
                  ? "avatar-container margin-avatar"
                  : "avatar-container"
              }
            >
              <ImgCrop shape="round" grid>
                <Upload
                  className="avatar-uploader"
                  name="avatar"
                  showUploadList={false}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  onChange={handleChange}
                  onPreview={onPreview}
                >
                  {context.dataUser.avatar ? (
                    <>
                      <img
                        src={context.dataUser.avatar || Avatar}
                        alt=""
                        style={{ borderRadius: "50%", width: "120px" }}
                        className="avatar"
                      />
                      <div
                        className="flex"
                        style={{ color: "#8551DB", marginTop: "9px" }}
                      >
                        <p className="cursor">Change</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={context.dataUser.avatar || Avatar}
                        alt=""
                        style={{ borderRadius: "50%", width: "120px" }}
                        className="avatar"
                      />
                      <p
                        style={{
                          marginTop: "9px",
                          width: "120px",
                          textAlign: "center",
                          color: "#8551DB",
                        }}
                        className="cursor"
                      >
                        Change
                      </p>
                    </>
                  )}
                </Upload>
              </ImgCrop>
              <p
                style={{
                  transform: "translate(80px, -22.5px)",
                  color: "#8551DB",
                }}
                onClick={handleDeleteImage}
                className="cursor"
              >
                {context.dataUser.avatar ? "Delete" : ""}
              </p>
            </div>
          );
        }
      })()}
    </>
  );
}
