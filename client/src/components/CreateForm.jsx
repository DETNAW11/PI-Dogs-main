import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postBreed } from '../actions/index.js';
import NavHeader from './NavHeader';
import { MdDelete } from 'react-icons/md';

function CreateForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const temperaments = useSelector(state => state.temperaments);
    const [errors, setErrors] = useState({
        name: 'Required',
        minHeight: 'Required',
        maxHeight: 'Required',
        minWeight: 'Required',
        maxWeight: 'Required',
        life_span: 'Required',
    });
    const [input, setInput] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        life_span: '',
        temperament: []
    });

    function validate(e) {
        e.target.value? setErrors({
            ...errors,
            [e.target.name]: ""
        }) : setErrors({
            ...errors,
            [e.target.name]: "Required"
        });
    }

    function deleteTemperament(t) {
        let indexToDelete = input.temperament.indexOf(t);
        let deletedTemperament = input.temperament.splice(indexToDelete, 1);
        setInput({
            ...input,
            temperament: input.temperament.filter(elem => elem !== deletedTemperament)
        });
    }
    
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });
        validate(e);
    };

    function handleSelect(e) {
        //avoid adding a temperament that had already been added
        if (!input.temperament.includes(e.target.value)) {
            setInput({
                ...input,
                temperament: [
                    ...input.temperament,
                    e.target.value
                ]
            });
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        let dataPost = {
            name: input.name,
            height: input.minHeight + ' - ' + input.maxHeight,
            weight: input.minWeight + ' - ' + input.maxWeight,
            life_span: input.life_span + ' years',
            temperament: input.temperament
        };
        dispatch(postBreed(dataPost));
        alert("Custom breed created!");
        setInput({
            name: '',
            minHeight: '',
            maxHeight: '',
            minWeight: '',
            maxWeight: '',
            life_span: '',
            temperament: []
        });
        history.push('/home');
    };

    //ComponentDidUpdate()
    useEffect(() => {
        dispatch(getTemperaments());
    }, [input.temperament]);

    return(
        <>
            {/* <NavHeader searchBar={false} /> */}
            <NavHeader />
            <div className="cf-container">
                <div className="cf-contact-box">
                    <div className="cf-left"></div>
                    <div className="cf-right">
                        <h2>Create your custom Breed</h2>
                        <form onSubmit={e => {handleSubmit(e)}}>

                            <span className="errorInForm">{errors.name? errors.name : ''}</span>
                            <input type="text" className="cf-field" placeholder="Breed's name" 
                                value={input.name} name='name' onChange={e => handleChange(e)}/>

                            <span className="errorInForm">{errors.minHeight? errors.minHeight : ''}</span>
                            <input type="number" min="0" className="cf-field" placeholder="Min Height"
                                value={input.height} name='minHeight' onChange={e => handleChange(e)} />

                            <span className="errorInForm">{errors.maxHeight? errors.maxHeight : ''}</span>
                            <input type="number" min="0" className="cf-field" placeholder="Max Height"
                                value={input.height} name='maxHeight' onChange={e => handleChange(e)} />

                            <span className="errorInForm">{errors.minWeight? errors.minWeight : ''}</span>                                
                            <input type="number" min="0" className="cf-field" placeholder="Min Weight"
                                value={input.weight} name='minWeight' onChange={e => handleChange(e)} />

                            <span className="errorInForm">{errors.maxWeight? errors.maxWeight : ''}</span>
                            <input type="number" min="0" className="cf-field" placeholder="Max Weight"
                                value={input.weight} name='maxWeight' onChange={e => handleChange(e)} />
                            
                            <span className="errorInForm">{errors.life_span? errors.life_span : ''}</span>
                            <input type="number" min="0" className="cf-field" placeholder="Breed's life span"
                                value={input.life_span} name='life_span' onChange={e => handleChange(e)} />
                                
                            <label>Temperaments:</label>
                            <select className="cf-field" onChange={e => handleSelect(e)}>
                                <option value="none">None</option>
                                {
                                    temperaments.map(i => (
                                        <option value={i.name}>{i.name}</option>
                                    ))
                                }
                            </select>
                            <ul className="cf-temperament-list">
                                    {
                                        input.temperament.map(i => (
                                            <li>
                                                {i}
                                                <span className="icon" onClick={() => deleteTemperament(i)}><MdDelete /></span>
                                            </li>
                                        ))
                                    }
                            </ul>
                            {
                                ((errors.name === "") &&
                                    (errors.minHeight === "") &&
                                        (errors.maxHeight === "") &&
                                            (errors.minWeight === "") &&
                                                (errors.maxWeight === "") &&
                                                    (errors.life_span === "")) ? 
                                <button className="cf-btn" type="submit">Send</button> :
                                <button className="cf-btn-disabled" type="submit" disabled>Send</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateForm;