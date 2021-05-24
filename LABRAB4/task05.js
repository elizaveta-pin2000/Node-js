const ut = require('./utils');
const con = ut.get_conn();
const query = "SELECT COUNT(*) FROM data_set"
con.promise()
    .query(query) 
    .then(([rows])=>console.table(rows))
    .catch((err)=>console.error(err))
    .then(con.end());