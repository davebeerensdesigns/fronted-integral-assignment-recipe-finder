<div id="top"></div>

<div align="center">
  <a href="https://github.com/davebeerensdesigns/fronted-integral-assignment-recipe-finder">
    <img src="src/assets/logo/logo.svg" alt="Logo" width="200" height="auto">
  </a>

<h2 align="center">RecipeFinder</h2>

  <p align="center">
    React application that helps you find recipes based on ingredients in your pantry!
    <br />
    <a href="https://github.com/davebeerensdesigns/fronted-integral-assignment-recipe-finder"><strong>Explore the docs »</strong></a>
  </p>
</div>

<h3>Table of contents</h3>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>

## About The Project

<a href="https://github.com/davebeerensdesigns/fronted-integral-assignment-recipe-finder">
    <img src="screenshot.jpg" alt="Logo" width="1200" height="auto">
  </a>

<i>Disclaimer: This is a school project for my education at NOVI Hogeschool - ICT Opleiding. I am following the HBO Software development education. This project is built for the Frontend development course. It is not meant to be used as a real application.</i>

Do you never know what to cook tonight? Does it seem as if your creativity and decisiveness around dinner time has also suddenly disappeared? And then resist yourself to go shopping. Personally, I experience this about every day. That is why I built this app where you can enter a number of ingredients, after which this application will propose a number of suitable recipes to choose from. For example, when someone is short on time, the application will suggest more quick recipes.

On the days when the user does feel like going shopping, there is also an option to browse through all available recipes and search for specific recipes using a search function.

To do this I make HTTP requests to the Spoontacular API (https://spoonacular.com/food-api/docs) to request the correct data and process it in my application.

Finally, the user also has the option to add recipes to a favorites list to quickly find them.
To do this I use the NOVI backend where a user can create an account. I use the information field to store recipe IDs.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [React.js](https://reactjs.org/)
* [Spoonacular](https://spoonacular.com/food-api/docs)
* [Novi Educational Backend](https://github.com/hogeschoolnovi/novi-educational-backend-documentation)
* [FontAwesome](https://fontawesome.com/)
* [Google Fonts](https://fonts.google.com/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

To setup the application you need to install npm. You also need API keys for Spoonacular and FontAwesome Pro.

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a API Key for Spoonacular and FontAwesome Pro. These can also be found in the Functional Requirements document provided by the developer.
2. Clone the repo
   ```sh
   git clone https://github.com/davebeerensdesigns/fronted-integral-assignment-recipe-finder.git
   ```
3. Create a .env file in the root folder and the following text:
   ```sh
    REACT_APP_API_KEY=***************
   ```
   Replace the * for the Spoonacular api key.
4. Create a .npmrc file with fontawesome authToken to use fontawesome pro icons.
   ```sh
   @fortawesome:registry=https://npm.fontawesome.com/
   //npm.fontawesome.com/:_authToken=********************
   ```
   Replace the * for the fontawesome authToken.
5. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

## Usage
"npm run start": "react-scripts start",

### Start
Runs the app in the development mode. Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.
```sh
npm run start
```

### Build
Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.
```sh
npm run build
```

### Production
Runs the app in production mode created by the build command. First install a static server to run it on.
```sh
npm install -g serve
npm run serve
```

