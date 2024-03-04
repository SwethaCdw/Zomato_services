import { restaurantsData } from '../services/zomato-services.js';
import { findItem } from '../utils/utils.js';

/**
 * Which all restaurants serve given beverage or food
 */
export function getRestaurantInfo() {
    const restaurantData = restaurantsData;
    const itemToFind = prompt('Please enter the beverage/food item name'); 

    if (itemToFind && itemToFind?.trim()?.length !== 0) {
        const restaurantsServingItem = restaurantData.reduce((restaurantList, restaurant) => {
        
            // Check if any item in the food array contains the itemToFind ( Case insensitive )
            const foodFound = findItem(restaurant.food, itemToFind);
            // Check if any item in the beverages array contains the itemToFind
            const beveragesFound = findItem( restaurant.beverages, itemToFind);
        
            // If the item is found in either food or beverages, add the restaurant to the list
            if (foodFound || beveragesFound) {
                restaurantList.push(restaurant.name);
            }
        
            return restaurantList;
        }, []);

        return {itemToFind, restaurantsServingItem};
    } else {
        console.log('Invalid input. Please enter valid beverage/food item name');
        return false;
    }
}