import { ordersData } from '../services/zomato-services.js';
import { APP_CONSTANTS } from '../constants/app-constants.js';

export function sortOrdersByDate() {
    const userInput = prompt('Do you want to sort in ASC/DESC?');

    const orders = ordersData;

    let sortedOrders;
    if (userInput && userInput === APP_CONSTANTS.ASCENDING || userInput === APP_CONSTANTS.DESCENDING) {
        const sortOrder = userInput === APP_CONSTANTS.ASCENDING ? 1 : -1;
        sortedOrders = orders.sort((prevOrder, nextOrder) => {
            return sortOrder * (new Date(prevOrder.date) - new Date(nextOrder.date));
        });
        return {userInput, sortedOrders};
    } else {
        console.log('Invalid input. Please enter either "ASC" or "DESC".');
        return false;
    }
}
