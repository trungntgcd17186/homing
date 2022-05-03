import { Input, Modal } from "antd";
import React, { useContext } from "react";
import { Context } from "../../Context/RouteContext";

function VerifyPhoneNumber() {
  const context = useContext(Context);

  const handleOk = () => {
    context.setIsModalVerifyPhoneNumberVisible(false);
  };

  const handleCancel = () => {
    context.setIsModalVerifyPhoneNumberVisible(false);
  };

  const handleFocus = (e: any) => {
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleOnKeyDown = (e: any) => {
    console.log(e);
    //Reset giá trị trước khi nhấn nút nếu nó đang được người dùng target để thay đổi giá trị cho input.
    if (e.target && e.keyCode >= 48 && e.keyCode <= 57) {
      e.target.value = "";
    }

    // Lắng nghe sự kiện người dùng nhấn nút backspace và delete để gán giá trị.
    if (e.keyCode === 8 || e.keyCode === 46) {
      e.target.value = "";
    }

    //Lắng nghe sự kiện người dùng nhấn nút backspace và delete để lùi input.
    if (e.keyCode === 8 || e.keyCode === 46) {
      e.target.previousSibling.focus();
    }
  };

  //Ngăn sự kiện nút backspace, nút phẩy, nút chấm, nút chấm hỏi/xuyệt gây lỗi.
  window.onkeydown = function (event: any) {
    if (
      (event.which === 8 && event.which !== 0 && event.which < 48) ||
      event.which > 57
    ) {
      event.preventDefault();
    }
  };

  return (
    <>
      <Modal
        visible={context.isModalVerifyPhoneNumberVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={480}
        className="add-phone-modal-style"
      >
        <h1 className="add-phone-modal-title">Verify your identity</h1>
        <p className="add-phone-modal-description">
          Please enter the Verification Code.
        </p>

        <Input
          onChange={handleFocus}
          maxLength={1}
          autoFocus={true}
          onKeyDown={handleOnKeyDown}
          style={{ width: "40px", height: "40px" }}
        />
        <Input
          onChange={handleFocus}
          maxLength={1}
          onKeyDown={handleOnKeyDown}
          style={{ width: "40px", height: "40px" }}
        />
        <Input
          onChange={handleFocus}
          maxLength={1}
          onKeyDown={handleOnKeyDown}
          style={{ width: "40px", height: "40px" }}
        />
        <Input
          onChange={handleFocus}
          maxLength={1}
          onKeyDown={handleOnKeyDown}
          style={{ width: "40px", height: "40px" }}
        />
        <Input
          onChange={handleFocus}
          maxLength={1}
          onKeyDown={handleOnKeyDown}
          style={{ width: "40px", height: "40px" }}
        />
        <Input
          onChange={handleFocus}
          maxLength={1}
          onKeyDown={handleOnKeyDown}
          style={{ width: "40px", height: "40px" }}
        />
        <p className="add-phone-modal-description">
          We have sent a verification code to your phone nummber.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "38px",
          }}
        ></div>

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
        ></div>

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

export default VerifyPhoneNumber;