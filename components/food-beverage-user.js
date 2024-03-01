import { ordersData } from '../services/zomato-services.js';

/**
 * Identify how many users ordered both food item & beverage
 */
export function getUsersWithFoodAndBeverage() {
    const orders = ordersData;

    const usersWithFoodAndBeverage = orders.reduce((set, order) => {
        if (order.item && order.item.trim() !== '' && order.drink && order.drink.trim() !== '') {
            set.add(order.userId);
        }
        return set;
    }, new Set());
    
    
    const numberOfUsers = usersWithFoodAndBeverage.size;
    return numberOfUsers;
}
