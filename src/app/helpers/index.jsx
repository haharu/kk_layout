import _ from 'lodash'

export function opaqueParser(src) {
    let LF = String.fromCharCode(10);
    let EQ = String.fromCharCode(61);
    let COMMA = String.fromCharCode(44);;
    let result = _.reduce(_.split(src, LF), function(rows, value, key) {
        let row = _.split(value, /[,=]/g);
        if (_.size(row) > 1) {
            rows[row[0]] = _.takeRight(row, _.size(row) - 1);
        }
        return rows
    }, {});
    return result;
}

export function chartTranc(src) {
    let result = _.reduce(src, function(rows, value, key) {
        let keyToInt = parseInt(key, 10);
        let valueToFloat = parseFloat(value[0]);
        if (Number.isInteger(keyToInt)) {
            rows.push({x: keyToInt, y: valueToFloat})
        }
        return rows
    }, []);
    return result
}

export function BarChartTranc(src, label = 'label', options) {
    return [
        {
            name: label,
            values: src,
            ...options
        }
    ]
}
