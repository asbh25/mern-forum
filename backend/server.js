const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 5000;
require('./database');

const User = require('./models/User');

app.use(bodyParser.json());
app.use(cors());

app.get('/api', (req, res) => {
    console.log(res);
    res.send('req');
});

app.get('/api/users', (req, res) => {
    User.find()
      .then(users => res.json(users))
      .catch(err => console.log(err))
});
  
app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;

    try{
      let user = await User.create({
        name: name,
        email: email
      });
      console.log(user);
      res.status(201).json(user);
    } catch(err){
        console.log(err);
        res.status(400).json({
            "error": err,
            "message": "Error creating account"
        })
    }
    
    // console.log(newUser);
    // newUser.save()
    //     .then(() => res.json({
    //         message: "Created account successfully"
    //     }))
    //     .catch(err => res.status(400).json({
    //         "error": err,
    //         "message": "Error creating account"
    //     }))
});

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
  
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

// const users = require('./api/users');
// app.use('./api/users', users);




// mongodb+srv://ggandr:<password>@forumcluster.h663z.mongodb.net/<dbname>?retryWrites=true&w=majority
