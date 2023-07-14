import { 
    GET_DOGS, GET_DOGS_BY_NAME,
    GET_TEMPERAMENT,
    FILTER_BY_TEMPERAMENT, FILTER_BY_SOURCE,
    ORDER_BY,
    POST_BREED
 } from '../actions/names';

const initialState = {
    dogs: [],
    dogsCopy: [],
    temperaments: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS: 
            return {
                ...state,
                dogs: action.payload,
                dogsCopy: action.payload
            }
        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_TEMPERAMENT:
            return {
                ...state,
                temperaments: action.payload
            }
        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.dogsCopy;
            const dogsFilterByTemperament = action.payload === 'All' ? 
                allDogs : allDogs.filter(elem => {
                    // because same breeds have the temperament set to undefined!
                    return elem.temperament ? elem.temperament.includes(action.payload) : false
                });
            return {
                ...state,
                dogs: dogsFilterByTemperament
            }
        case FILTER_BY_SOURCE: 
            let dogsFilterBySource;
            switch (action.payload) {
                case 'All': dogsFilterBySource = state.dogsCopy; break;
                case 'api': dogsFilterBySource = state.dogsCopy.filter(elem => (typeof elem.id) === 'number'); break;
                default:  dogsFilterBySource = state.dogsCopy.filter(elem => (typeof elem.id) !== 'number'); break;
            }
            return {
                ...state,
                dogs: dogsFilterBySource
            }
        case ORDER_BY:
            let dogsOrderBy;
            switch (action.payload) {
                case 'breedAsc': 
                    dogsOrderBy = state.dogs.sort(function(a, b) {
                        if(a.name > b.name) {
                            return 1;
                        }
                        if(b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case 'breedDesc':
                    dogsOrderBy = state.dogs.sort(function(a, b) {
                        if(a.name > b.name) {
                            return -1;
                        }
                        if(b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    });
                    break;
                case 'weightAsc':
                    var weightA, weightB;
                    dogsOrderBy = state.dogs.sort(function (a, b) {
                        weightA = a.weight.indexOf(' ') === -1 ? parseInt(a.weight) : parseInt(a.weight.slice(0, a.weight.indexOf(' ')));
                        weightB = b.weight.indexOf(' ') === -1 ? parseInt(b.weight) : parseInt(b.weight.slice(0, b.weight.indexOf(' ')));
                        if (weightA > weightB) {
                            return 1;
                        }
                        if(weightB > weightA) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case 'weightDesc':
                    var weightA, weightB;
                    dogsOrderBy = state.dogs.sort(function (a, b) {
                        weightA = a.weight.indexOf(' ') === -1 ? parseInt(a.weight) : parseInt(a.weight.slice(0, a.weight.indexOf(' ')));
                        weightB = b.weight.indexOf(' ') === -1 ? parseInt(b.weight) : parseInt(b.weight.slice(0, b.weight.indexOf(' ')));
                        if (weightA > weightB) {
                            return -1;
                        }
                        if(weightB > weightA) {
                            return 1;
                        }
                        return 0;
                    });
                    break;                    
            }
            return {
                ...state,
                dogs: dogsOrderBy
            }
        case POST_BREED:
            return {
                ...state
            }
        default: return state;
    }
}

export default reducer;