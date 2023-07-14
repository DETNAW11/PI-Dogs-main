import React from 'react';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { getDogs, getTemperaments, filterByTemperament, filterBySource, orderBy } from '../actions';
import { Link } from 'react-router-dom';
import { BiAddToQueue } from 'react-icons/bi';

import Card from './Card';
import PageNav from './PageNav';
import NavHeader from './NavHeader';
import ErrorComponent from './ErrorComponent';
import ItemsQty from './ItemsQty';

function Home(props) {
    // const [order, setOrder] = useState('');
    const [selects, setSelects] = useState({
        filterByTemp: 'All',
        filterBySource: 'All',
        orderBy: 'orderNone'
    });
    
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(9);
    let indexLastDog = currentPage * dogsPerPage;
    const indexFirstDog = indexLastDog - dogsPerPage;
    if (indexLastDog > props.dogs.length) {
        indexLastDog = props.dogs.length;
    }
    const currentDogs = props.dogs.slice(indexFirstDog, indexLastDog);
    
    let qty;
    if ((props.dogs.length === 1) && (props.dogs[0].error)) {
        qty = 0;
    } else {
        qty = props.dogs.length;
    }

    const paginator = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        props.getDogs();
        props.getTemperaments();
    }, []);

    function handleTemperament(e) {
        setSelects({
            ...selects,
            filterByTemp: e.target.value,
            filterBySource: 'All',
            orderBy: 'orderNone'
        });
        setCurrentPage(1);
        props.filterByTemperament(e.target.value);
    };

    function handleSource(e) {
        setSelects({
            ...selects,
            filterByTemp: 'All',
            filterBySource: e.target.value,
            orderBy: 'orderNone'
        });
        setCurrentPage(1);
        props.filterBySource(e.target.value);
    };

    function handleOrder(e) {
        setSelects({
            ...selects,
            orderBy: e.target.value
        });
        if (e.target.value === 'orderNone') {
            props.getDogs();
            setSelects({
                ...selects,
                filterByTemp: 'All',
                filterBySource: 'All',
                orderBy: e.target.value
            });            
            setCurrentPage(1);
            // setOrder('');
        } else {
            props.orderBy(e.target.value);
            setCurrentPage(1);
            // setOrder(`Ordenado ${e.target.value}`);
        }
    };

    return (
        <>
        {/* <NavHeader searchBar={true} /> */}
        <NavHeader />
        <div className="container-cover">
            <div className="container-details">
                <div className="details">
                    <div>
                        Order by:&nbsp;&nbsp;
                        {/* https://reactjs.org/docs/forms.html#the-select-tag */}
                        <select name="orderBy" value={selects.orderBy} onChange={e => handleOrder(e)}>
                            <option value="orderNone"> -- none -- (as it apears in server)</option>
                            <option value="breedAsc">Breed's name - Ascending order (A to Z)</option>
                            <option value="breedDesc">Breed's name - Descending order (Z to A)</option>
                            <option value="weightAsc">Weight (Lightweight first)</option>
                            <option value="weightDesc">Weight (Heavy first)</option>
                        </select>
                    </div>
                    <div>
                        Filter by Temperament:&nbsp;&nbsp;
                        <select name="filterByTemperament" value={selects.filterByTemp} onChange={e => handleTemperament(e)}>
                            <option value="All">All items</option>
                        {
                            props.temperaments.map(i => (
                                <option value={i.name}>{i.name}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div>
                        Filter by Source:&nbsp;&nbsp;
                        <select name="filterBySource" value={selects.filterBySource} onChange={e => handleSource(e)}>
                            <option value="All">All items</option>
                            <option value="api">Only from the API</option>
                            <option value="db">Only those created locally</option>
                        </select>
                    </div>
                    <div>
                        <Link to="/create"><button>Create a new Breed <BiAddToQueue /></button></Link>
                    </div>
            </div>
            </div>
        </div>

        <ItemsQty qty={qty} currentPage={currentPage} from={indexFirstDog+1} to={indexLastDog} />
        <PageNav dogsPerPage={dogsPerPage} dogsQty={qty} paginator={paginator} currentPage={currentPage} />

        <div className="container-card">
            {
                qty !== 0 ? currentDogs?.map((elem, index) => {
                    return (
                        <div className="item-details">
                            <Link to={'/breed/' + elem.id}>
                                <Card
                                    name={elem.name}
                                    image={elem.image}
                                    temperament={elem.temperament} 
                                    key={elem.id}
                                    resultNumber={indexFirstDog+index}
                                    filterByTemp={selects.filterByTemp}
                                ></Card>
                            </Link>
                        </div>
                    );
                }) 
                : <ErrorComponent message="No results found :(" />
            }
        </div>

        <PageNav dogsPerPage={dogsPerPage} dogsQty={qty} paginator={paginator} currentPage={currentPage} />
        <ItemsQty qty={qty} currentPage={currentPage} from={indexFirstDog+1} to={indexLastDog} />

        </>
    );
};

function mapStateToProps(store) {
    return {
      dogs: store.dogs,
      temperaments: store.temperaments
    }
}

export default connect(mapStateToProps,{ getDogs, getTemperaments, filterByTemperament, filterBySource, orderBy })(Home);