const usersDB = {
    user: require('../model/users.json'),
    setUser: function (data) {
        this.user == data
    }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are requiredd' })
    //check for duplicate usernames in the db
    const duplicate = usersDB.user.find(person => person.username === user);
    if(duplicate) return res.sendStatus(409); //conflict
    try{
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = {"username": user, "password": hashedPwd};
        usersDB.setUser([...usersDB.user, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.user)
        );
        console.log(usersDB.user);
        res.status(201).json({'success': `New user ${user} created!`})
    }catch(err){
        res.status(500).json({'message': err.messsage});
    }
}

module.exports = {handleNewUser};