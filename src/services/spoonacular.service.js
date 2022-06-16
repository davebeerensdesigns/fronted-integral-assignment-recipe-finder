const baseAPI = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}`;

const GetCuisineAPI = (cuisineId, type, number, offset) => {
    return `${baseAPI}&cuisine=${cuisineId}&type=${type}&addRecipeInformation=true&sort=latest&number=${number}&offset=${offset}`;
}

const GetLatestAPI = (type, number, offset) => {
    return `${baseAPI}&type=${type}&addRecipeInformation=true&sort=latest&number=${number}&offset=${offset}`;
}

const GetPopularAPI = (type, number, offset) => {
    return `${baseAPI}&type=${type}&addRecipeInformation=true&sort=popularity&number=${number}&offset=${offset}`;
}

const spoonacularService = {
    GetCuisineAPI,
    GetLatestAPI,
    GetPopularAPI
}

export default spoonacularService;