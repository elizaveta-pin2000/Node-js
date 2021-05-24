const ut = require('./utils');
const con = ut.get_conn();
const query = "SELECT * FROM data_set \
                WHERE name = (\
                    SELECT name FROM data_set \
                    WHERE count = (\
                        SELECT MAX(count) FROM data_set)) \
                ORDER BY day;";
con.promise()
    .query(query) 
    .then(([rows])=>console.table(rows))
    .catch((err)=>console.error(err))
    .then(con.end());

/*Отображение строк 0 - 24 (100 всего, Запрос занял 0.0210 сек.) [day: 2010-09-30... - 2020-02-13...]
rows - 13843 (без индекса)

Отображение строк 0 - 24 (100 всего, Запрос занял 0.0061 сек.) [day: 2010-09-30... - 2020-02-13...]
rows - 1 (с индексом по count)
*/