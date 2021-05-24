const ut = require('./utils');
let data = ut.csv_to_json('./data_set.csv');
let rows = data.map(item=>Object.values(item));
const con = ut.get_conn();
const query = "INSERT INTO data_set(day,city,name,count) VALUES ?"
con.promise()
    .query(query, [rows]) 
    .then(console.log('Данные добавлены'))
    .catch((err)=>console.error(err))
    .then(con.end());