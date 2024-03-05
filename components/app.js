import { APP_CONSTANTS } from '../constants/app-constants.js';
import { getMaxSaleDetails } from './max-sales.js';
import { checkDuplicateOrders } from './duplicate-orders.js';
import { getHighSaleRestaurant } from './high-sale-restaurant.js';
import { getUnSoldRestaurant } from './unsold-restaurants.js';
import { getRestaurantWithSameItems } from './same-item-restaurants.js';
import { getUsersWithFoodAndBeverage } from './food-beverage-user.js';
import { getSoldQuantityInfo } from './sold-quantity.js';
import { getRestaurantInfo } from './find-restaurant-by-item.js';
import { sortOrdersByDate } from './sort-orders-by-date.js';

document.getElementById("button-container").addEventListener("click", function(event) {
    const buttonId = event.target.id;

    switch (buttonId) {
        case "1":
            const getMaxSales = getMaxSaleDetails();
            console.log('Max day: ', getMaxSales.maxDayDetail);
            console.log(`${getMaxSales.maxDayDetail.maxDayType} SALE: Rs.${getMaxSales.weekSale}`);
            break;
        case "2":
            const {orderDetails, usersWithDuplicateOrders} = checkDuplicateOrders();
            console.log('Number of users with same order', usersWithDuplicateOrders.size);
            console.log('Users with same order: ',orderDetails);
            break;
        case "3":
            const { highestSellingRestaurant, highestSales } = getHighSaleRestaurant();
            console.log(`Highest Sales Restaurant Name : ${highestSellingRestaurant}`);
            console.log(`Sale Price : ${highestSales}`);
            break;
        case "4":
            const unsoldRestaurants = getUnSoldRestaurant();
            console.log("Restaurants that did not make any sales:" ,unsoldRestaurants);
            break;
        case "5":
            const similarRestaurants = getRestaurantWithSameItems();
            console.log("Restaurants serving exactly similar foods:");
            console.log(similarRestaurants);
            break;
        case "6":
            const numberOfUsers = getUsersWithFoodAndBeverage();
            console.log(`Number of users who ordered both food and beverage: ${numberOfUsers}`);
            break;
        case "7":
            const { itemName, restaurantName, totalSold } = getSoldQuantityInfo();
            if(itemName){
                console.log(`Total ${itemName} sold at ${restaurantName}: ${totalSold}`);
            }
            break;
        case "8":
            const {itemToFind, restaurantsServingItem} = getRestaurantInfo();
            if(itemToFind && restaurantsServingItem){
                console.log(`Restaurants serving ${itemToFind}:`);
                console.log(restaurantsServingItem);
            }
            break;
        case "9":
            const {userInput, sortedOrders} = sortOrdersByDate();
            if(sortedOrders){
                console.log(`Sorted Orders in ${userInput === APP_CONSTANTS.ASCENDING ? 'Ascending' : 'Descending'}`, 
                sortedOrders);
            }
            break;
        default:
            break;
    }
});
