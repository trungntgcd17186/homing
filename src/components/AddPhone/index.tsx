import { Modal } from "antd";
import React, { useState } from "react";
import AddPhoneNumber from "../../assets/image/AddPhoneNumber.svg";
import CountryPhoneInputAntd from "./CountryPhoneInput";

function AddPhone() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <p className="add-phonenumber cursor" onClick={showModal}>
        Add your phone number
      </p>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={480}
        className="add-phone-modal-style"
      >
        <h1 className="add-phone-modal-title">Verify your phone number</h1>
        <p className="add-phone-modal-description">
          To use this feature you must verify your phone number
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "38px",
          }}
        >
          <img src={AddPhoneNumber} alt="icon" />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <p className="add-phone-modal-content">
            Unlike other companies, Homing will not share your contact
            information with agents and service providers on the platform this
            makes your journey much more relaxed and at your pace! Here is our
            <span className="add-phone-modal-privacy-policy">
              {" " + "privacy policy"}
            </span>
          </p>
        </div>

        <div
          style={{
            marginTop: "28px",
          }}
        >
          <CountryPhoneInputAntd />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            paddingBottom: "47px",
          }}
        >
          <button className="add-phone-modal-submit-btn" onClick={handleOk}>
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
}

export default AddPhone;
