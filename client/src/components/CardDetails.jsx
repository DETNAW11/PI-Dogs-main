import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import NavHeader from './NavHeader';
import imageDefault from '../images/13616080_0.png';
import ErrorComponent from './ErrorComponent';

function CardDetails(props) {
    const [details, setDetails] = useState({});
    const [error, setError] = useState(false);
    
    function getDetails(id) {
        axios.get('http://localhost:3001/dogs/' + props.id)
            .then(results => setDetails(results.data))
            .catch(e => { 
                console.log(e);
                setError(true); 
            });
    }

    useEffect(() => {
        getDetails(props.id);
    }, []);

    return (
        <>
        {/* <NavHeader searchBar={false} /> */}
        <NavHeader />
        {
            error ? <ErrorComponent message="No breed found with this ID" /> :
        
        <div className="cd-container">
            <div className="cd-card">
                <div className="cd-img-box"><img src={details.image ? details.image : imageDefault} alt="same image" /></div>
                <div className="cd-details">
                    <div className="cd-content">
                        <h3>{details.name}</h3>
                        <p>Temperaments: {details.temperament? details.temperament : "not specified"}</p>
                        <p>Height: {details.height} cm.</p>
                        <p>Weight: {details.weight} kg.</p>
                        <p>Life span (in years): {details.life_span}</p>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    )
};

export default CardDetails;