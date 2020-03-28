import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import SearchIcon from "@material-ui/icons/Search";
import { Input, InputAdornment } from '@material-ui/core';
import './AutoCompleteField.scss'

const AutocompleteField = ({ geoLocatedAddress, handleSelect }) => {
  const [address, setAdress] = useState('');

  useEffect(() => {
    if (geoLocatedAddress) {
      setAdress(geoLocatedAddress)
    }
  }, [geoLocatedAddress]);

  function handleChange(address) {
    setAdress(address)
  }

  return (
    <div className='field-container'>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />

            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                return (
                  <div {...getSuggestionItemProps(suggestion)}>
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

AutocompleteField.propTypes = {
  // geoLocatedAddress
  handleSelect: PropTypes.func.isRequired
};

export default AutocompleteField
