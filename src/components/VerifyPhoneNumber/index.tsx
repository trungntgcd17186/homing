import { Modal } from "antd";
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
    if (context.isModalVerifyPhoneNumberVisible) {
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
    }
  };

  //Ngăn sự kiện nút backspace, nút phẩy, nút chấm, nút chấm hỏi/xuyệt gây lỗi.
  window.onkeydown = function (event: any) {
    if (context.isModalVerifyPhoneNumberVisible) {
      if (
        (event.which === 8 && event.which !== 0 && event.which < 48) ||
        event.which > 57
      ) {
        event.preventDefault();
      }
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
        <p className="add-phone-modal-description margin-top-24">
          Please enter the Verification Code.
        </p>

        <p className="add-phone-modal-description margin-top-12">
          We have sent a verification code to your phone nummber.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="input-code-verify-container">
            <input
              onChange={handleFocus}
              maxLength={1}
              autoFocus={true}
              onKeyDown={handleOnKeyDown}
              className="add-phone-modal-input"
            />
            <input
              onChange={handleFocus}
              maxLength={1}
              onKeyDown={handleOnKeyDown}
              className="add-phone-modal-input"
            />
            <input
              onChange={handleFocus}
              maxLength={1}
              onKeyDown={handleOnKeyDown}
              className="add-phone-modal-input"
            />
            <input
              onChange={handleFocus}
              maxLength={1}
              onKeyDown={handleOnKeyDown}
              className="add-phone-modal-input"
            />
            <input
              onChange={handleFocus}
              maxLength={1}
              onKeyDown={handleOnKeyDown}
              className="add-phone-modal-input"
            />
            <input
              onChange={handleFocus}
              maxLength={1}
              onKeyDown={handleOnKeyDown}
              className="add-phone-modal-input"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "64px",
            height: "36px",
          }}
        >
          <button className="add-phone-modal-submit-btn" onClick={handleOk}>
            Submit
          </button>
        </div>

        <p className="add-phone-modal-not-received-code">
          If you haven’t received your verify code
        </p>

        <p className="add-phone-modal-not-received-code color-purple-font-weight">
          Recend code
        </p>
      </Modal>
    </>
  );
}

export default VerifyPhoneNumber;
