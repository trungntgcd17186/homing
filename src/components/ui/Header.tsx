import { Input } from 'antd'
import React from 'react'
import Avatar from '../../assets/image/Avatar.svg'
import Dean from '../../assets/image/Dean.svg'
import DropdownIcon from '../../assets/image/DropdownIcon.svg'
import HomeIcon from '../../assets/image/HomeIcon.svg'
import Homing from '../../assets/image/Homing.svg'
import Line from '../../assets/image/Line.svg'
import MessageIcon from '../../assets/image/MessageIcon.svg'
import NotificationIcon from '../../assets/image/NotificationIcon.svg'
import path573 from '../../assets/image/Path5.svg'
import SearchIcon from '../../assets/image/Search.svg'
import TargetIcon from '../../assets/image/TargetIcon.svg'
import './index.css'

export default function Header () {
  return (
    <div className="header-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo-container">
          <img src={Homing} alt="bird" />
        </div>

        <div className="input-icons">
          <Input
            style={{
              height: '32px',
              width: '384px',
              borderRadius: '33px',
              marginLeft: '37px',
              background: '#ffffff',
              boxSizing: 'border-box',
              border: '1px solid #dde1e9',
              paddingLeft: '15px',
              paddingRight: '15px'
            }}
            suffix={<img src={SearchIcon} alt="icon" />}
            placeholder="Add dress, City, Zip"
          />
        </div>

        <img style={{ marginLeft: '16px' }} src={path573} alt="icon" />
        <img
          style={{ marginTop: '2px', marginLeft: '16px' }}
          src={TargetIcon}
          alt="icon"
        />
      </div>

      <div className="icon-container-right">
        <div className="title-container">
          <p className="title">Dashboard</p>
        </div>

        <img src={HomeIcon} alt="icon" />
        <img src={MessageIcon} alt="icon" />
        <img src={NotificationIcon} alt="icon" />
        <img src={Line} alt="icon" />
        <img src={Avatar} alt="icon" />
        <img src={Dean} alt="icon" />
        <img src={DropdownIcon} alt="icon" />
      </div>
    </div>
  )
}
