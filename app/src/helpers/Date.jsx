import moment from 'moment';

export const formatDate = (date, Format) => {
    if (_.isDate(date)) {
        return date;
    }

    if (!date) {
        return null;
    }

    if (_.isFunction(Format)) {
        if (/\{\s+\[native code\]/.test(_.toString(Format))) {
            return new Format(date);
        }
        return Format.call(date) || date;
    }

    return moment(date).format(Format) || date;
};
