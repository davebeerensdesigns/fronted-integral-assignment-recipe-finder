const CreateKey = (location, parameters = {}) => {
    const params = [];
    if(parameters){
        Object.entries(parameters).map(([key, value]) => {
            if(value !== null){
                const string = key + '=' + encodeURIComponent(value.trim());
                params.push(string)
            }
        });
    }
    return params.length > 0 ? location.pathname + '?' + params.join('&') : location.pathname;
}

const StoreCacheData = (cacheKey, data) => {
    try {
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (e) {
        sessionStorage.clear();
    }
}
const GetCachedData = (cacheKey) => {
    return sessionStorage.getItem(cacheKey);
}

const DeleteCachedData = (cacheKey) => {
    sessionStorage.removeItem(cacheKey);
}

const CacheService = {
    CreateKey,
    StoreCacheData,
    GetCachedData,
    DeleteCachedData
}

export default CacheService;