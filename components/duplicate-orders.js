import { ordersData, userData } from '../services/zomato-services.js';


/**
 * How many users placed same order and print details of users & order details
 */
export function checkDuplicateOrders() {
    const orders = ordersData;
    const orderMap = new Map();
    const orderDetails = [];
    const usersMap = new Map();

    //Setting the userId and userName in a Map to reduce the number of loops
    for (const user of userData) {
        usersMap.set(user.id, user.name);
    }
    //Looping through orders
    for (const order of orders) {
        let userIds = new Set();
        const key = (order.item || "") + " " + (order.drink || "");

        //existingOrders- to check if the order has come twice
        const existingOrders = orderMap.get(key) || [];

        //if the order has come twice, add the userId to the userIds set.
        if(existingOrders.length !== 0){
            existingOrders.forEach(existingOrder => {
                userIds.add(existingOrder.userId);
            })
        }

        //If the userIds set does not have the current userId - then, 
        //push the order to existing order
        //set the items (key) and existing order (value) to orderMap
        if(!userIds.has(order.userId)){
            existingOrders.push(order);
            orderMap.set(key, existingOrders);
        }
    }

    // Iterate through orderMap to get the userDetails
    let usersWithDuplicateOrders = new Set();
    orderMap.forEach((value, key) => {
        if (value.length > 1) {
            const userDetails = value.map(order => {
                usersWithDuplicateOrders.add(order.userId);
                return usersMap.get(order.userId)
            });
            orderDetails.push({ userDetails, orderDetails: key.trim() });
        }
    });

    return {orderDetails, usersWithDuplicateOrders};

}
