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
            obj[restaurant_name] += price;
        } else {
            obj[restaurant_name] =  price ;
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

    let sortedRestaurants = Object.entries(restaurantSales).sort((a, b) => b[1] - a[1]);

    let highestSellingRestaurantDetails = sortedRestaurants[0];
    highestSellingRestaurant = highestSellingRestaurantDetails[0];
    highestSales = highestSellingRestaurantDetails[1];

    return { highestSales, highestSellingRestaurant };
}
