import {
    faHatChef,
    faHeart,
    faHouse,
    faInfoCircle,
    faRefrigerator,
    faSparkles,
    faUserChef
} from "@fortawesome/pro-regular-svg-icons";

const links = [
    {
        path: '/',
        icon: faHouse,
        title: 'Dashboard',
        user: false
    },
    {
        path: '/search-pantry',
        icon: faRefrigerator,
        title: 'Search pantry',
        user: false
    },
    {
        path: '/cuisines',
        icon: faUserChef,
        title: 'Cuisines',
        user: false
    },
    {
        path: '/favorites',
        icon: faHeart,
        title: 'Favorites',
        user: true
    },
    {
        path: '/popular',
        icon: faSparkles,
        title: 'Popular',
        user: false
    },
    {
        path: '/latest',
        icon: faHatChef,
        title: 'Latest',
        user: false
    },
    {
        path: '/about',
        icon: faInfoCircle,
        title: 'About',
        user: false
    }
]

export default links