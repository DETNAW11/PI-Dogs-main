import React from 'react';
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
                    <h4>The DogAPI Web App</h4>
                </div>
            </div>
        </header>
    )
};

export default NavHeader;