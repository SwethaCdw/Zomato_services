import { restaurantsData } from '../services/zomato-services.js';


/**
 * Identify Restaurants List which serve exact similar foods
 * 
 */
export function getRestaurantWithSameItems() {
    const foodMap = new Map();
    const restaurants = restaurantsData;

    restaurants.forEach(({ name, food }) => {
        if(food.length !== 0){
            const foodKey = food.sort().join('-'); 
            if (!foodMap.has(foodKey)) {
                foodMap.set(foodKey, [name]);
            } else {
                foodMap.get(foodKey).push(name);
            }
        }
    });

    const similarRestaurants = Array.from(foodMap.values())
        .filter(restaurants => restaurants.length > 1);

    return similarRestaurants;
}