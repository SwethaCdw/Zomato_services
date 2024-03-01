import { ordersData } from '../services/zomato-services.js';



/**
 * Identify restaurant which did sell highest
 * 
 */
export function getHighSaleRestaurant() {
    const orders = ordersData;

    orders.forEach(order => {
    });
    const restaurantSalesMap = new Map();

    getRestaurantSalesMap(restaurantSalesMap, orders);

    return getHighestSaleRestaurantDetails(restaurantSalesMap);

}

/**
 * To get the restaurant and the total price
 * @param {*} restaurantSalesMap 
 * @param {*} orders 
 */

function getRestaurantSalesMap(restaurantSalesMap, orders) {
    orders.forEach(order => {
        const { restaurant_name, price } = order;

        if (restaurantSalesMap.has(restaurant_name)) {
            restaurantSalesMap.set(restaurant_name, restaurantSalesMap.get(restaurant_name) + price);
        } else {
            restaurantSalesMap.set(restaurant_name, price);
        }
    });
}

/**
 * 
 * @param {*} updatedrestaurantSalesMap 
 * @returns highestSales & highestSellingRestaurant
 */
function getHighestSaleRestaurantDetails(restaurantSalesMap) {
    let highestSales = 0;
    let highestSellingRestaurant = '';

    restaurantSalesMap.forEach((totalSales, restaurantName) => {
        if (totalSales > highestSales) {
            highestSales = totalSales;
            highestSellingRestaurant = restaurantName;
        }
    });

    return { highestSales, highestSellingRestaurant };
}
