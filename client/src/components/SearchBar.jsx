import React from 'react';
import { connect } from 'react-redux';

import { useState } from 'react';
import { getDogsByName } from '../actions';

function SearchBar(props) {

    const [name, setName] = useState('');

    function handleChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.getDogsByName(name);
    }

    return(
        <div className="search-bar">
            <input type='text' placeholder='Buscar...'
            onChange={e => handleChange(e)}></input>
            <button type='submit' onClick={e => handleSubmit(e)}>Buscar</button>
        </div>
    )
};

export default connect(null, { getDogsByName })(SearchBar);