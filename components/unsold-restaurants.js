import { ordersData, restaurantsData } from '../services/zomato-services.js';


/**
 * Identify restaurants which did not sell yet
 * 
 */
export function getUnSoldRestaurant() {
    const orders = ordersData;
    const restaurantInfo = restaurantsData;

    const soldRestaurantNames = new Set(orders.map(order => order.restaurant_name.toUpperCase()));
    
    let unsoldRestaurants = restaurantInfo
    .filter(restaurant => {
        if(!soldRestaurantNames.has(restaurant.name.toUpperCase())){
            return restaurant.name;
        }
    });

    return unsoldRestaurants.length;

}