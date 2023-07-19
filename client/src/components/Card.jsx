import React from 'react';
import imageDefault from '../images/13616080_0.png';
import details from './CardDetails';

function Card({ image, name, temperament, weight, resultNumber, filterByTemp }) {
    if (filterByTemp !== 'All') {
        var temperament1 = temperament.slice(0, temperament.indexOf(filterByTemp));
        var temperament2 = temperament.slice(temperament.indexOf(filterByTemp) + filterByTemp.length, temperament.lenght);
    }

    console.log('Weight prop:', details.weight);

    return (
        <div className="card">
            <div className="content">
                <p className="card-result-number">Result # {resultNumber + 1}</p>
                <img src={image ? image : imageDefault} alt="no hay imagen" width='200px' height='250px' />
                <h3>{name}</h3>
                {
                    filterByTemp === 'All' ?
                        <p>{temperament}</p> :
                        <p>{temperament1} <span className="filterByTempClass">{filterByTemp}</span> {temperament2}</p>
                }
                <p>Weight: {details.weight} kg.</p>
                {/* {weight && <p className='pesso'>Weight: {weight} kg.</p>} */}
            </div>
        </div>
    );
};

export default Card;