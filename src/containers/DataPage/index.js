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
import * as queries from "../../data/queries";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const VIEW_TABLE = 'TABLE';
const VIEW_MAP = 'MAP';

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
  const [searchCoords, setSearchCoords] = useState({lat: 0, lng: 0});
  const [searchDistance, setSearchDistance] = useState(1000 * 1000 * 1000); // bigger than earth circumference, in kilometers
  const [type, setEquipmentType] = useState(equipmentFilterValues[0]);
  const [searchResults, setSearchResults] = useState([]);

  // TODO: Vary query depending on inputs
  // const [{data: queryResult, fetching, error}] = useQuery({
  //   query: queries.displayQuery,
  //   variables: {
  //     limit: 10
  //   }
  // });
  const [{data: queryResult, fetching, error}] = useQuery({
    query: queries.displaySearchQuery,
    variables: {
      limit: 100,
      distance: searchDistance, // in meters
      point: {
        type: "Point",
        coordinates: [searchCoords.lng, searchCoords.lat]
      }
    }
  });

  useEffect(() => {
    if (queryResult) {
      const flattenedData = flattenModel(queryResult);
      setRowsData(flattenedData);
    }
  }, [queryResult]);

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

  //TODO: I suggest moving autocomplete logic to SearchBar itself, only passing searchQuery to parent -Ruurd
  const getLocation = debounce(makeRequest, 2000);
  function handleSearch(ev) {
    getLocation(ev.target.value);
  }
  function makeRequest(searchValue) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?component=${searchValue}=${API_KEY}`)
      .then((response) => console.log(response) || setSearchResults(response.results))
  }

  return (
    <Container maxWidth="lg" className="data-page" component={Paper}>
      <div className="data-page__filters">

        <SearchBar
          onSearch={handleSearch}
          searchResults={searchResults}
          coords={searchCoords}
          setCoords={setSearchCoords}
          distance={searchDistance}
          setDistance={setSearchDistance}
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
        <Filter
          label={"equipment"}
          activeFilter={type}
          handler={handleEquipmentFilterChange}
          listOfValues={equipmentFilterValues}
        />
      </div>
      <Button onClick={switchView} variant="contained"
              color="secondary">{view === VIEW_TABLE ? 'Show map' : 'Show table'}</Button>

      <div>
        <span>coordinate: </span><span>lat: {searchCoords.lat}, lng: {searchCoords.lng}</span>
      </div>

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
