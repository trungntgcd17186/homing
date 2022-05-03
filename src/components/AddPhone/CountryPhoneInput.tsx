import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import English from "world_countries_lists/data/countries/en/world.json";
import "antd/dist/antd.css";
import "antd-country-phone-input/dist/index.css";

// You could use any flag package you like.
// example: npm install flagpack
// import "flagpack/dist/flagpack.css";

const CountryPhoneInputAntd = () => {
  const getFlag = (short: string) => {
    const data = require(`world_countries_lists/data/flags/24x24/${short.toLowerCase()}.png`);
    // for dumi
    if (typeof data === "string") {
      return data;
    }
    // for CRA
    return data.default;
  };

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
                style={{ width: 18, height: 18, verticalAlign: "sub" }}
                src={getFlag(area.short)}
              />
            ),
          };
        }}
      >
        <div className="country-phone-input-container">
          <CountryPhoneInput
            style={{ marginTop: 0 }}
            defaultValue={{ short: "VN" }}
            type="number"
          />
        </div>
      </ConfigProvider>
    </>
  );
};

export default CountryPhoneInputAntd;
