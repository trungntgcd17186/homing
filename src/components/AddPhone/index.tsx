import { Modal } from 'antd'
import React, { useContext, useState } from 'react'
import AddPhoneNumber from '../../assets/image/AddPhoneNumber.svg'
import { Context } from '../../Context/GlobalContext'
import VerifyPhoneNumber from '../VerifyPhoneNumber'
import CountryPhoneInputAntd from './CountryPhoneInput'

interface IProps {
  user: {};
}
function AddPhone ({ user }: IProps) {
  const context = useContext(Context)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    if (context.getPhoneNumber.phone?.length === 10) {
      setIsModalVisible(false)
      context.setIsModalVerifyPhoneNumberVisible(true)
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      {user
        ? (
        <p className="change-verified-phone-number-btn" onClick={showModal}>
          Change
        </p>
          )
        : (
        <p className="add-phonenumber cursor" onClick={showModal}>
          Add your phone number
        </p>
          )}

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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '38px'
          }}
        >
          <img src={AddPhoneNumber} alt="icon" />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px'
          }}
        >
          <p className="add-phone-modal-content">
            Unlike other companies, Homing will not share your contact
            information with agents and service providers on the platform this
            makes your journey much more relaxed and at your pace! Here is our
            <span className="add-phone-modal-privacy-policy">
              {' ' + 'privacy policy'}
            </span>
          </p>
        </div>

        <div
          style={{
            marginTop: '28px'
          }}
        >
          <CountryPhoneInputAntd />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            paddingBottom: '47px'
          }}
        >
          <button
            className="add-phone-modal-submit-btn cursor"
            onClick={handleOk}
          >
            Submit
          </button>
        </div>
        <VerifyPhoneNumber />
      </Modal>
    </>
  )
}

export default AddPhone
