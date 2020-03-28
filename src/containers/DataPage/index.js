import React, {useEffect, useState} from "react";
import { Paper, Container } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import DataTable from "../../components/DataTable";
import DataMap from "../../components/DataMap";
import Filter from "../../components/Filter";
import SearchBar from "../../components/SearchBar";
import getData from "../../data/data";
import "./DataPage.scss";

import NavBar from "../../components/NavBar";
import { useAuth0 } from "../../react-auth0-spa";

const VIEW_TABLE = 'TABLE';
const VIEW_MAP = 'MAP';

const AUTH_LOADING_LABEL = 'Waiting for authentication/authorization';

const getEquipmentFilterValues = () => {
  const equipmentList = [
    { value: "3d-printer", label: "3D printer" },
    { value: "cnc", label: "CNC" }
  ];
  return equipmentList;
};

/**
 * Convert hierarchical domain based data to flat format usable in table view.
 * @param dbData
 */
const flattenModel = (domainData) => {
  const flat = [];

  for (const entity of domainData) {
    const site = entity.sites[0]; // TODO loop
    const equipment = site.equipments[0]; // TODO loop
    flat.push({
      name: entity.name,
      equipment: entity.entity_type,
      brand: equipment.brand,
      model: equipment.model,
      city: site.city,
      hasLocation: site.lat && site.lng,
      lat: site.lat,
      lng: site.lng,
    });
  }

  return flat
};

const requestData = () => {
  return getData().then(domainData => {
    return flattenModel(domainData);
  });
};

const DataPage = () => {
  const { authLoading, isAuthenicated } = useAuth0();
  const equipmentFilterValues = getEquipmentFilterValues();
  const [rowsData, setRowsData] = useState([]);
  const [view, setView] = useState(VIEW_TABLE);
  const [type, setEquipmentType] = useState(equipmentFilterValues[0]);

  useEffect(() => {
    // component mounted
    requestData().then(data => setRowsData(data));
  }, []);

  function handleSearch(ev) {
    console.log('search: ', ev.target.value);
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

  return (
    <Container maxWidth="lg" className="data-page" component={Paper}>
      <header>
        <NavBar />
        { authLoading && <div>{AUTH_LOADING_LABEL}</div> }
        <div>is authenticated: {isAuthenicated ? 'true' : 'false'}</div>
      </header>

      <div className="data-page__filters">
        <SearchBar onSearch={handleSearch} />
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
      <Button onClick={switchView} variant="contained" color="secondary">{view === VIEW_TABLE ? 'Show map' : 'Show table'}</Button>

      <div className="data-page__content">
        { view === VIEW_TABLE &&
          <div className="data-page__table">
            <DataTable rows={rowsData} />
          </div>
        }
        { view === VIEW_MAP &&
          <DataMap rows={rowsData} />
        }
      </div>
    </Container>
  );
};

export default DataPage;
