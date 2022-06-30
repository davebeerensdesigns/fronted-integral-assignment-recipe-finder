import React, {useState, useEffect, useContext} from 'react';
import spoonacularService from "../../services/spoonacular.service";
import axios from "axios";
import Loader from "../loader/Loader";
import {classNames} from "../../helpers/classNames";
import Button from "../buttons/button/Button";
import notifyToast from "../../utils/hooks/notifyToast";
import './PantryFilterBar.scss';
import {faClose} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PantryFilterContext} from "../../utils/providers/PantryFilterContextProvider";
import types from "../../config/types";
import time from "../../config/time";
import '../forms/Forms.scss';

function PantryFilterBar() {
    const [pantryFilter, setPantryFilter] = useContext(PantryFilterContext)

    const [searchQuery, setSearchQuery] = useState('');
    const [runSearch, setRunSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [showSearch, setShowSearch] = useState(false)

    const updateSearchQuery = (e) => {
        setSearchQuery(e.target.value)
        if (e.target.value.length > 2) {
            setRunSearch(true)
        } else {
            setRunSearch(false)
            setSearchResults([])
        }
    }
    const number = 5;
    let api = spoonacularService.GetIngredientSearchAPI(searchQuery, number);

    const addIngredient = (name) => {
        if (!pantryFilter.ingredients.includes(name)) {
            const currentObject = pantryFilter;
            currentObject.ingredients.push(name);
            setPantryFilter(currentObject)
            setRunSearch(false)
            setSearchResults([])
            setSearchQuery('')
        }
    }

    const removeIngredient = (name) => {
        const currentObject = pantryFilter;
        for (let i = 0; i < currentObject.ingredients.length; i++) {

            if (currentObject.ingredients[i] === name) {

                currentObject.ingredients.splice(i, 1);
            }

        }
        setPantryFilter(currentObject);
        setRunSearch(false)
        setSearchResults([])
        setSearchQuery('')
    }

    const removeSearchValue = () => {
        setRunSearch(false)
        setSearchResults([])
        setSearchQuery('')
    }

    const handleTypeSelect = (event) => {
        setPantryFilter(arr => ({...arr, type:event.target.value}))
    };

    const handleTimeSelect = (event) => {
        setPantryFilter(arr => ({...arr, time:event.target.value}))
    };


    useEffect(() => {
        if (runSearch) {
            const SearchResults = async (api) => {
                setLoading(true)
                await axios.get(api).then(
                    (response) => {
                        setSearchResults(response.data)
                        setLoading(false)
                    }).catch(
                    (error) => {
                        notifyToast.notifyError(error.response.data.message);
                        setLoading(false)
                    })
            };
            const delayDebounceFn = setTimeout(() => {
                SearchResults(api)
            }, 1000)
            return () => clearTimeout(delayDebounceFn)

        }
    }, [api])

    const handlePantryForm = (e) => {
        e.preventDefault();
        console.log(pantryFilter)
    }

    return (
        <div className='pantry-filter-bar__wrapper'>
            <form onSubmit={handlePantryForm} className='pantry-filter-bar__form'>
                <div className='form-field__ingredients'>
                    <label htmlFor='ingredients-input'>Include ingredients</label>
                    <div className={classNames('ingredients-input__wrapper', showSearch && 'focus')}>
                        {pantryFilter.ingredients.map((item, index) => (<Button customClass='btn-dark'
                                                                                type='button'
                                                                                key={index}
                                                                                customClick={() => {
                                                                                    removeIngredient(item)
                                                                                }}>{item} <FontAwesomeIcon icon={faClose}/></Button>))}
                        <input id='ingredients-input' onFocus={() => {
                            setShowSearch(true)
                        }}
                               onBlur={() => {
                                   setShowSearch(false)
                               }}
                               className='form-field ingredients-input'
                               onChange={updateSearchQuery}
                               type='text'
                               placeholder='search ingredients'
                               value={searchQuery}/>
                        {searchQuery.length > 0 && (<Button customClass='btn-remove__ingredients'
                                                                         type='button'
                                                                         customClick={
                                                                             removeSearchValue
                                                                         }><FontAwesomeIcon icon={faClose}/></Button>)}
                    </div>
                    {runSearch && searchResults.length > 0 && (
                        <div className='ingredients-input__results'>
                            {loading && (
                                <Loader/>
                            )}
                            {!loading && <div className='ingredients-input__list'>
                                {searchResults.map(
                                    ({id, name}) =>
                                        <li className={classNames(pantryFilter.ingredients.indexOf(name) > -1 && 'disabled', 'ingredients-input__item')}
                                            key={id}>
                                            <div onClick={() => {
                                                pantryFilter.ingredients.indexOf(name) <= -1 && addIngredient(name)
                                            }}>
                                                {name}
                                            </div>
                                        </li>
                                )}
                            </div>}
                        </div>
                    )}
                </div>
                <div className='form-field__type'>
                    <label htmlFor='type-input'>Dish type</label>
                    <div className='form-select__group'>
                        <select id='type-input' className='form-select' value={pantryFilter.type}
                                onChange={handleTypeSelect}>
                            <option value=''>all types</option>
                            {
                                types.map((type, index) => {
                                    return (<option key={index}
                                                    value={type}>{type}</option>)
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='form-field__time'>
                    <label htmlFor='time-input'>Time limit</label>
                    <div className='form-select__group'>
                        <select id='time-input' className='form-select' value={pantryFilter.time}
                                onChange={handleTimeSelect}>
                            <option value=''>no limit</option>
                            {
                                time.map((time, index) => {
                                    return (<option key={index}
                                                    value={time}>{time} minutes</option>)
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className='form-field__submit'>
                    <button className='btn-primary' type='submit'>Search recipes</button>
                </div>
            </form>
        </div>
    );
}

export default PantryFilterBar;