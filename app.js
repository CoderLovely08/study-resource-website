//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const imgur = require('imgur-uploader');
const loadsh = require("lodash")
const session = require('express-session');
require("dotenv").config();
var async = require('async');


// For MySQL database connection
var mysql = require('mysql');

const { Client } = require("pg");
const { query } = require("express");
const client = new Client({
    host: process.env.ADMIN_HOST,
    user: process.env.ADMIN_USER,
    port: process.env.ADMIN_PORT,
    password: process.env.ADMIN_PASSWORD,
    database: process.env.ADMIN_DATABASE,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
});



// -----------------------------------------------------------
//                    Temporary Section
// -----------------------------------------------------------


// -----------------------------------------------------------

client.connect();
const oneDay = 1000 * 60 * 60 * 24;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: process.env.APP_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
}));

let dsp = 0;

/*-------------------------------------------
                Home route
  -------------------------------------------*/
app.get("/", function (req, res) {
    // Querying all records to display all books
    client.query("Select * from BookData order by book_title", (err, results) => {
        res.render("home", { books: results.rows });
    });
});


/*-------------------------------------------
                Add Book Route
  -------------------------------------------*/
//   This route renders the admin panel for adding new books
app.get("/add", function (req, res) {
    sess = req.session;
    if (sess.isLoggedin) {
        res.render("add");
    } else {
        res.render('admin');
    }
});


app.post("/admin", function (req, res) {
    sess = req.session;
    let username = req.body.username;
    let adminpass = req.body.adminPassword;
    let query = `Select * from AdminInfo where admin_user_name = '${username}' and admin_password= '${adminpass}'`;
    client.query(query, (err, results) => {
        if (err) console.log(err);
        else {
            if (results.rows.length == 1) {
                req.session.isLoggedin = results.rows[0].admin_name;
                req.session.adminId = results.rows[0].admin_id;
                myvar = req.session.adminId;
                res.redirect("/adminView");
            } else {
                res.render('admin');
            }
        }
    });
});


app.get('/adminView', function (req, res) {
    let query = "Select * from BookData order by book_id";
    client.query(query, function (err, results) {
        if (err) console.log(err);
        else {
            let bookDetails = results.rows;
            res.render('adminView', { bookDetails: bookDetails })
        }
    })
})




/*-------------------------------------------
                Upload Route
  -------------------------------------------*/
app.post("/upload", function (req, res) {
    // check if files are not empty
    if (!req.files) {
        return res.status(400).send("No files Found!");
    }
    // if file exists store it in myfile variable
    let myfile = req.files.thumbnail;

    // let uploadPath = __dirname + "/uploads/" + myfile.name;
    // move the file to uploads folder for temp storage
    // if (err) console.log("Error!");

    // upload the moved file to imgur and recieve a callback
    imgur(myfile.data).then(data => {

        // set the attributes based on the response we get
        let bookTitle = req.body.bookTitle;
        let bookRoute = req.body.bookRoute.trim();
        let imageSrc = data.link;  // only this is important for us
        let folderUrl = req.body.bookLink;
        let references = req.body.bookReferences;

        // Check route if exists
        async.series([
            function (callback) {
                console.log("fun1");
                let checkquery = `Select * from BookData where book_route = '${bookRoute}'`;
                client.query(checkquery, (err, results) => {
                    if (err) console.log(err);
                    if (results.rows.length != 0) {
                        console.log("fun10", checkquery, results.rows);
                        callback(true);
                    }
                    else callback();
                });
            },
            function (callback) {
                console.log("fun2");
                // inserting the data into our book database
                let query = `Insert into BookData(book_title, book_route, book_image_src, book_folderlink, admin_id) values('${bookTitle}','${bookRoute}','${imageSrc}','${folderUrl}', ${myvar})`;

                client.query(query, (err, result) => {
                    if (err) console.log(err);
                    callback();
                });
            },
            function (callback) {
                // Inserting references if any by selecting the latest id
                if (references.trim().length != 0) {
                    let query = "Select * from BookData order by book_id desc Limit 1";
                    let latestBookId;
                    client.query(query, (err, result) => {
                        if (err) console.log(err);
                        latestBookId = result.rows[0].book_id;

                        // If admin has provided any reference then insert them all
                        if (references.length != 0 && latestBookId != -1) {
                            let insertQuery = `insert into BookReferences(book_id,book_reference_name,book_reference_link) values`

                            let newItem = references.split(",");
                            for (let i = 0; i < newItem.length; i++) {
                                let eachItem = newItem[i].split("http");
                                eachItem[1] = "http" + eachItem[1];
                                let refName = eachItem[0].trim();
                                let refLink = eachItem[1].trim();
                                insertQuery = insertQuery + `(${latestBookId},'${refName}','${refLink}')`
                                if (i != newItem.length - 1) insertQuery += ","
                            }
                            client.query(insertQuery, (err, result) => {
                                if (err) console.log(err);
                            });
                        }
                        callback();
                    });
                }
            }
        ],
            function (err, result) {
                if (err) { res.render("error"); }
                // redirect admin to the home after inserting and display new updated book
                else if (result) res.redirect("/");
            });

        // removing the file from our temporary uploads folder
    });
});


/*-------------------------------------------
                Display Book Route
  -------------------------------------------*/
app.get("/posts/:postId", function (req, res) {
    // perform linear search for the route 
    // if found just render that page only
    let bookTitle = loadsh.lowerCase(req.params.postId);
    let sqlQuery = `Select BookData.book_id,BookData.book_title,BookData.book_route,BookData.book_image_src,BookData.book_folderlink,AdminInfo.admin_name from BookData,AdminInfo where BookData.admin_id=AdminInfo.admin_id and BookData.book_route='${bookTitle}'`;

    client.query(sqlQuery, (err, results) => {
        client.query(`Select * from BookReferences where book_id = ${results.rows[0].book_id}`, (err, refResult) => {
            res.render("posts", { books: results.rows[0], bookReferences: refResult.rows });
        });
    });
});

// To handle invalid routes
app.use(function (req, res) {
    // Invalid request
    res.render("error");

});

// Starting the app
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000!");
});
