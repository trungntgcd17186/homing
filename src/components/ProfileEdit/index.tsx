import { Button, Form, Input, Modal, Select } from 'antd'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import AllowClearIcon from '../../assets/image/AllowClearIcon.svg'
import Facebook from '../../assets/image/Facebook.svg'
import In from '../../assets/image/In.svg'
import Instagram from '../../assets/image/Instagram.svg'
import Line from '../../assets/image/LineSocialMedia.svg'
import Pinterest from '../../assets/image/Pinterest.svg'
import Twitter from '../../assets/image/Twitter.svg'
import VerifiedPhoneNumberIcon from '../../assets/image/VerifiedPhoneNumberIcon.svg'
import Vimeo from '../../assets/image/Vimeo.svg'
import { Context } from '../../Context/GlobalContext'
import AddPhone from '../AddPhone'
import { db } from '../firebaseConfig'
import Editor from './Editor'
import './style.css'
import { IData } from '../../type'

interface IProp {
  disabled: boolean;
  handleSaveProfile: () => void;
}

const { Option } = Select

export default function ProfileEdit ({ disabled, handleSaveProfile }: IProp) {
  const context = useContext(Context)

  const [user, setUser] = useState<any>({
    socialMedia: {},
    aboutMe: ''
  })

  const [message, setMessage] = useState('')
  const [socialObject, setSocialObject] = useState({})

  const [isModalVisible, setIsModalVisible] = useState(false)

  const getUsers = async () => {
    const response = await getDoc(doc(db, 'users', 'wBHXu0KsEE3toBtW0RJ2'))

    setUser(response.data())
    context.setDataUser(response.data())
  }

  useEffect(() => {
    getUsers()
  }, [context.edit])

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const callbackFunction = (childData: string) => {
    setMessage(childData)
  }

  const onFinish = async (values: IData) => {
    console.log('Success:', {
      ...values,
      aboutMe: message
    })
    // Add a new document in collection "cities"
    try {
      const userDoc = doc(db, 'users', 'wBHXu0KsEE3toBtW0RJ2')
      await updateDoc(userDoc, {
        ...values,
        aboutMe: message,
        socialMedia: socialObject
      })
      console.log('Document written')

      context.setEdit(!context.edit)
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const onFinishFailed = (errorInfo: ValidateErrorEntity<IData>) => {
    console.log('Failed:', errorInfo)
  }

  const handleChangeInput = (
    e: ChangeEvent<{ value: string }>,
    key: string
  ) => {
    setSocialObject({ ...socialObject, [key]: e.target.value })
  }

  const childrenLanguages = [
    <Option key={' Vietnamese'}>Vietnamese</Option>,
    <Option key={' French'}>French</Option>,
    <Option key={' Korean'}>Korean</Option>,
    <Option key={' Thai'}>Thai</Option>,
    <Option key={' German'}>German</Option>,
    <Option key={' Spanish'}>Spanish</Option>
  ]

  const childrenLocation = [
    <Option key={' California'}>California</Option>,
    <Option key={' Michigan'}>Michigan</Option>,
    <Option key={' Colorado'}>Colorado</Option>,
    <Option key={' Hawaii'}>Hawaii</Option>,
    <Option key={' Alaska'}>Alaska</Option>,
    <Option key={' Florida'}>Florida</Option>,
    <Option key={' Texas'}>Texas</Option>
  ]

  function handleChangeOption (value: any) {
    console.log(`selected ${value}`)
  }

  const handleFormatPhoneNumber = () => {
    const result =
      user.phoneNumber.phone?.substring(0, 3) +
      ' ' +
      user.phoneNumber.phone?.substring(3, 6) +
      ' ' +
      user.phoneNumber.phone?.substring(6) +
      ' '
    if (user.phoneNumber) {
      return (
        <>
          <div className="verified-phone-number flex">
            {'+' + user.phoneNumber.code + ' ' + result}
            <img
              src={VerifiedPhoneNumberIcon}
              width={24}
              alt="icon"
              style={{ marginLeft: '4px', marginTop: '-2px' }}
            />
          </div>
          <AddPhone user={user.phoneNumber} />
        </>
      )
    }
  }

  return (
    <>
      {(() => {
        if (disabled) {
          return (
            <div className="information flex">
              <Form
                name="basic"
                initialValues={{
                  name: user.name,
                  email: user.email,
                  license: user.license,
                  experience: user.experience,
                  languages: user.languages,
                  location: user.location,
                  socialMedia: user.socialMedia,
                  aboutMe: user.aboutMe
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  className="item"
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: 'Please input your name!' }
                  ]}
                >
                  <Input
                    className="form-input"
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  className="item"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' }
                  ]}
                >
                  <Input
                    className="form-input"
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                  />
                </Form.Item>

                <div className="item flex">
                  <p>Phone number:</p>

                  <div className="flex" style={{ width: '400px' }}>
                    {handleFormatPhoneNumber()}
                  </div>
                </div>

                <Form.Item
                  className="item"
                  style={{ marginTop: '10px' }}
                  label="License#"
                  name="license"
                >
                  <Input
                   type="number"
                    className="form-input"
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                  />
                </Form.Item>

                <Form.Item
                  className="item"
                  label="Experience"
                  name="experience"
                >
                  <Input
                    className="form-input"
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                    type="number"
                  />
                </Form.Item>

                <Form.Item className="item" label="Languages" name="languages">
                  <Select
                    mode="multiple"
                    allowClear
                    clearIcon={<img src={AllowClearIcon} />}
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChangeOption}
                  >
                    {childrenLanguages}
                  </Select>
                </Form.Item>

                <Form.Item className="item" label="Location" name="location">
                  <Select
                    mode="multiple"
                    allowClear
                    clearIcon={<img src={AllowClearIcon} />}
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    defaultValue={['a10', 'c12']}
                    onChange={handleChangeOption}
                  >
                    {childrenLocation}
                  </Select>
                </Form.Item>

                <Form.Item
                  className="item"
                  label="Social Media"
                  name="socialMedia"
                >
                  <Input
                    defaultValue={user.socialMedia.Twitter}
                    onChange={(e) => handleChangeInput(e, 'Twitter')}
                    suffix={
                      <div className="suffix-container">
                        <img width="16px" src={Twitter} alt="icon" />
                        <img
                          style={{ marginLeft: '14px', height: '20px' }}
                          src={Line}
                          alt="icon"
                        />
                      </div>
                    }
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                    className="form-social"
                  />

                  <Input
                    defaultValue={user.socialMedia.Pinterest}
                    onChange={(e) => handleChangeInput(e, 'Pinterest')}
                    suffix={
                      <div className="suffix-container">
                        <img width="13px" src={Pinterest} alt="icon" />
                        <img
                          style={{ marginLeft: '17px', height: '20px' }}
                          src={Line}
                          alt="icon"
                        />
                      </div>
                    }
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                    className="form-social margin12"
                  />

                  <Input
                    defaultValue={user.socialMedia.Facebook}
                    onChange={(e) => handleChangeInput(e, 'Facebook')}
                    suffix={
                      <div className="suffix-container">
                        <img width="9px" src={Facebook} alt="icon" />
                        <img
                          style={{ marginLeft: '21px', height: '20px' }}
                          src={Line}
                          alt="icon"
                        />
                      </div>
                    }
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                    className="form-social margin12"
                  />

                  <Input
                    defaultValue={user.socialMedia.Instagram}
                    onChange={(e) => handleChangeInput(e, 'Instagram')}
                    suffix={
                      <div className="suffix-container">
                        <img width="16px" src={Instagram} alt="icon" />
                        <img
                          style={{ marginLeft: '14px', height: '20px' }}
                          src={Line}
                          alt="icon"
                        />
                      </div>
                    }
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                    className="form-social margin12"
                  />

                  <Input
                    defaultValue={user.socialMedia.Vimeo}
                    onChange={(e) => handleChangeInput(e, 'Vimeo')}
                    suffix={
                      <div className="suffix-container">
                        <img width="16px" src={Vimeo} alt="icon" />
                        <img
                          style={{ marginLeft: '14px', height: '20px' }}
                          src={Line}
                          alt="icon"
                        />
                      </div>
                    }
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                    className="form-social margin12"
                  />

                  <Input
                    allowClear={{
                      clearIcon: <img src={AllowClearIcon} />
                    }}
                    defaultValue={user.socialMedia.In}
                    onChange={(e) => handleChangeInput(e, 'In')}
                    suffix={
                      <div className="suffix-container">
                        <img width="16px" src={In} alt="icon" />
                        <img
                          style={{ marginLeft: '14px', height: '20px' }}
                          src={Line}
                          alt="icon"
                        />
                      </div>
                    }
                    className="form-social margin12"
                  />
                </Form.Item>

                <Form.Item label="" name="aboutMe" className="form-about-me">
                  <p className="items-name">About me:</p>
                  <Editor parentCallback={callbackFunction} />
                </Form.Item>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: '40px'
                  }}
                >
                  <Button
                    style={{
                      width: '140px',
                      height: '36px',
                      background: '#FFFFFF',
                      border: '1px solid #8551DB',
                      boxSizing: 'border-box',
                      borderRadius: '29px',
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#8551DB'
                    }}
                    onClick={handleSaveProfile}
                  >
                    Cancel
                  </Button>

                  <button
                    style={{
                      width: '140px',
                      height: '36px',
                      background: '#8551DB',
                      border: '1px solid #8551DB',
                      boxSizing: 'border-box',
                      borderRadius: '29px',
                      fontFamily: 'Poppins',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '14px',
                      lineHeight: '20px',
                      color: '#FFFFFF',
                      marginLeft: '28px'
                    }}
                    className="cursor"
                    type="submit"
                    onClick={handleSaveProfile}
                  >
                    Save
                  </button>
                </div>
              </Form>
              <Modal
                title="Add Phone Number"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Fill Your Phone Number</p>
                <Input />
              </Modal>
            </div>
          )
        } else {
          return <></>
        }
      })()}
    </>
  )
}
