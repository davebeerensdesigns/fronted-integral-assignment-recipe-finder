import Dashboard from "../pages/dashboard/Dashboard";
import About from "../pages/about/About";
import SearchPantry from "../pages/search-pantry/SearchPantry";
import Cuisines from "../pages/cuisines/Cuisines";
import Popular from "../pages/popular/Popular";
import Latest from "../pages/latest/Latest";
import NotFound from "../pages/not-found/NotFound";

const routes =[
    {
        path:'/',
        element: <Dashboard />
    },
    {
        path:'/search-pantry',
        element: <SearchPantry />
    },
    {
        path:'/cuisines',
        element: <Cuisines />
    },
    {
        path:'/popular',
        element: <Popular />
    },
    {
        path:'/latest',
        element: <Latest />
    },
    {
        path:'/about',
        element: <About />
    },
    {
        path:'/*',
        element: <NotFound />
    },
]

export default routes