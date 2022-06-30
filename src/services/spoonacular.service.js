const recipeApi = `https://api.spoonacular.com/recipes`;
const ingredientApi = `https://api.spoonacular.com/food/ingredients`;

const GetCuisineAPI = (cuisineId, type, number, offset) => {
    return `${recipeApi}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${cuisineId}&type=${type}&addRecipeInformation=true&sort=latest&number=${number}&offset=${offset}`;
}

const GetLatestAPI = (type, number, offset) => {
    return `${recipeApi}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${type}&addRecipeInformation=true&sort=latest&number=${number}&offset=${offset}`;
}

const GetPopularAPI = (type, number, offset) => {
    return `${recipeApi}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&type=${type}&addRecipeInformation=true&sort=popularity&number=${number}&offset=${offset}`;
}

const GetFavoritesAPI = (ids) => {
    return `${recipeApi}/informationBulk?apiKey=${process.env.REACT_APP_API_KEY}&ids=${ids}&includeNutrition=false`;
}

const GetAutocompleteSearchAPI = (query, number) => {
    return `${recipeApi}/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=${number}&query=${query}`;
}

const GetIngredientSearchAPI = (query, number) => {
    return `${ingredientApi}/autocomplete?apiKey=${process.env.REACT_APP_API_KEY}&number=${number}&query=${query}&metaInformation=true`;
}

const GetRecipeAPI = (id) => {
    return `${recipeApi}/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&includeNutrition=false`;
}

const spoonacularService = {
    GetCuisineAPI,
    GetLatestAPI,
    GetPopularAPI,
    GetFavoritesAPI,
    GetAutocompleteSearchAPI,
    GetIngredientSearchAPI,
    GetRecipeAPI
}

export default spoonacularService;