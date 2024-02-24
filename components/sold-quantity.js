import { ordersData } from '../services/zomato-services.js';

/**
 * Given any restaurant name & item name identify how many sold
 */
export function getSoldQuantityInfo() {
    const orders = ordersData;
    const restaurantName = prompt('Please enter the restaurant name');
    const itemName = prompt('Please enter the food item name'); 

    if(restaurantName && itemName && restaurantName?.trim()?.length !== 0 && itemName?.trim()?.length !== 0){
        const totalSold = orders.reduce((total, order) => {
            if (order.restaurant_name.toUpperCase() === restaurantName.toUpperCase() && order.item.toUpperCase() === itemName.toUpperCase()) {
                total += order.quantity;
            }
            return total;
        }, 0);
    
        return {itemName, restaurantName, totalSold};
    } else {
        console.log('Invalid input. Please enter valid restaurant name or item name');
        return false;
    }
    
}