const express = require('express'); //import express
const app = express();  //instance of express in server-app
const path = require('path'); //import path
const cors = require('cors'); 
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

//----------------------------------------------custom middleware logger
app.use(logger);

const whitelist = ['https://www.google.com', 'http://127.0.0:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));//cross origin resource share
//-----------------------------------------------built-in middleware to handle urlencoded data
// in other words. form data:
// 'content-type: application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false }));

//built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));


//-----------------------------------------------define first route
app.get('^/$|index(.html)?|index|home', (req, res) => {
    // 1)- in this we are sending text at the index page
    //res.send('hello world') 

    // 2)- res.sendFile('path', root directory) I have sent my index file to / route using express
    // res.sendFile('./views/index.html', {root: __dirname});

    // 3)- node js way 
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    //HANDLING ERROR:-
    //              WHAT IF USER SEARCHES /INDEX.HTML? EXPRESS HANDLE THESE EXPRESSIONS IN ROUTING

});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

//----------------------------------------------------REDIRECT
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 by default
});

/* NOTE 
There is a simple difference between a 301 and 302 redirect: 
a 301 redirect indicates that a page has permanently moved to a 
new location, meanwhile, a 302 redirect says that the page has
 moved to a new location, but that it is only temporary.
*/

//----------------------------------------------------ROUTE HANDLERS -> these anonymous or call back func are route handlers
//we can change those and even add more than one in that

app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next(); //next will help to move to next handler

}, (req, res) => {
    res.send('Hello world');
})



//------------------------CHAINING ROUTE HANDLERS

const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res, next) => {
    console.log('three');
    res.send('Finished!');
}

app.get('/chain(.html)?', [one, two, three]);

//app.use('/') for middlewares, app all to all http methods

app.all('/*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html',));
    } else if(req.accepts('json')){
        res.json({ error: "404 Not Found"});
    } else{
        res.type('txt').send("404 Not Found")
    }
    
})

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//In nodejs we have to handle the different status code and content types
//where Express do that for us peacefully