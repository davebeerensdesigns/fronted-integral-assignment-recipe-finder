const getAccountTab = () => {
    return localStorage.getItem('accountTab');
}

const setAccountTab = (data) => {
    return localStorage.setItem('accountTab', data);
}

const getMainNavTab = () => {
    return localStorage.getItem('mainNav');
}

const setMainNavTab = (data) => {
    return localStorage.setItem('mainNav', data);
}

const Appservice = {
    getAccountTab,
    setAccountTab,
    getMainNavTab,
    setMainNavTab
}

export default Appservice