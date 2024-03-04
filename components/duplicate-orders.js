import { ordersData, userData } from '../services/zomato-services.js';


/**
 * How many users placed same order and print details of users & order details
 */
export function checkDuplicateOrders() {
    const orders = ordersData;
    const orderMap = new Map();
    const orderDetails = [];

    //Looping through orders
    for (const order of orders) {
        let userIds = new Set();
        const key = (order.item || "") + " " + (order.drink || "");

        //existingOrders- to check if the order has come twice
        const existingOrders = orderMap.get(key.trim()) || []; 

        //if the order has come twice, add the userId to the userIds set.
        if(existingOrders.length !== 0){
            existingOrders.forEach(existingOrder => {
                userIds.add(existingOrder.userId);
            });
        }

        //If the userIds set does not have the current userId - then, 
        //push the order to existing order
        //set the items (key) and existing order (value) to orderMap
        if(!userIds.has(order.userId)){
            existingOrders.push(order);
            orderMap.set(key.trim(), existingOrders);
        }
    }

    // Iterate through orderMap to get the userDetails
    let usersWithDuplicateOrders = new Set();
    console.log(orderMap);
    orderMap.forEach((value, key) => {
        if (value.length > 1) {
            const userDetails = value.map(order => {
                usersWithDuplicateOrders.add(order.userId);
                return userData.find(user => user.id === order.userId).name;
            });
            orderDetails.push({ userDetails, orderDetails: key });
        }
    });

    return {orderDetails, usersWithDuplicateOrders};

}