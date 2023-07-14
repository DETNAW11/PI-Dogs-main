import axios from 'axios';
import { 
    GET_DOGS, GET_DOGS_BY_NAME,
    GET_TEMPERAMENT,
    FILTER_BY_TEMPERAMENT, FILTER_BY_SOURCE,
    ORDER_BY,
    POST_BREED
 } from './names';

export function getDogs() {
    return async function(dispatch) {
        let dogs = await axios.get('http://localhost:3001/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: dogs.data
        });
    }
}

export function getDogsByName(name) {
    return async function(dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            console.log(response.data);
            return dispatch({
                type: GET_DOGS_BY_NAME,
                payload: response.data
            });
        } catch (err) {
            console.log(err);
        };
    };
};

export function filterByTemperament(payload) {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    };
};

export function filterBySource(payload) {
    return {
        type: FILTER_BY_SOURCE,
        payload
    };
};

export function orderBy(payload) {
    return {
        type: ORDER_BY,
        payload
    }
}

export function getTemperaments() {
    return async function(dispatch) {
        const response = await axios.get('http://localhost:3001/temperament')
        return dispatch({
            type: GET_TEMPERAMENT,
            payload: response.data
        });
    };
};

export function postBreed(payload) {
    return async function() {
        const response = await axios.post('http://localhost:3001/dog', payload)
        return {
            type: POST_BREED,
            response
        }
    };
};