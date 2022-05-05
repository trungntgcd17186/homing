import { Modal, notification } from 'antd'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useContext } from 'react'
import { Context } from '../../Context/GlobalContext'
import { db } from '../firebaseConfig'

function VerifyPhoneNumber () {
  const context = useContext(Context)

  const handleCancel = () => {
    context.setIsModalVerifyPhoneNumberVisible(false)
  }

  const handleFocus = (e: any) => {
    if (e.target.nextSibling) {
      e.target.nextSibling.focus()
    }
  }

  const handleOnKeyDown = (e: any) => {
    if (context.isModalVerifyPhoneNumberVisible) {
      // Reset giá trị trước khi nhấn nút nếu nó đang được người dùng target để thay đổi giá trị cho input.
      if (e.target && e.keyCode >= 48 && e.keyCode <= 57) {
        e.target.value = ''
      }

      // Lắng nghe sự kiện người dùng nhấn nút backspace và delete để gán giá trị.
      if (e.keyCode === 8 || e.keyCode === 46) {
        e.target.value = ''
      }

      // Lắng nghe sự kiện người dùng nhấn nút backspace và delete để lùi input.
      if (e.keyCode === 8 || e.keyCode === 46) {
        e.target.previousSibling.focus()
      }
    }
  }

  // Ngăn sự kiện nút backspace, nút phẩy, nút chấm, nút chấm hỏi/xuyệt gây lỗi.
  window.onkeydown = function (event: any) {
    if (context.isModalVerifyPhoneNumberVisible) {
      if (
        (event.which === 8 && event.which !== 0 && event.which < 48) ||
        event.which > 57
      ) {
        event.preventDefault()
      }
    }
  }

  const successNotification = (title: string, content: string) => {
    notification.success({
      message: title,
      description: content
    })
  }

  const errorNotification = (title: string, content: string) => {
    notification.error({
      message: title,
      description: content
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)

    const codeInputFromUser = Object.values(formProps).join('')
    if (codeInputFromUser === '123456') {
      successNotification(
        'Verify Phone Number Notification',
        'You have successfully verified your phone number'
      )
      context.setIsModalVerifyPhoneNumberVisible(false)
      // Nếu nhập đúng mã xác thực thì đẩy số điện thoại lên firestore.
      const response = await getDoc(doc(db, 'users', 'wBHXu0KsEE3toBtW0RJ2'))

      const userDoc = doc(db, 'users', 'wBHXu0KsEE3toBtW0RJ2')

      await updateDoc(userDoc, {
        ...response.data(),
        phoneNumber: context.getPhoneNumber
      })
    } else {
      errorNotification(
        'Verify Phone Number Error',
        'The verification code is not correct, please try again!!!'
      )
    }
  }

  return (
    <>
      <Modal
        visible={context.isModalVerifyPhoneNumberVisible}
        onCancel={handleCancel}
        footer={null}
        width={480}
        className='add-phone-modal-style'
      >
        <h1 className='add-phone-modal-title'>Verify your identity</h1>
        <p className='add-phone-modal-description margin-top-24'>
          Please enter the Verification Code.
        </p>

        <p className='add-phone-modal-description margin-top-12'>
          We have sent a verification code to your phone nummber.
        </p>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className='input-code-verify-container'>
              <input
                name='input1'
                onChange={handleFocus}
                maxLength={1}
                autoFocus={true}
                onKeyDown={handleOnKeyDown}
                className='add-phone-modal-input'
              />
              <input
                name='input2'
                onChange={handleFocus}
                maxLength={1}
                onKeyDown={handleOnKeyDown}
                className='add-phone-modal-input'
              />
              <input
                name='input3'
                onChange={handleFocus}
                maxLength={1}
                onKeyDown={handleOnKeyDown}
                className='add-phone-modal-input'
              />
              <input
                name='input4'
                onChange={handleFocus}
                maxLength={1}
                onKeyDown={handleOnKeyDown}
                className='add-phone-modal-input'
              />
              <input
                name='input5'
                onChange={handleFocus}
                maxLength={1}
                onKeyDown={handleOnKeyDown}
                className='add-phone-modal-input'
              />
              <input
                name='input6'
                onChange={handleFocus}
                maxLength={1}
                onKeyDown={handleOnKeyDown}
                className='add-phone-modal-input'
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '64px',
              height: '36px'
            }}
          >
            <button type='submit' className='add-phone-modal-submit-btn'>
              Submit
            </button>
          </div>
        </form>

        <p className='add-phone-modal-not-received-code'>
          If you haven’t received your verify code
        </p>

        <p className='add-phone-modal-not-received-code color-purple-font-weight'>
          Recend code
        </p>
      </Modal>
    </>
  )
}

export default VerifyPhoneNumber
