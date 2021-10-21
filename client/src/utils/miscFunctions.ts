export const reformatDate = (date : string) => {
    const dateObject = new Date(date);
    return ((dateObject.getDate() >= 10 ? dateObject.getDate() : "0" + dateObject.getDate())  + "/" + (dateObject.getMonth() >= 10 ? dateObject.getMonth() : "0" + dateObject.getMonth()) + "/" + dateObject.getFullYear())
}