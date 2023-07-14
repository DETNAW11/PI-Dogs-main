import React from 'react';
import imageDefault from '../images/13616080_0.png';

function Card({image, name, temperament, resultNumber, filterByTemp}) {
    if (filterByTemp !== 'All') {
        var temperament1 = temperament.slice(0, temperament.indexOf(filterByTemp));
        var temperament2 = temperament.slice(temperament.indexOf(filterByTemp)+filterByTemp.length, temperament.lenght);
    }
    return(
            <div className="card">
                <div className="content">
                    <p className="card-result-number">Result # {resultNumber+1}</p>
                    <img src={image? image : imageDefault} alt="no hay imagen" width='200px' height='250px' />
                    <h3>{name}</h3>
                    {
                        filterByTemp === 'All' ? 
                        <p>{temperament}</p> : 
                        <p>{temperament1} <span className="filterByTempClass">{filterByTemp}</span> {temperament2}</p>
                    }
                </div>
            </div>
    );
};

export default Card;