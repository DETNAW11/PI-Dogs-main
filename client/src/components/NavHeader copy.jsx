import React from 'react';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { GiDogHouse } from 'react-icons/gi';

function NavHeader(props) {
    return (
        <header id="header-home">
            <div className="container-header">
                <div className="logo-title">
                    <Link to="/home">
                        <div id="logo"><GiDogHouse /></div>
                    </Link>
                    <h4>Home</h4>
                    {
                        props.searchBar ? <SearchBar /> : <></>
                    } 
                </div>
            </div>
        </header>
    )
};

export default NavHeader;