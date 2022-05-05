import { Spin } from 'antd'
import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
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

interface IProp {
  disabled: boolean;
}
export default function ProfileContent ({ disabled }: IProp) {
  const context = useContext(Context)
  const [showSpinLoading, setShowSpinLoading] = useState(false)

  const [user, setUser] = useState<any>({
    socialMedia: {},
    aboutMe: ''
  })

  const getUsers = async () => {
    const response = await getDoc(doc(db, 'users', 'wBHXu0KsEE3toBtW0RJ2'))

    setUser(response.data())
  }

  useEffect(() => {
    getUsers()
    setShowSpinLoading(true)
    setTimeout(() => {
      setShowSpinLoading(false)
    }, 300)
  }, [context.edit])

  const Icon: any = {
    Twitter,
    Facebook,
    Pinterest,
    Instagram,
    Vimeo,
    In
  }

  // Xử lý xóa attribute contenteditable gây ra lỗi không click link được.
  const dataFromTextEditor = user.aboutMe?.split('contenteditable').join('')

  const handleCheckEmptyLicense = () => {
    if (user.license) {
      return <p>{user.license}</p>
    } else {
      return <p className="empty-value-input">Please enter your license</p>
    }
  }

  const handleCheckEmptyExperience = () => {
    if (user.experience?.length !== 0) {
      return <p>{user.experience}</p>
    } else {
      return <p className="empty-value-input">Please enter your experience</p>
    }
  }

  const handleCheckEmptyLanguage = () => {
    if (user.languages?.length !== 0) {
      return <p>{user.languages + ','} </p>
    } else {
      return <p className="empty-value-input">Please enter your languages</p>
    }
  }

  const handleCheckEmptyLocation = () => {
    if (user.location?.length !== 0) {
      return <p>{user.location + ','}</p>
    } else {
      return <p className="empty-value-input">Please enter your location</p>
    }
  }

  const handleCheckEmptySocialMedia = () => {
    if (Object.keys(user.socialMedia).length === 0) {
      return (
        <p className="empty-value-input">Please enter your social media</p>
      )
    } else {
      return Object.keys(user.socialMedia).map((value, index) => (
        <div className="flex" key={index}>
          <img
            width={value === 'Facebook' ? '9px' : '15px'}
            src={Icon[value]}
            alt="icon"
          />

          <img
            style={
              value === 'Facebook'
                ? { marginLeft: '20px' }
                : { marginLeft: '14px' }
            }
            src={Line}
            alt="icon"
          />
          <p
            style={{
              marginLeft: '20px',
              marginTop: '10px'
            }}
          >
            {user.socialMedia[value]}
          </p>
        </div>
      ))
    }
  }

  const handleCheckEmptyAboutMe = () => {
    if (dataFromTextEditor) {
      return (
        <div
          className="text-editor-wrraper"
          dangerouslySetInnerHTML={{
            __html: dataFromTextEditor
          }}
        />
      )
    } else {
      return <p className="empty-value-input">Please introduce your self</p>
    }
  }

  const handleFormatPhoneNumber = () => {
    if (user.phoneNumber) {
      // Tạo khoảng trắng và chèn vào sau mỗi 3 số điện thoại.
      const result =
        user.phoneNumber.phone?.substring(0, 3) +
        ' ' +
        user.phoneNumber.phone?.substring(3, 6) +
        ' ' +
        user.phoneNumber.phone?.substring(6) +
        ' '

      return (
        <div className="verified-phone-number">
          {'+' + user.phoneNumber.code + ' ' + result + ' '}
          <img src={VerifiedPhoneNumberIcon} alt="icon" />
        </div>
      )
    } else {
      return <AddPhone user={user.phoneNumber} />
    }
  }

  return (
    <>
      {(() => {
        if (showSpinLoading) return <Spin />
        else {
          if (disabled) {
            return (
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}
                >
                  <div className="information">
                    <div className="flex">
                      <div className="items-name">
                        <p>Name:</p>
                        <p>Email:</p>
                        <p>Phone number:</p>
                        <p>License#:</p>
                        <p>Experience:</p>
                        <p>Languages:</p>
                        <p>Location:</p>

                        <div className="flex">
                          <div>
                            <p style={{ width: '140px' }}>Social media:</p>
                          </div>
                          <div className="social-media-container">
                            {handleCheckEmptySocialMedia()}
                          </div>
                        </div>
                      </div>
                      <div style={{ height: '272px', width: '400px' }}>
                        <p>
                          {user.name ? user.name : 'Please enter your name'}
                        </p>
                        <p>
                          {user.email ? user.email : 'Please enter your email'}
                        </p>

                        {handleFormatPhoneNumber()}
                        {handleCheckEmptyLicense()}
                        {handleCheckEmptyExperience()}
                        {handleCheckEmptyLanguage()}
                        {handleCheckEmptyLocation()}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={
                    dataFromTextEditor
                      ? 'about-me-container'
                      : 'about-me-container flex'
                  }
                >
                  <p className="items-name">About me:</p>

                  {handleCheckEmptyAboutMe()}
                </div>
              </div>
            )
          }
        }
      })()}
    </>
  )
}
