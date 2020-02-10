const express = require('express'); 

const cors = require('cors');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.use(cors());

server.get('/', (req, res) => {
    res.send({api: 'up and running'})
})

server.use(express.json()); //needed for POST and PUT/PATCH
//view a list of hubs
server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: 'oops' });
    });
});

server.get('/api/users/:id', (req,res)=> {
    db.findById(req.params.id)
    .then(user =>{
        if (!user){
            res.status(404).jason({errorMessage: 'The user with the specific ID does not exist'})
        } else{
            res.status(200).json(user);
        }
    })
    .catch(error => {
        console.log('error on Get /user', error);
        res.status(500).json({errorMessage: 'The user information could not be retrieved'});
    });
})

server.post('/api/users', (req,res)=>{
    db.insert(req.body)
    .then(user => {
        res.status(201).json(user);
    }).catch(error => {
        console.log("error on POST /user", error);
        res
        .status(400)
        .json({errorMessage: "Please provide name and bio for the user."});
    });

});
server.delete('/api/users/:id', (req, res) => {
    db.remove(req.params.id)
    .then(user => {
        if (!user){ 
            res
            .status(404)
            .json({errorMessage: "The user with the specified ID does not exist."})
        } else{
        res.status(200).json(user);
        }
    })
    .catch(error => {
        console.log("error on DELETE /hubs", error);
        res
        .status(500)
        .json({errorMessage:  "The user could not be removed"});
    });

});

server.put('/api/users/:id', (req,res)=>{
    if (!req.body.name || !req.body.bio ){
        res
        .status(400)
        .json({errorMessage: 'Please provide name and bio for the user'})
    } else {
        db.update(req.params.id,req.body)
        .then(user => {
            if (!user){
                res
                .status(404)
                .json({errorMessge: 'The user with the specified Id does not exist.' })
            } else 
            res
            .status(202)
            .json(user)
        })
    }
    
})

const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));















