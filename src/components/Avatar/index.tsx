import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
} from "antd/lib/upload/interface";
import React, { useContext } from "react";
import Avatar from "../../assets/image/Avatar.svg";
import { RouteKeyContext } from "../../Context/RouteContext";

export default function AvatarComponent() {
  const context = useContext(RouteKeyContext);
  const handleChange = (info: UploadChangeParam<UploadFile<unknown>>) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: string) =>
        context.setImg(imageUrl)
      );
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

  const handleDeleteImage = () => {
    context.setImg("");
  };

  return (
    <div className="avatar-container">
      <ImgCrop shape="round" grid>
        <Upload
          className="avatar-uploader"
          name="avatar"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          onChange={handleChange}
          onPreview={onPreview}
        >
          {context.img ? (
            <>
              <img
                src={context.img || Avatar}
                alt=""
                style={{ borderRadius: "50%", width: "120px" }}
                className="avatar"
              />
              <div
                className="flex"
                style={{ color: "#8551DB", marginTop: "9px" }}
              >
                <p>Change</p>
                <p style={{ marginLeft: "28px" }} onClick={handleDeleteImage}>
                  Delete
                </p>
              </div>
            </>
          ) : (
            <>
              <img
                src={context.img || Avatar}
                alt=""
                style={{ borderRadius: "50%", width: "120px" }}
                className="avatar"
              />
              <p
                style={{
                  width: "120px",
                  textAlign: "center",
                  color: "#8551DB",
                }}
              >
                Change
              </p>
            </>
          )}
        </Upload>
      </ImgCrop>
    </div>
  );
}
