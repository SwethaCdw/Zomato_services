import { ordersData } from '../services/zomato-services.js';

/**
 * Identify which day more items are sold, and print weekday sale or weekend sale based on day
 * 
 */
export function getMaxSaleDetails(){
    const orders = ordersData;
    let itemsSoldByDate = getItemsSoldByDate(orders);
    console.log(itemsSoldByDate);

    let maxDayDetail = getMaxSoldDayDetail(itemsSoldByDate);

    let weekSale = calculateSalesByWeekdayAndWeekend(itemsSoldByDate);

    if(maxDayDetail.maxDay == 0 || maxDayDetail.maxDay == 6){
        return {maxDayDetail : maxDayDetail, weekSale: weekSale.weekendSales }
    } else {
        return {maxDayDetail : maxDayDetail, weekSale: weekSale.weekdaySales }
    }
}

/**
 * Find which date has the most items quantity
 * @param {*} itemsSoldByDate list of date with quantity
 * @returns maxDayDetail
 */
function getMaxSoldDayDetail(itemsSoldByDate) {
    let maxDate = null;
    let maxItemsSold = 0;
    
    for (let date in itemsSoldByDate) {
        if (itemsSoldByDate[date].quantity > maxItemsSold) {
            maxItemsSold = itemsSoldByDate[date].quantity;
            maxDate = date;
        }
    }

    let maxDay = new Date(maxDate).toLocaleString('en-US', {weekday : 'long'});

    let maxDayDetail = {
        maxDay : maxDay,
        maxDate : maxDate
    }

    return maxDayDetail;
}

/**
 * 
 * @param {*} itemsSoldByDate - list of orders with date, price and quantity
 */
function calculateSalesByWeekdayAndWeekend(itemsSoldByDate) {
    return Object.entries(itemsSoldByDate).reduce((totalSales, [dateStr, { price }]) => {

        const date = new Date(dateStr);

        if (date.getDay() >= 1 || date.getDay() <= 5) {
            totalSales.weekdaySales += price;
        } else {
            totalSales.weekendSales += price;
        }

        return totalSales;
    }, { weekdaySales: 0, weekendSales: 0 });
}


/**
 * 
 * @param {*} orders 
 * @returns the list of dates with corresponding quanitity
 */
function getItemsSoldByDate(orders) {
    return orders.reduce((obj, order) => {

        let { date, quantity, price } = order;
        if (obj[date]) {
            obj[date].quantity += quantity;
            obj[date].price += price;
        } else {
            obj[date] = { quantity: quantity, price: price };
        }
        return obj;
    }, {});
}
