import { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function App() {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  console.log(countryid, stateid)
  return (
    <div  className="text-gray-900">
      <h6>Country</h6>
      <CountrySelect
        onChange={(e) => {
          console.log(e)
          setCountryid(e.id);
        }}
        placeHolder="Select Country"
       
      />
      <h6>State</h6>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          console.log(e)
          setstateid(e.id);
        }}
        placeHolder="Select State"
      />
      <h6>City</h6>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select City"
      />
      <h6>Language</h6>
      <LanguageSelect
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select Language"
      />
    </div>
  );
}

export default App
