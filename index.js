const express = require('express');

const server = express();

const shortid = require('short-id');
//console.log(shortid.generate());

//middleware
server.use(express.json());

//endpoints
server.get('/', (req, res) => {
    res.json({ api: 'project running......'});
})


//USERS
const users = [
    {
        id: 1,
        name: "Jane Doe", // String, required
        bio: "Not Tarzan's Wife, another Jane",  // String, required
    },
    {
        id: 2,
        name: "Naomi Torres",
        bio: "Daniel's wife, mom of three dogs"
    },
    {
        id: 3,
        name: "Melissa Priest",
        bio: "My mother, has four children"
    }

];

server.get('/api/users', (req, res) => {
    res.json(users);

    if(users) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." });
    }

});

server.get('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id == id);

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }

    if(users) {
        res.status(200).json(users);
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    }

});

server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    users.push(userInfo);
    res.status(201).json(users);
    
});

const port = 5000;
server.listen(port, () => console.log(`\n=== api on port ${port} ===\n`));
