const mysql = require("mysql2");
const express = require("express");

const paramsDB = {
    host: "pgsha.ru",
    port: "35006",
    user: "soft0069",
    password: "y61cf4vJ",
    database: "soft0069_labrab06"
};

const pool = mysql.createPool(paramsDB);

function get_connection() {
    return mysql.createConnection(paramsDB);
}

const app = express();
const urlencodedParser = express.urlencoded({extended: false});
app.use('/css', express.static(__dirname + '/css'));
app.set("view engine", "hbs");


app.get("/", function(req, res) {
    let query = "SELECT * FROM books";
    pool.query(query, function(err, data) {
        if (err) return console.log(err);
        res.render("index.hbs", {
            books: data
        });
    });
});

app.get("/create", function(req, res) {
    res.render("create.hbs");
});

app.post("/create", urlencodedParser, function (req, res) {
    if (!req.body) return res.sendpublicationDate(400);
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const publicationDate = req.body.publicationDate;
    const rating = req.body.rating;
    let query = "INSERT INTO books (title, author, genre, publicationDate, rating) VALUES (?,?,?,?,?)";
    let params = [title, author, genre, publicationDate, rating];
    pool.query(query, params, function(err, data) {
        if (err) return console.error(err);
        res.redirect("/");
    });
});

app.get("/edit/:id", function(req, res) {
    const id = req.params.id;
    pool.query("SELECT * FROM books WHERE id=?", [id], function(err, data) {
        if (err) return console.error(err);
        res.render("edit.hbs", {
            books: data[0]
        });
    });
});

app.post("/edit", urlencodedParser, function (req, res) {
    if (!req.body) return res.sendpublicationDate(400);
    const id = req.body.id;
    const title = req.body.title;
    const author = req.body.author;
    const genre = req.body.genre;
    const publicationDate = req.body.publicationDate;
    const rating = req.body.rating;
    let query = "UPDATE books SET title=?, author=?, genre=?, publicationDate=?, genre=? WHERE id=?";
    let params = [title, author, genre, publicationDate, genre, id];
    pool.query(query, params, function(err, data) {
        if (err) return console.error(err);
        res.redirect("/");
    });
});

app.post("/delete/:id", function(req, res) {
    const id = req.params.id;
    pool.query("DELETE FROM books WHERE id=?", [id], function(err, data) {
        if (err) return console.log(err);
        res.redirect("/");
    });
});

app.get("/sort/:field.:direct", function(req, res) {
    const field = req.params.field;
    const direct = req.params.direct;
    let query = "SELECT * FROM books ORDER BY " + field + " " + direct;
    pool.query(query, function(err, data) {
        if (err) return console.log(err);
        res.render("index.hbs", {
            books: data
        });
    });
});

app.get("/recover", function(req, res) {
    let query_truncate = "TRUNCATE `books`";
    let query_insert = "INSERT INTO `books` \
    (`id`, `title`, `author`, `genre`, `publicationDate`, `rating`) VALUES \
    (NULL,'1984','???????????? ????????????','????????????????????',1949,8), \
    (NULL,'???????????? ?? ??????????????????','???????????? ????????????????','??????????????',1967,9), \
    (NULL,'?????? ????????????????','???????? ?????????? ????????????','???????????????????? ????????????????',1936,7), \
    (NULL,'?????????????? ?????????????? ????????','?????????? ????????????','????????????????????',1890,7), \
    (NULL,'?????????????????? ??????????','???????????? ????????????','???????????????????? ????????????????',1943,7), \
    (NULL,'?????? ?????????????????? ???? ??????','???????????? ??. ??????????????????','???????????????????? ????????????????',1951,10), \
    (NULL,'???????? ???? ??????????????????????','?????? ????????????????','???????????????????? ????????????????',1957,6), \
    (NULL,'?????????? ????????????????????????','???????????? ????','???????????????????? ????????????????',1960,9), \
    (NULL,'???????????????????????? ?? ??????????????????','?????????? ??????????????????????','?????????????? ????????????????',1866,8), \
    (NULL,'???????? ?? ????????????????','???????????? ????????????????','?????????????????????? ???????????????????? ????????????????????',1982,10), \
    (NULL,'??????????????','???????????? ????????????????','?????????????????????? ???????????????????? ????????????????????',1978,8), \
    (NULL,'??????????','?????????? ??????????????????????','????????????????????',1869,7);";
    
    const conn = get_connection();

    conn.promise()
        .query(query_truncate)
        .then(() => {
            conn.promise()
                .query(query_insert)
                .catch((err) => console.error(err));
        })
        .then(() => {
            conn.promise()
                .query('SELECT * FROM books')
                .then(([data]) => {
                    res.render('index.hbs', {
                        books: data
                    });
                })
        .then(conn.end())
        .catch((err) => console.error(err));
        })
        .catch((err) => console.error(err));
})

app.get("/clear", function(req, res) {
    let query_truncate = "TRUNCATE books";
    
    const conn = get_connection();

    conn.promise()
    .query(query_truncate)
    .then(() => {
        conn.promise()
            .query('SELECT * FROM books')
            .then(([data]) => {
                res.render('index.hbs', {
                    books: data
                });
            })
            .then(conn.end())
            .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

app.listen(3000, function() {
    console.log("?????????????? ???????????? ?????????? ?????????????? - http://localhost:3000/");
    let isWin = process.platform === "win32";
    let hotKeys = isWin? "Ctrl+C": "Ctrl+D";
    console.log(`???????????????????? ???????????? - ${hotKeys}`);
});

//??????????????????: ???????????????? ?????????????????? ????????-31