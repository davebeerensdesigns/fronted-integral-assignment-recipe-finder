import React, {useEffect, useState} from 'react';
import axios from "axios";
import spoonacularService from "../../../../services/spoonacular.service";
import './AutocompleteSearch.scss';
import Loader from "../../../loader/Loader";
import {Link} from "react-router-dom";
import notifyToast from "../../../../utils/hooks/notifyToast";

function AutocompleteSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [runSearch, setRunSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const updateSearchQuery = (e) => {
        setSearchQuery(e.target.value)
        if (e.target.value.length > 2) {
            setRunSearch(true)
        } else {
            setRunSearch(false)
            setSearchResults([])
        }
    }
    const clearSearchQuery = (e) => {
        e.target.value = '';
        setSearchQuery('')
        setRunSearch(false)
        setSearchResults([])
    }
    const number = 5;
    let api = spoonacularService.GetAutocompleteSearchAPI(searchQuery, number);

    const SearchData = <nav className='searchbar__list'>
        {searchResults.length > 0 ?
            searchResults.map(({id, title, image}) => <Link onClick={clearSearchQuery}
                                                            to={'/search/recipe/' + id}
                                                            className='searchbar__item'
                                                            key={id}>
                    <figure className='searchbar__thumbnail'>
                        <img width='312'
                             height='231'
                             src={image}
                             alt={title}
                             crossOrigin="anonymous"
                             referrerPolicy="no-referrer"/>
                    </figure>
                    {title}
                </Link>
            ) : <div className='empty'>no results</div>
        }
    </nav>;


    useEffect(() => {
        if (runSearch) {
            const SearchResults = async (api) => {
                setLoading(true)
                await axios.get(api).then(
                    (response) => {
                        setSearchResults(response.data.results)
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
    }, [api, runSearch])

    return (
        <div className='searchbar'>
            <input className='searchbar-input'
                   onChange={updateSearchQuery}
                   type='text'
                   placeholder='search recipes'
                   value={searchQuery}/>
            {runSearch && (
                <div className='searchbar__results'>
                    {loading && (
                        <Loader/>
                    )}
                    {!loading && SearchData}
                </div>
            )}
        </div>

    );
}

export default AutocompleteSearch;