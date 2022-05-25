import Dashboard from "../pages/dashboard/Dashboard";
import About from "../pages/about/About";
import SearchPantry from "../pages/search-pantry/SearchPantry";
import Cuisines from "../pages/cuisines/Cuisines";
import Popular from "../pages/popular/Popular";
import Latest from "../pages/latest/Latest";
import NotFound from "../pages/not-found/NotFound";
import Favorites from "../pages/favorites/Favorites";

const routes =[
    {
        path:'/',
        element: <Dashboard />,
        isPrivate: false,
    },
    {
        path:'/search-pantry',
        element: <SearchPantry />,
        isPrivate: false,
    },
    {
        path:'/favorites',
        element: <Favorites />,
        isPrivate: true,
    },
    {
        path:'/cuisines',
        element: <Cuisines />,
        isPrivate: false,
    },
    {
        path:'/popular',
        element: <Popular />,
        isPrivate: false,
    },
    {
        path:'/latest',
        element: <Latest />,
        isPrivate: false,
    },
    {
        path:'/about',
        element: <About />,
        isPrivate: false,
    },
    {
        path:'/*',
        element: <NotFound />,
        isPrivate: false,
    },
]

export default routes