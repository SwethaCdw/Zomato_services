import { ordersData, restaurantsData } from '../services/zomato-services.js';


/**
 * Identify restaurants which did not sell yet
 * 
 */
export function getUnSoldRestaurant() {
    const orders = ordersData;
    const restaurantInfo = restaurantsData;

    const soldRestaurantNames = new Set(orders.map(order => order.restaurant_name.toUpperCase()));
    return restaurantInfo.reduce((unsoldRestaurants, restaurant) => {
        if (!soldRestaurantNames.has(restaurant.name.toUpperCase())) {
            unsoldRestaurants.push(restaurant.name);
        }
        return unsoldRestaurants;
    }, []);

}