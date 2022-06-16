const GetCuisineAPI = (cuisineId, type, number, offset) => {
    return `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${cuisineId}&type=${type}&addRecipeInformation=true&sort=latest&number=${number}&offset=${offset}`;
}

const spoonacularService = {
    GetCuisineAPI
}

export default spoonacularService;