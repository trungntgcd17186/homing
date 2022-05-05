import CountryPhoneInput, {
  ConfigProvider,
  CountryPhoneInputValue
} from 'antd-country-phone-input'
import 'antd-country-phone-input/dist/index.css'
import 'antd/dist/antd.css'
import React, { useContext } from 'react'
import English from 'world_countries_lists/data/countries/en/world.json'
import { Context } from '../../Context/GlobalContext'

const CountryPhoneInputAntd = () => {
  const context = useContext(Context)

  const getFlag = (short: string) => {
    const data = require(`world_countries_lists/data/flags/24x24/${short.toLowerCase()}.png`)
    // for dumi
    if (typeof data === 'string') {
      return data
    }
    // for CRA
    return data.default
  }

  const handleChangePhoneInput = (e: CountryPhoneInputValue) => {
    context.setGetPhoneNumber(e)
  }

  return (
    <>
      <ConfigProvider
        locale={English}
        areaMapper={(area) => {
          return {
            ...area,
            emoji: (
              <img
                alt="flag"
                style={{ width: 18, height: 18, verticalAlign: 'sub' }}
                src={getFlag(area.short)}
              />
            )
          }
        }}
      >
        <div className="country-phone-input-container">
          <CountryPhoneInput
            style={{ marginTop: 0 }}
            defaultValue={{ short: 'VN' }}
            type="number"
            onChange={handleChangePhoneInput}
          />

          {context.getPhoneNumber.phone?.length === 0 ||
          context.getPhoneNumber.phone === undefined
            ? (
            <p style={{ textAlign: 'center', color: 'red' }}>
              Please enter your phone number!!!
            </p>
              )
            : (
                ''
              )}

          {context.getPhoneNumber.phone?.length > 0 &&
          context.getPhoneNumber.phone?.length < 10
            ? (
            <p style={{ textAlign: 'center', color: 'red' }}>
              The phone number length must be 10.
            </p>
              )
            : (
                ''
              )}

          {context.getPhoneNumber.phone?.length > 10
            ? (
            <p style={{ textAlign: 'center', color: 'red' }}>
              The phone number length must be 10.
            </p>
              )
            : (
                ''
              )}
        </div>
      </ConfigProvider>
    </>
  )
}

export default CountryPhoneInputAntd
