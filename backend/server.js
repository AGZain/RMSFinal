const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const app = express();
const jwt = require('jsonwebtoken');
const server = http.createServer(app);
const authMiddleware = require('./authMiddleware');
const mysql = require('mysql');
const async = require('async');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
process.on('uncaughtException', function (err) {
    console.log(err);
}); 
var connection = mysql.createConnection({
    host: "localhost",
    user: "uoit",
    password: "uoit"
    });

    connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

function checkAuth(req,res,next){
    var token = req.headers['auth'];
    if(token){
        console.log(token);
        console.log("good token")
        var decoded = jwt.decode(token, 'secret');
        console.log(decoded);
        next();
    }
    else{
        console.log("bad token")
    }
}
app.post('/api/checkOut',(req,res) => {
    var cart = req.body.cart;
    var cartPrices = req.body.cartPrices;
    var employeeId = parseInt(req.body.employee);
    var totalQty = 0;
    var totalCost = 0;
    console.log(employeeId);
    console.log(cart);
    for (let item in cart){
        if(cart.hasOwnProperty(item)){
            console.log(`${item} : ${cart[item]}`)
            console.log(cartPrices[item]);
            totalQty += (cart[item]);
            totalCost += cart[item]*cartPrices[item];
        }
     }

    query = "INSERT INTO retail_store.transactions (Employee_no,Total_amount_sold, Total_qty) VALUES (" + employeeId + ", " + totalCost + ", " + totalQty+");";

    connection.query(query, function (err, result) {
        console.log(result);
        connection.query("SELECT LAST_INSERT_ID();", function (err1,rez){
            var transasctionNum = rez[0]['LAST_INSERT_ID()'];
            for (let item in cart){
                if(cart.hasOwnProperty(item)){
                    console.log(`${item} : ${cart[item]}`)
                    console.log(cartPrices[item]);
                    totalCost = cart[item]*cartPrices[item];
                    newQuery = "INSERT INTO retail_store.items_sold VALUES(" + item + ", " + transasctionNum + ", " + cartPrices[item] + ", " + cart[item] + ", " + totalCost + ");"
                    connection.query( newQuery, function (err2,rez2){
                        console.log(rez2);
                    });
                    newQuery = "UPDATE retail_store.inventory SET Quantity = Quantity - " + cart[item] + " WHERE Item_no = " + item + ";";
                    connection.query( newQuery, function (err2,rez2){
                        console.log(rez2);
                    });
                }
             }

        });
    }); //for query
     
     
});
app.post('/api/checkItemExistence',(req,res)=>{
    var itemNumber = req.body.itemNumber;
    console.log("itemNumber is: " + itemNumber);
    query = "SELECT Name, Unit_price FROM retail_store.inventory WHERE Item_no = " + itemNumber + ";";
   
    connection.query(query, function (err, result) {
        var isSuccess = 'true';
        console.log(result);
        if (result.length == 0){
            isSuccess = 'false'
        }
        res.json({
            success:isSuccess,
            qresult: result
        });
    }); //for query

});


app.post('/api/clockIn', (req,res)=>{
    console.log(Date.now());
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    } 
    if (mm < 10) {
    mm = '0' + mm;
    } 
    var today = mm + '-' + dd + '-' + yyyy;


    var time = new Date();

    var hour = time.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = time.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = time.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var time = hour + ":" + min + ":" + sec;
    console.log("time is: " + time);
    var query = "INSERT INTO retail_store.timesheet VALUES(1000,'" + today + "', '"+ time +"', null);";
    console.log(query);
    connection.query(query, function (err, result) {
        console.log('done');
        console.log(result);
     //   console.log("Result: " + result.length);// result[0]['Fname'] + "  " + result.length);
    }); //for query
});

app.post('/api/clockOut',(req,res)=>{
    console.log(Date.now());
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    } 
    if (mm < 10) {
    mm = '0' + mm;
    } 
    var today = mm + '-' + dd + '-' + yyyy;

    var time = new Date();

    var hour = time.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = time.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = time.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var time = hour + ":" + min + ":" + sec;
    console.log("time is: " + time);

    console.log(today);
    var query = "UPDATE retail_store.timesheet SET Cout = '"+ time +"' WHERE Employee_no = 1000 AND Date = '" + today + "';";
    console.log(query);
    connection.query(query, function (err, result) {
        console.log('done');
        console.log(result);
     //   console.log("Result: " + result.length);// result[0]['Fname'] + "  " + result.length);
    }); //for query
});
app.get('/',(req,res)=>{
    res.send("thanks for coming");
});

