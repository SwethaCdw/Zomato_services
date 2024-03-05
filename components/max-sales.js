import { APP_CONSTANTS } from '../constants/app-constants.js';
import { ordersData } from '../services/zomato-services.js';
import { createDateObject, getDay } from '../utils/utils.js';

/**
 * Identify which day more items are sold, and print weekday sale or weekend sale based on day
 * 
 */
export function getMaxSaleDetails(){
    const orders = ordersData;
    let itemsSoldByDate = getItemsSoldByDate(orders);
    let maxDayDetail = getMaxSoldDayDetail(itemsSoldByDate);
    let weekSale = calculateSalesByWeekdayAndWeekend(itemsSoldByDate, maxDayDetail.maxDayType);
    if(maxDayDetail.maxDay == 0 || maxDayDetail.maxDay == 6){
        return {maxDayDetail : maxDayDetail, weekSale: weekSale }
    } else {
        return {maxDayDetail : maxDayDetail, weekSale: weekSale }
    }
}

/**
 * Find which date has the most items quantity
 * @param {*} itemsSoldByDate list of date with quantity
 * @returns maxDayDetail
 */
function getMaxSoldDayDetail(itemsSoldByDate) {
    let maxDate = '';
    let sortedMap = Object.keys(itemsSoldByDate).sort((a, b) => itemsSoldByDate[b].quantity - itemsSoldByDate[a].quantity);
    maxDate = sortedMap[0];
    let maxDay = getDay(maxDate);
    let maxDayDetail = {
        maxDay : maxDay,
        maxDayType : maxDay == 0 || maxDay == 6 ? APP_CONSTANTS.WEEKEND_KEY : APP_CONSTANTS.WEEKDAY_KEY,
        maxDate : maxDate
    }
    return maxDayDetail;
}

/**
 * 
 * @param {*} itemsSoldByDate - list of orders with date, price and quantity
 */
function calculateSalesByWeekdayAndWeekend(itemsSoldByDate, maxDayType) {
    return Object.entries(itemsSoldByDate).reduce((sales, [dateStr, {price}]) => {
        const date = createDateObject(dateStr);
        switch(maxDayType) {
            case APP_CONSTANTS.WEEKDAY_KEY:
                if (date.getDay() >= 1 || date.getDay() <= 5) {
                    sales += price;
                }  
                return sales;
            case APP_CONSTANTS.WEEKEND_KEY:
                if (date.getDay() === 0 || date.getDay() === 6) {
                    sales += price;
                }
                return sales;
            default:
                console.log('Invalid Type');
                break;
        }
    }, 0);
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