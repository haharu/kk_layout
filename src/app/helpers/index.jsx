import _ from 'lodash'

export default function opaqueParser(src) {
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
