export function calculateIngredientsMetrics(recipeServings, amount, servings, unitShort) {
    const math = Math.round((amount / servings * recipeServings + Number.EPSILON) * 100) / 100;
    switch (unitShort) {
        case 'g':
        case 'ml':
            return Math.ceil(math) + ' ' + (unitShort ? unitShort : '')
            break;
        default:
            return parseFloat(math.toFixed(1)) + ' ' + (unitShort ? unitShort : '')
            break;
    }
}