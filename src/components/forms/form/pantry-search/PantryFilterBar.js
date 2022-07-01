import React, {useState, useEffect, useContext} from 'react';
import spoonacularService from "../../../../services/spoonacular.service";
import axios from "axios";
import Loader from "../../../loader/Loader";
import {classNames} from "../../../../helpers/classNames";
import Button from "../../../buttons/button/Button";
import notifyToast from "../../../../utils/hooks/notifyToast";
import './PantryFilterBar.scss';
import {faClose} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PantryFilterContext} from "../../../../utils/providers/PantryFilterContextProvider";
import types from "../../../../config/types";
import time from "../../../../config/time";
import RecipeArchive from "../../../archive/RecipeArchive";
import {useLocation, useNavigate} from "react-router-dom";
import SelectGroup from "../../elements/group/SelectGroup";
import FieldLabel from "../../elements/label/FieldLabel";

function PantryFilterBar() {
    let navigate = useNavigate();
    let location = useLocation();
    const baseLink = '/search-pantry';
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
            removeSearchValue()
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
        removeSearchValue()
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
    },[api, runSearch])

    const handlePantryForm = (e) => {
        e.preventDefault();
        navigate({
            pathname: baseLink,
            search: '?type='+pantryFilter.type+'&maxReadyTime='+pantryFilter.time+'&includeIngredients='+pantryFilter.ingredients.join(',')
        })
    }


    return (
        <div className='pantry-filter-bar__wrapper'>
            <form onSubmit={handlePantryForm} className='pantry-filter-bar__form'>
                <div className='form-field__ingredients'>
                    <FieldLabel id='ingredients-input'>
                        Include ingredients
                    </FieldLabel>
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
                    <FieldLabel id='type-input'>
                        Dish type
                    </FieldLabel>
                    <SelectGroup>
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
                    </SelectGroup>
                </div>
                <div className='form-field__time'>
                    <FieldLabel id='time-input'>
                        Time limit
                    </FieldLabel>
                    <SelectGroup>
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
                    </SelectGroup>
                </div>
                <div className='form-field__submit'>
                    <Button customClass='btn-primary' type='submit'>Search recipes</Button>
                </div>
            </form>
            {location.search.length > 0 && (
                <RecipeArchive baseLink={baseLink} apiFor='search-pantry' />
            )}
        </div>
    );
}

export default PantryFilterBar;