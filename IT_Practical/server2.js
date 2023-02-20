const http = require('http')
const url = require('url')
const fs = require('fs')
const mysql = require('mysql');
var qs = require('querystring');
const hostname = 'localhost'
const port = 3000
function onRequest(req, res) {
    var baseURL = 'http://' + req.headers.host + '/';
    var myURL = new URL(req.url, baseURL);
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/HTML')
    if (req.url == '/') {
        index(req, res)
    }
    else if (req.url == '/showsignin') {
        showsignin(req, res)
    }
    else if (req.url == '/showsignup') {
        showsignup(req, res)
    }
    else if (req.url == '/dosignin') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            dosignin(req, res, post)
        });
    }
    else if (req.url == '/dosignup') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            dosignup(req, res, post)
        });
    }
    else {
        res.end();
    }
}
function dosignin(req, res, body) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "mydb"
    });
    con.connect(function (err) {
        var username = body.username;
        var password = body.password;
        con.query("SELECT * FROM nasreen where username=? and password=?", [username, password], function (err, result, fields) {
            console.log(result);
            if (err) {
                res.write("failed")
                res.end()
                return;
            };
            if (result.length <= 0) {
                res.write('error');
                res.end();
                return;
            }
            else { // if user found
                res.write("Sign-In successful")
                res.end()
            }
        });
    });
}
function dosignup(req, res, body) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "mydb"
    });
    con.connect(function (err) {
        var cnfrmpass = body.cnfrmpass
        inputData = {
            username: body.username,
            password: body.password
        }
        con.query("SELECT * FROM nasreen where username=?", [inputData.username], function (err, result, fields) {
            console.log(result);
            if (err) {
                res.write("Failed")
                res.end()
                return;
            };
            if (result.length > 0) {
                res.write("Username Already Exist")
                res.end()
            }
            else if (cnfrmpass != inputData.password) {
                res.write("Password & Confirm Password did not Match")
                res.end()
            }
            else {
                con.query("INSERT INTO nasreen SET ?", inputData, function (err, result, fields) {
                    console.log(result);
                    if (err) {
                        res.write("failed")
                        res.end()
                        return;
                    };
                    res.write("Sign-Up successful")
                    res.end()
                });
            }
        });
    });
}
function showsignin(req, res) {
    fs.readFile('signin.html', function (err, data) {
        res.write(data);
        return res.end();
    });
}
function showsignup(req, res) {
    fs.readFile('signup.html', function (err, data) {
        res.write(data);
        return res.end();
    });
}
function index(req, res) {
    fs.readFile('index.html', function (err, data) {
        res.write(data);
        return res.end();
    });
}
const server = http.createServer(onRequest)
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})
