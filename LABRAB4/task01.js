const ut = require('./utils');
const con = ut.get_conn();
const query = 'CREATE TABLE soft0069_labrab04.data_set (\
                id INT NOT NULL AUTO_INCREMENT , \
                day DATE NOT NULL , \
                city VARCHAR(255) NOT NULL , \
                name VARCHAR(255) NOT NULL, \
                count INT NOT NULL , \
                PRIMARY KEY (`id`)\
                );';
con.promise()
    .query(query) 
    .then(console.log('Таблица создана'))
    .catch((err)=>console.error(err))
    .then(con.end());