/* eslint-disable no-use-before-define */
import React, { useState, useRef, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import searchStyle from './search.module.scss';
import { httpGet } from './../../utils/http/http';
import { withRouter } from 'react-router-dom';

const SearchBox = (props) => {

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const searchRef = useRef();

  useEffect(() => {
    if (searchRef.current.value.trim() !== '') {
      const timer = setTimeout(() => {
        if (searchValue === searchRef.current.value) {
          httpGet(`/giftCards?q=${searchValue}&_limit=5`)
            .then(response => setSearchResult(response.data))
        }
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchValue, searchRef]);

  const searchClickHandler = (event) => {
    event.preventDefault();
    props.history.push(`/searchresults?search=${searchRef.current.value}`);
  }

  return (
    <form onSubmit={searchClickHandler}>
      <Autocomplete
        id="combo-box-demo"
        options={searchResult}
        getOptionLabel={option => option.name}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField inputRef={searchRef} onChange={event => setSearchValue(event.target.value)} className={searchStyle.searchInput} {...params} label="Search" variant="outlined" fullWidth />
        )}
      />
    </form>
  );
}

export default withRouter(SearchBox);