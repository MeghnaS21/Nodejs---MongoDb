// const fs = require('fs');
const fsPromises = require('fs').promises;
//instead of hard coding the path
const path = require('path');

const fileOps = async ()=>{
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
    
    }catch(err){
        console.log(err);
    }
}








/*

//fs.readFile('./files/starter.txt', 'utf8', (err, data) => {
fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
    if(err) throw err;
    //console.log(data);
    //console.log(data.toString());
    //now put ut68 as 2nd arg
    console.log(data);
})



console.log('Hello...');

fs.writeFile(path.join(__dirname, 'files', 'reply.txt'),'Nice to meet you...', (err) => {
    if(err) throw err;
    //console.log(data);
    //console.log(data.toString());
    //now put ut68 as 2nd arg
    console.log('Write Complete');
    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'),'\n line breaks \n Testing...', (err) => {
        if(err) throw err;
        //console.log(data);
        //console.log(data.toString());
        //now put ut68 as 2nd arg
        console.log('Append Complete');

        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
            if(err) throw err;
            console.log('Rename Complete');
        })
    })
})



//exit on uncaught errors

process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})

*/