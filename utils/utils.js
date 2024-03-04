
//get date object
export const createDateObject = (date) => {
    let convertedDate = new Date(date);
    return convertedDate;
}

//get day from date
export const getDay = (date) => {
    let day = new Date(date).toLocaleString('en-US', {weekday : 'long'});
    return day;
}

//find item from a given array
export const isItemFound = (findFrom, itemToFind) => {
    return findFrom.some(item =>
        item.toLowerCase().includes(itemToFind.toLowerCase())
    );
}