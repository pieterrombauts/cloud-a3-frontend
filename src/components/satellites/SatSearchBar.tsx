import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent';
import Autocomplete, { AutocompleteChangeReason, AutocompleteInputChangeReason } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Search from '@material-ui/icons/Search';
import axios from 'axios';
import { throttle, debounce } from 'throttle-debounce';
import { Favorite } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  icon: {
    color: "rgba(0,0,0,0.3)",
    marginRight: "5px"
  }
})

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
  favourite: boolean;
  noradID: string;
  name: string;
}

interface SatSearchBarProps {
  onSelect: (satellite: SatOptionType) => void;
}

const SatSearchBar: React.FC<SatSearchBarProps> = (props) => {
  const classes = useStyles();
  const [userFavs, setUserFavs] = useState<SatOptionType[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const [options, setOptions] = useState<SatOptionType[]>([]);

  useEffect(() => {
    setTimeout(() => {
      let userFavOptions: SatOptionType[] = [{name: "UME (ISS)", noradID: "8709"}, {name: "ISS (ZARYA)", noradID: "25544"}, {name: "ISS DEB", noradID: "44306"}, {name: "ISS DEB [COLKA COVER]", noradID: "47513"}].map((el) => ({
        favourite: true,
        name: el.name,
        noradID: el.noradID
      }))
      setUserFavs(userFavOptions)
      setOptions(userFavOptions);
    }, 1000)
    
  },[])

  const throttleFunc = throttle(2000, async (value: string) => {
    setLoading(true);
    axios.get(`https://cors-anywhere.herokuapp.com/https://celestrak.com/NORAD/elements/gp.php?NAME=${value}&FORMAT=JSON`).then((response) => {
      let options = response.data.map((result: SatResultType) => {
        let favStatus = userFavs.find((el) => el.noradID === result.NORAD_CAT_ID.toString()) !== undefined;
        console.log(favStatus);
        return {
          favourite: favStatus,
          noradID: result.NORAD_CAT_ID.toString(),
          name: result.OBJECT_NAME,
        }
      })
      setOptions(options);
      setLoading(false);
    });
  })

  const handleInputChange = async (event: React.ChangeEvent<{}>, value: string, reason: AutocompleteInputChangeReason) => {
    // Open the dropdown if three or more characters have been typed
    setInputText(value);
    if (reason === "input" && value.length >= 3) {
      throttleFunc(value);
    }
    if (reason === "clear" || value.length === 0) {
      setOptions(userFavs);
    }
  }

  const handleSelectChange = (event: React.ChangeEvent<{}>, value: SatOptionType | null, reason: AutocompleteChangeReason) => {
    if (value === null) {
      props.onSelect({favourite: false, name: "", noradID: ""});
    } else {
      props.onSelect(value);
    }
  }

  return (
    <Card>
      <CardContent>
        <Autocomplete
          id="satellite-search"
          inputValue={inputText}
          onInputChange={handleInputChange}
          onChange={handleSelectChange}
          options={options}
          getOptionLabel={(option) => option.name}
          getOptionSelected={(option, value) => option.noradID === value.noradID}
          loading={loading}
          renderOption={(option) => (
            <>
              {option.favourite && <Favorite fontSize="inherit" className={classes.icon}/>}
              {`${option.name} [${option.noradID}]`}
            </>
          )}
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