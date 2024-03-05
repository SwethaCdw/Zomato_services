import { ordersData, userData } from '../services/zomato-services.js';


/**
 * How many users placed same order and print details of users & order details
 */
export function checkDuplicateOrders() {
    const orders = ordersData;
    const orderDetails = [];
    const orderFoodKey = new Set();
    const uniqueUserIds = new Set();

    for(const order of orders) {
        let userIds = new Set();
        let key = `${order.item}-${order.drink}`;
        if(!orderFoodKey.has(key)){
            const retrievedOrders = orders.map(o => {
                if(o.item === order.item && o.drink === order.drink){
                    userIds.add(o.userId);
                    return o;
                }
            });
    
            if(retrievedOrders.length > 1 && userIds.size > 1) {
                let userDetails = [];
                userIds.forEach(userId => {
                    let userName = userData.find(user => user.id === userId).name; 
                    uniqueUserIds.add(userId);
                    userDetails.push(userName);
                });
    
                orderDetails.push({
                    orderDetail : `Item : ${order.item ? order.item : ''} Drink : ${order.drink ? order.drink : ''}`,
                    userDetails : userDetails
                });
            }
        }
        orderFoodKey.add(key);
    }
    return {orderDetails, uniqueUserIds};


}