const _ = require('lodash');

var colors = require('./json/colors.json');

const ts_2 =(colors)
    .map((o, i, arr) => ({
        color: _.keys(o)[0],
        rgb: arr[i][_.keys(o)[0]].slice(0, 3)
    }));
    _.orderBy(colors, ["color"], ["rgb"]);
    
console.table(ts_2);