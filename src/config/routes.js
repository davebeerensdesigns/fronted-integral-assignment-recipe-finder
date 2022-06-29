import Dashboard from "../pages/page/dashboard/Dashboard";
import About from "../pages/page/about/About";
import SearchPantry from "../pages/page/search-pantry/SearchPantry";
import Cuisines from "../pages/page/cuisines/Cuisines";
import Popular from "../pages/page/popular/Popular";
import Latest from "../pages/page/latest/Latest";
import NotFound from "../pages/page/not-found/NotFound";
import Favorites from "../pages/page/favorites/Favorites";
import CuisinesRecipes from "../pages/page/cuisines/CuisinesRecipes";
import Recipe from "../pages/page/recipe/Recipe";

const routes = [
    {
        path: '/',
        element: <Dashboard/>,
        isPrivate: false,
    },
    {
        path: '/search-pantry',
        element: <SearchPantry/>,
        isPrivate: false,
    },
    {
        path: '/favorites',
        element: <Favorites/>,
        isPrivate: true,
    },
    {
        path: '/cuisines',
        element: <Cuisines/>,
        isPrivate: false,
    },
    {
        path: '/cuisines/:cuisineId',
        element: <CuisinesRecipes/>,
        isPrivate: false,
    },
    {
        path: '/cuisines/:cuisineId/recipe/:recipeId',
        element: <Recipe/>,
        isPrivate: false,
    },
    {
        path: '/popular',
        element: <Popular/>,
        isPrivate: false,
    },
    {
        path: '/popular/recipe/:recipeId',
        element: <Recipe/>,
        isPrivate: false,
    },
    {
        path: '/latest',
        element: <Latest/>,
        isPrivate: false,
    },
    {
        path: '/latest/recipe/:recipeId',
        element: <Recipe/>,
        isPrivate: false,
    },
    {
        path: '/search/recipe/:recipeId',
        element: <Recipe/>,
        isPrivate: false,
    },
    {
        path: '/about',
        element: <About/>,
        isPrivate: false,
    },
    {
        path: '/*',
        element: <NotFound/>,
        isPrivate: false,
    },
]

export default routes