
//install node package globally
//  1- npm i nodemon -g 

// initialise npm in a folder
// npm init

//dependency package -- (production)
//1) date-fns
//2) uuid

const {format} = require('date-fns');
const {v4:uuid} = require('uuid');

console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'))

//add nodemon as (dev) dependency---->> npm i nodemon -D
// uninstall (dev) dependency--->  npm rm nodemon -D

console.log(uuid())
console.log()

//"uuid": "^8.3.2" - catch symbol- go and update minor as well as patch version
//"uuid": "~8.3.2" - tilde symbol- go and update only patch 
//"uuid": "*"      - Go and update everything 