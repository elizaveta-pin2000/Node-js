const _ = require('lodash');

const data = require('./json/data')

let res_5 = _
    .sortBy(_
            .zip(data.colors, data.argb)
            .map(arr => _.zipObject(['color', 'hex_name'], arr)),
        a => a.color
    );

    console.log(res_5)