app.post('/api/getAdminView',(req,res)=>{
    var adminView = req.body.adminView;
    console.log("Getting admin view: " + adminView);
    var query = "";
    if (adminView == "view2"){
        query = "SELECT * FROM retail_store.transactions WHERE Employee_no IN (SELECT Employee_no FROM retail_store.employee WHERE Salary >= 15000);";
    }else if (adminView == "view3"){
        query = "SELECT Fname, Lname, Salary FROM retail_store.employee WHERE salary > (SELECT AVG(salary) FROM retail_store.employee);";
    }else if (adminView == "view10"){
        query = "SELECT * FROM retail_store.transactions;"
    }else if(adminView == "view8"){
        query = "SELECT Fname, Lname, Bdate, Address, Gender, Salary, Employee_no, Admin FROM retail_store.employee;"
    }else if(adminView == "view6"){
        query = "SELECT employee.Employee_no, employee.Fname, employee.Lname, timesheet.date FROM retail_store.employee, retail_store.timesheet WHERE employee.Employee_no=timesheet.Employee_no ORDER BY employee.Employee_no;";
    }else if(adminView == "view7"){
        query = "SELECT * FROM retail_store.timesheet;";
    }else if(adminView == "view4"){
        query = "SELECT * FROM retail_store.employee INNER JOIN retail_store.transactions ON employee.Employee_no = transactions.Employee_no;;";
    }
    
    console.log(query);
    //query = "SELECT * FROM retail_store.transactions;";
    connection.query(query, function (err, result) {
        console.log(query);
        
      //  console.log("Result: " + result.length);// result[0]['Fname'] + "  " + result.length);
        console.log(result);
        res.json({
            success:'true',
            qresult: result
        });
    }); //for query

});

app.get('/api/checkAlreadyAuth', checkAuth,(req,res)=>{
    console.log("passed");
});
app.post('/api/addItemToDB',(req,res)=>{
    console.log("adding item to fb");
    const itemNumber = parseInt(req.body.itemNumber);
    const itemName = req.body.itemName;
    const itemQuantity = req.body.itemQuantity;
    const itemPrice = req.body.itemPrice;

    console.log(itemNumber);
    console.log(itemName);
    console.log(itemQuantity);
    console.log(itemPrice);

    var query = "INSERT INTO retail_store.inventory VALUES(" + itemNumber + ", '" + itemName + "', '" + itemQuantity + "', '" + itemPrice + "');";
    console.log(query);
    var dropQuery = "DELETE FROM retail_store.inventory WHERE Item_no = " + itemNumber + ";"
    connection.query(dropQuery, function(err1,results1){
        connection.query(query, function (err, result) {
            console.log('done');
            console.log(result);
         //   console.log("Result: " + result.length);// result[0]['Fname'] + "  " + result.length);
        }); //for query
    });
    
    
});

app.post('/api/getItemsFromInventory',(req,res)=>{
    var view = req.body.view;
    console.log("getting all items");
    if (view == "view9"){
        query = "SELECT * FROM retail_store.inventory;";
    }else if (view == "view5"){
        query = "SELECT inventory.item_no, inventory.unit_price FROM retail_store.inventory WHERE inventory.quantity < 25 UNION SELECT items_sold.item_no, items_sold.unit_price FROM retail_store.items_sold;";
    }
    connection.query(query, function (err, result) {
        
        console.log("Result: " + result.length);// result[0]['Fname'] + "  " + result.length);
        res.json({
            success:'true',
            qresult: result
        });
    }); //for query
});

app.post('/api/auth',(req,res)=>{
    console.log("here")
    const email = parseInt(req.body.email);
    const pass = req.body.password;
    var fakeEmail = "abcd@gmail.com";
    var fakePass = "password";
    var query = "";
    var success = false;
    console.log(email);
    query = "SELECT * FROM retail_store.employee WHERE Employee_no='" + email + "' AND password='" + pass + "';";
    connection.query(query, function (err, result) {
        var admin = false;
        if (err) throw err;
        if (result.length > 0){
            console.log("changing state")
            success = true;
            if (result[0]['Admin'] == 'Y'){
                admin = true;
            } 
        }
        console.log("Result: " + result.length);// result[0]['Fname'] + "  " + result.length);
    
        console.log(success);
        console.log("here we login");
        if (success == true ){
            console.log("hereeeeeeee");
            var token = jwt.sign(
                {email:email},
                'secret',
                {expiresIn: '24h'}
            );
            res.json({
                message:"Loggedin!",
                success:'true',
                employeeNo: email,
                //token: token,
                Admin: admin
            });
        }else{
            res.json({
                success:'false'
            });
        }
    }); //for query
});

server.listen(3001);
console.log('server is running on %s',server.address().port);

