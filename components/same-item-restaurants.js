import { restaurantsData } from '../services/zomato-services.js';

/**
 * Identify Restaurants List which serve exact similar foods
 */
export function getRestaurantWithSameItems() {
    const similarRestaurants = Object.values(restaurantsData.reduce((foodGroups, { name, food }) => {
        if (food.length !== 0) {
            const foodKey = food.sort().join('-').trim();
            if (!foodGroups[foodKey]) {
                foodGroups[foodKey] = [name];
            } else {
                foodGroups[foodKey].push(name);
            }
        }
        return foodGroups;
    }, {})).filter(restaurants => restaurants.length > 1);
    return similarRestaurants;
}