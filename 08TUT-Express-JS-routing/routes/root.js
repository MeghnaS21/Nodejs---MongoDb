const express = require('express');
const router = express.Router();
const path = require('path');


router.get('^/$|index(.html)?|index|home', (req, res) => {
    // 1)- in this we are sending text at the index page
    //res.send('hello world') 

    // 2)- res.sendFile('path', root directory) I have sent my index file to / route using express
    // res.sendFile('./views/index.html', {root: __dirname});

    // 3)- node js way 
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
    //HANDLING ERROR:-
    //              WHAT IF USER SEARCHES /INDEX.HTML? EXPRESS HANDLE THESE EXPRESSIONS IN ROUTING

});

router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page.html'); //302 by default
});

module.exports = router;