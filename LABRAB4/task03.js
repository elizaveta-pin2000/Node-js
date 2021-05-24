const ut = require('./utils');
const con = ut.get_conn();
const query = "TRUNCATE data_set"
con.promise()
    .query(query) 
    .then(console.log('Данные удалены'))
    .catch((err)=>console.error(err))
    .then(con.end());