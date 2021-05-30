import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { ShowDistricts } from "./districts";
import SearchField from 'react-search-field';
import { ShowVaccines } from './vaccine';
import './index.css';

const ShowStates = (props) => {
  const [states, setStates] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [state_id, setStateId] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [district_id, setDistrict_id] = useState([]);
  const [district_name, setDistrict_name] = useState('');
  const [district_dict, setDistrict_dict] = useState({});

  const [loadingDistricts, setLoadingDistricts] = useState(true);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    // console.log("testing")

    let url = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
    console.log(url);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if ('error' in data) {
          // console.log(data);
          alert(data['error']);
        } else {
          // console.log("states ====== ")
          // console.log(data["states"])
          setStates(data['states']);
        }
      });
  }, []);
  useEffect(() => {
    if (state_id != 0) {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };

      let url =
        'https://cdn-api.co-vin.in/api/v2/admin/location/districts/' + state_id;
      console.log(url);
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if ('error' in data) {
            console.log(data);
            alert(data['error']);
          } else {
            // console.log("districts ====== ")
            // console.log(data['districts'])
            setDistricts(data['districts']);
            setLoadingDistricts(false);
          }
        });
    }
  }, [state_id]);

  const DisplayDistricts = districts.map((district) => {
    district_dict[district.district_id] = district.district_name;
    return (
      <option key={district.district_id} value={district.district_id}>
        {district.district_name}
      </option>
    );
  });

  const toDisplay = filtered.map((state) => {
    return (
      <div key={state.state_id}>
        {state.state_id} {state.state_name}
      </div>
    );
  });
  const toDisplay2 = states.map((state) => {
    return (
      <option key={state.state_id} value={state.state_id}>
        {state.state_name}
      </option>
    );
  });
  const onChangedHandler = (value) => {
    setLoadingDistricts(true);
    setStateId(value);
  };

  const onChangedHandlerDistrict = (e) => {
    setDistrict_id(e.target.value);
    setDistrict_name(district_dict[e.target.value]);
  };
  return (
    <div className='col'>
      <select onChange={(event) => onChangedHandler(event.target.value)}>
        <option value={0}>Select state</option>
        {toDisplay2}
      </select>

      <div style={{ marginTop: 10 }}>
        {loadingDistricts ? (
          <div></div>
        ) : (
          <select onChange={(event) => onChangedHandlerDistrict(event)}>
            <option value={0}>Select district</option>
            {DisplayDistricts}
          </select>
        )}
      </div>
      <ShowVaccines district_id={district_id} district_name={district_name} />
    </div>
  );
};

export { ShowStates };
