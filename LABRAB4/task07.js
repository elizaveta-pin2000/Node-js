const ut = require('./utils');
const con = ut.get_conn();
const query = "SELECT id, DATE_FORMAT(day, '%Y.%m.%d') AS 'date', city, name, count FROM data_set ORDER BY count DESC LIMIT 20;";
con.promise()
    .query(query) 
    .then(([rows])=>console.table(rows))
    .catch((err)=>console.error(err))
    .then(con.end());