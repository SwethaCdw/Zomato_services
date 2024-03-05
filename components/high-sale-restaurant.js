import { ordersData } from '../services/zomato-services.js';

/**
 * Identify restaurant which did sell highest
 * 
 */
export function getHighSaleRestaurant() {
    const orders = ordersData;
    const restaurantSales = getRestaurantSalesMap(orders);
    return getHighestSaleRestaurantDetails(restaurantSales);
}

/**
 * To get the restaurant and the total price
 * @param {*} restaurantSalesMap 
 * @param {*} orders 
 */

function getRestaurantSalesMap(orders) {
    return orders.reduce((obj, order) => {
        let { restaurant_name , price } = order;
        if (obj[restaurant_name]) {
            obj[restaurant_name].price += price;
        } else {
            obj[restaurant_name] = {price: price} ;
        }
        return obj;
    }, {});
}

/**
 * 
 * @param {*} updatedrestaurantSalesMap 
 * @returns highestSales & highestSellingRestaurant
 */
function getHighestSaleRestaurantDetails(restaurantSales) {
    let highestSales = 0;
    let highestSellingRestaurant = '';
    let sortedRestaurants = Object.keys(restaurantSales).sort((a, b) => restaurantSales[b].price - restaurantSales[a].price);   
    highestSellingRestaurant = sortedRestaurants[0];
    highestSales = restaurantSales[highestSellingRestaurant].price;
    return { highestSales, highestSellingRestaurant };
}
