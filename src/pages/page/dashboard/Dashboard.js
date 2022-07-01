import React from "react";
import Fridge from '../../../assets/images/fridge-tags.png';
import Button from "../../../components/buttons/button/Button";
import {useNavigate} from "react-router-dom";
import './Dashboard.scss';
import '@splidejs/react-splide/css/core';
import WidgetSlider from "../../../components/widgets/WidgetSlider";
import PageTitle from "../../../components/titles/PageTitle";
import spoonacularService from "../../../services/spoonacular.service";

function Dashboard() {

    let navigate = useNavigate();

    return (
        <>
            <PageTitle title='Dashboard' />
            <div className='hero-banner'>
                <div className='hero-image'>
                    <img src={Fridge}
                         alt='Fridge with ingredients' width='451' height='386'/>
                </div>
                <div className='hero-content'>
                    <h2>Discover <span className='text-primary'>recipes</span> with <span className='text-primary'>ingredients</span> you
                        have!</h2>
                    <p>Don't have time to go to the store but still craving for good food? Find a variety of recipes
                        with ingredients you own!</p>
                    <Button size='btn-lg'
                            customClass='btn-primary'
                            type='button'
                            customClick={() => {
                                navigate("/search-pantry", {replace: true});
                            }}>Search your pantry</Button>
                    <div className='callouts'>
                        <span><b>5000+</b><br/> <small>recipes</small></span>
                        <span><b>1000+</b><br/> <small>ingredients</small></span>
                    </div>
                </div>
            </div>
            <WidgetSlider slidesFor='popular' title='Popular' api={spoonacularService.GetPopularAPI('', 6, 0)}/>
            <WidgetSlider slidesFor='latest' title='Latest' api={spoonacularService.GetLatestAPI('', 6, 0)}/>

        </>
    );
}

export default Dashboard;