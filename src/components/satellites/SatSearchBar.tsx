import React, { useState } from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Autocomplete, { AutocompleteInputChangeReason } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Search from '@material-ui/icons/Search';
import axios from 'axios';
import { throttle, debounce } from 'throttle-debounce';

interface SatResultType {
  OBJECT_NAME: string,
  OBJECT_ID: string,
  EPOCH: string,
  MEAN_MOTION: number,
  ECCENTRICITY: number,
  INCLINATION: number,
  RA_OF_ASC_NODE: number,
  ARG_OF_PERICENTER: number,
  MEAN_ANOMALY: number,
  EPHEMERIS_TYPE: number,
  CLASSIFICATION_TYPE: string,
  NORAD_CAT_ID: number,
  ELEMENT_SET_NO: number,
  REV_AT_EPOCH: number,
  BSTAR: number,
  MEAN_MOTION_DOT: number,
  MEAN_MOTION_DDOT: number
}

interface SatOptionType {
  noradID: string;
  name: string;
}

interface SatSearchBarProps {
  onSelect: (value: string) => void;
}

const SatSearchBar: React.FC<SatSearchBarProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [options, setOptions] = useState<SatOptionType[]>([]);
  const loading = open && options.length === 0;

  const throttleFunc = debounce(2000, async (value: string) => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://celestrak.com/NORAD/elements/gp.php?NAME=${value}&FORMAT=JSON`).then((response) => {
      let options = response.data.map((result: SatResultType) => ({
        noradID: result.NORAD_CAT_ID.toString(),
        name: result.OBJECT_NAME,
      }))
      setOptions(options);
    });
  })

  const handleInputChange = async (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
    // Open the dropdown if three or more characters have been typed
    if (reason === "input" && value.length >= 3) {
      setOpen(true);
      throttleFunc(value);
    }
    if (reason === "reset") {
      let tokens = value.split("(");
      let id = tokens[tokens.length - 1];
      props.onSelect(id.substring(0, id.length-1));
    }
    if (reason === "clear") {
      setOptions([]);
    }
  }

  return (
    <Card>
      <CardContent>
        <Autocomplete
          id="satellite-search"
          open={open}
          onClose={() => {setOpen(false);}}
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={(option) => `${option.name} (${option.noradID})`}
          getOptionSelected={(option, value) => option.noradID === value.noradID}
          loading={loading}
          popupIcon={<Search />}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for a satellite..."
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                )
              }}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}

export default SatSearchBar;