const ut = require('./utils');
const con = ut.get_conn();
const query = "SELECT * FROM data_set WHERE name = 'laura abc'"
con.promise()
    .query(query) 
    .then(([rows])=>console.table(rows))
    .catch((err)=>console.error(err))
    .then(con.end());

/*  Отображение строк 0 - 0 (1 всего, Запрос занял 0.0130 сек.)
SELECT * FROM data_set WHERE name = 'laura abc';
rows - 13843 (без индекса)

Отображение строк 0 - 0 (1 всего, Запрос занял 0.0015 сек.)
SELECT * FROM data_set WHERE name = 'laura abc';
rows - 1 (с индексом по name)*/