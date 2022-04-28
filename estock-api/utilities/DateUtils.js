const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const months31 = [1, 3, 5, 7, 8, 10, 12];

class DateUtils {

    static createDate(dateString)
    {
        let date = new Date(dateString);

        if(!DateUtils.isValidDate(date))
            throw new Error('Date cannot be created, invalid value');

        return date;
    }

    static onlyDate(date)
    {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    }

    static localeDateString(date, locale)
    {
        return date.toLocaleDateString(locale, dateOptions);
    }

    static toLocaleTimeString(date, locale)
    {
        return date.toLocaleTimeString(locale);
    }

    static isValidDate(date)
    {
        return !isNaN(date.getTime()) && date.toString() !== 'Invalid Date';
    }

    static isDateBeforeToday(date)
    {
        let today = DateUtils.onlyDate(new Date());

        return date.getTime() < today.getTime();
    }

    static isToday(date)
    {
        let today = DateUtils.onlyDate(new Date());

        return date.getTime() === today.getTime();
    }

    static addDayTo(date, day)
    {
        const days = date.getDate() + day;
        const months = date.getMonth() + 1;

        if(days > 31)
            throw new Error('Day\'s value is too large');

        if(days === 31 && !months31.includes(months))
            throw new Error('Inappropriate month for the day value');


        date.setDate(date.getDate() + day);

        return date;
    }

    static addHourTo(date, hour)
    {
        const hours = (date.getHours() + 1) + hour;

        if(hours > 24)
            throw new Error('Hour\'s value is too large');

        if(hours <= 0)
            throw new Error('Invalid hour value');


        date.setHours(date.getHours() + hour);

        return date;
    }

    static addMinuteTo(date, minute)
    {
        const minutes = (date.getMinutes() + 1) + minute;

        if(minutes > 60)
            throw new Error('Minute\'s value is too large');

        if(minute <= 0)
            throw new Error('Invalid minute value');


        date.setHours(date.getMinutes() + minute);

        return date;
    }
}

module.exports = DateUtils;