import React, {useEffect, useState} from "react";
import {Paper, Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import {useQuery} from "urql";

import DataTable from "../../components/DataTable";
import DataMap from "../../components/DataMap";
import Filter from "../../components/Filter";
import SearchBar from "../../components/SearchBar";
// import getData from "../../data/data"; //mock data source
import "./DataPage.scss";
import {API_KEY} from '../../config';
import {debounce} from 'debounce';

const VIEW_TABLE = 'TABLE';
const VIEW_MAP = 'MAP';

// limit 10 until we get pagination working
const displayQuery = `
  query {
    Entity(limit: 10) {
      name
      sites {
        equipments {
          brand
          model
          quantity
        }
        city
        lat
        lng
      }
      experience
    }
  }
`;

const getEquipmentFilterValues = () => {
  const equipmentList = [
    {value: "3d-printer", label: "3D printer"},
    {value: "cnc", label: "CNC"}
  ];
  return equipmentList;
};

/**
 * Convert hierarchical domain based data to flat format usable in table view.
 * @param dbData
 */
const flattenModel = (domainData) => {
  return domainData.Entity.map((entity) => {
    const firstSite = entity.sites[0];
    const firstEquipment = firstSite.equipments[0];
    return {
      name: entity.name,
      brand: firstEquipment.brand,
      model: firstEquipment.model,
      city: firstSite.city,
      hasLocation: firstSite.lat && firstSite.lng,
      lat: firstSite.lat,
      lng: firstSite.lng,
    };
  });
};

const DataPage = () => {
  const equipmentFilterValues = getEquipmentFilterValues();
  const [rowsData, setRowsData] = useState([]);
  const [view, setView] = useState(VIEW_TABLE);
  const [searchCoords, setSearchCoords] = useState();
  const [type, setEquipmentType] = useState(equipmentFilterValues[0]);
  const [searchResults, setSearchResults] = useState([]);
  const [{data: queryResult, fetching, error}] = useQuery({
    query: displayQuery,
  });
  const geolocationSupported = navigator && navigator.geolocation;

  useEffect(() => {
    // Fired after component mount
    if (queryResult) {
      const flattenedData = flattenModel(queryResult);
      setRowsData(flattenedData);
    }
  }, [queryResult]);

  function handleSearch(ev) {
    getLocation(ev.target.value);
  }

  function handleEquipmentFilterChange(ev) {
    const item = equipmentFilterValues.find(
      item => item.value === ev.target.value
    );
    console.log('equipment filter change: ', item);
    setEquipmentType(item);
  }

  function switchView() {
    setView(view === VIEW_TABLE ? VIEW_MAP : VIEW_TABLE);
  }

  const getLocation = debounce(makeRequest, 2000)

  function makeRequest(searchValue) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?component=${searchValue}=${API_KEY}`)
      .then((response) => console.log(response) || setSearchResults(response.results))
  }

  function useDeviceLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('position: ', position);
      setSearchCoords({
        lat: position.latitude,
        lng: position.longitude,
      });
    }, (error) => {
      console.error('could not get device location: ', error.message)
    });
  }

  return (
    <Container maxWidth="lg" className="data-page" component={Paper}>
      <div className="data-page__filters">
        <SearchBar onSearch={handleSearch} searchResults={searchResults}/>

        {geolocationSupported && (
          <IconButton color="secondary" aria-label="use device location" onClick={useDeviceLocation}>
            <GpsFixedIcon/>
          </IconButton>
        )}

        <Filter
          label={"equipment"}
          activeFilter={type}
          handler={handleEquipmentFilterChange}
          listOfValues={equipmentFilterValues}
        />
        <Filter
          label={"equipment"}
          activeFilter={type}
          handler={handleEquipmentFilterChange}
          listOfValues={equipmentFilterValues}
        />
        <Filter
          label={"equipment"}
          activeFilter={type}
          handler={handleEquipmentFilterChange}
          listOfValues={equipmentFilterValues}
        />
      </div>
      <Button onClick={switchView} variant="contained"
              color="secondary">{view === VIEW_TABLE ? 'Show map' : 'Show table'}</Button>

      <div className="data-page__content">
        {view === VIEW_TABLE &&
        <div className="data-page__table">
          {fetching && <div>Loading...</div>}
          {!fetching && <DataTable rows={rowsData}/>}
          {error && <div>{error}</div>}
        </div>
        }
        {view === VIEW_MAP &&
        <DataMap rows={rowsData}/>
        }
      </div>
    </Container>
  );
};

export default DataPage;
