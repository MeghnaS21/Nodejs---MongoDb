const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3500;

//-------------------------------define first route
app.get('^/$|index(.html)?|index|home', (req, res)=>{
    // 1)- in this we are sending text at the index page
    //res.send('hello world') 
   
    // 2)- res.sendFile('path', root directory) I have sent my index file to / route using express
    // res.sendFile('./views/index.html', {root: __dirname});

    // 3)- node js way 
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
    //HANDLING ERROR:-
    //              WHAT IF USER SEARCHES /INDEX.HTML? EXPRESS HANDLE THESE EXPRESSIONS IN ROUTING

});

app.get('/new-page(.html)?', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

//------------------------REDIRECT
app.get('/old-page(.html)?', (req, res)=>{
    res.redirect(301,'/new-page.html'); //302 by default
});

/* NOTE 
There is a simple difference between a 301 and 302 redirect: 
a 301 redirect indicates that a page has permanently moved to a 
new location, meanwhile, a 302 redirect says that the page has
 moved to a new location, but that it is only temporary.
*/

//------------------------ROUTE HANDLERS -> these anonymous or call back func are route handlers
//we can change those and even add more than one in that

app.get('/hello(.html)?', (req, res, next)=>{
    console.log('attempted to load hello.html');
    next(); //next will help to move to next handler

}, (req, res)=>{
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

app.get('/chain(.html)?', [one, two, three] );


app.get('/*', (req, res)=>{
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html',)); 
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

//In nodejs we have to handle the different status code and content types
//where Express do that for us peacefully