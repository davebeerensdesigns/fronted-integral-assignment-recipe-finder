const CreateKey = (location) => {
    return location.pathname + location.search;
}

const StoreCacheData = (cacheKey, data) => {
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
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