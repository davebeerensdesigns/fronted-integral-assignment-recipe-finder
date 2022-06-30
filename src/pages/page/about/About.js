import React from 'react';
import PageTitle from "../../../components/titles/PageTitle";

function About() {
    return (
        <div id='page-about'>

            <PageTitle title='About'/>

            <h2>RecipeFinder is built with Spoonacular API</h2>
            <p>RecipeFinder is for educational purpose only. It is a school project that has been built with the free API from Spoonacular.</p>

            <h2>Spoonacular</h2>
            <p>Spoonacular is the first food management system that combines dining out, eating store-bought food, and cooking at home to help you find and organize the restaurants, products, and recipes that fit your diet and can help you reach your nutrition goals.</p>

            <p>With spoonacular, you can add your favorite recipes and store bought products to their free meal planner, which automatically generates your shopping list and calculates the nutritional information for you. Whether you're cooking from scratch or picking something up at the store, their meal planner doubles as a food tracker that counts your calories, protein, fat, carbs, sugar, and other nutrients for you.</p>

            <p>With their food search engine, you will find everything from "protein shake with 20 grams of protein" to "best vegan restaurant in Chicago" to "Paleo brownie recipes."</p>

            <p><a href='https://spoonacular.com/food-api' target='_blank'>https://spoonacular.com/food-api</a></p>

            <h2>NOVI Educational Backend</h2>

            <p>This backend is built by NOVI and may only be used for training purposes.</p>

            <p>When students follow the Frontend learning pathway and need a backend for their final assignment, they can choose to use the NOVI backend. This backend only supports registering, logging in and customizing users. It is not possible to store other information (besides email, username, password and role) in this database. Note: the database of users is often emptied within one hour.</p>

            <p>The backend runs on a Heroku server. This server automatically becomes inactive when no requests are made for a while. The first request that the server wakes up from 'sleep' will therefore take a maximum of 30 seconds. After that, the response time will be normal. Therefore, always perform a test request first.</p>
            <p>The backend runs on a Heroku server. This server automatically becomes inactive when no requests are made for a while. The first request that the server wakes up from 'sleep' will therefore take a maximum of 30 seconds. After that, the response time will be normal. Therefore, always perform a test request first.</p>

        </div>
    );
}

export default About;