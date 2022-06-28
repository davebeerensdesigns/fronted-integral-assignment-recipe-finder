const calculate = (recipeServings, amount, servings, unitShort) => {
    return (Math.round((amount / servings * recipeServings + Number.EPSILON) * 100) / 100) + ' ' + (unitShort ? unitShort : '')
}

const calculateIngredientsMetrics = {
    calculate
}

export default calculateIngredientsMetrics