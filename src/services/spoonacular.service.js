const baseAPI = `https://api.spoonacular.com/recipes`;

const GetCuisineAPI = (cuisineId, type, number, offset) => {
    return `${baseAPI}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${cuisineId}&type=${type}&addRecipeInformation=true&sort=latest&number=${number}&offset=${offset}`;
}

const GetLatestAPI = (type, number, offset) => {
    return `${baseAPI}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${type}&addRecipeInformation=true&sort=latest&number=${number}&offset=${offset}`;
}

const GetPopularAPI = (type, number, offset) => {
    return `${baseAPI}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${type}&addRecipeInformation=true&sort=popularity&number=${number}&offset=${offset}`;
}

const GetRecipeAPI = (id) => {
    return `${baseAPI}/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`;
}

const spoonacularService = {
    GetCuisineAPI,
    GetLatestAPI,
    GetPopularAPI,
    GetRecipeAPI
}

export default spoonacularService;