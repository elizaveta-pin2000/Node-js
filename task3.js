const _ = require('lodash');

var users = require('./json/users.json');

const ts_3 = _.flow(
    (users) => _.filter(users, u => Number(u.address.geo.lat) < 0),
    (users) => _.map(users, u => ({
        id: u.id,
        username: u.username,
        city: u.address.city,
    })),
    (users) => _.orderBy(users, ["username"], ["city"], ["asc"])
)(users);

console.table(ts_3);