import React from "react";
import Fridge from '../../../assets/images/fridge.png';
import Button from "../../../components/buttons/button/Button";
import { useNavigate } from "react-router-dom";
import './Dashboard.scss';

function Dashboard() {

    let navigate = useNavigate();

    return (
        <>
            <div className='page-title'>
                <h1>Dashboard</h1>
            </div>
            <div className='hero-banner'>
                <div className='hero-image'>
                    <img src={Fridge} alt='Fridge with ingredients' />
                </div>
                <div className='hero-content'>
                    <h2>Discover <span className='text-primary'>recipes</span> with <span className='text-primary'>ingredients</span> you have!</h2>
                    <p>Don't have time to go to the store but still craving for good food? Find a variety of recipes with ingredients you own!</p>
                    <Button size='btn-lg' customClass='btn-primary' type='button' customClick={()=> {
                        navigate("/search-pantry", {replace: true});
                    }}>Search your pantry</Button>
                    <div className='callouts'>
                        <span><b>5000+</b><br /> <small>recipes</small></span>
                        <span><b>1000+</b><br /> <small>ingredients</small></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;