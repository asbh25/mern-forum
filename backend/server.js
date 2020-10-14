const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 5000;
require('./database');

const Comment = require('./models/Comment');

app.use(bodyParser.json());
app.use(cors());

app.get('/api', (req, res) => {
    console.log(res);
    res.send('req');
});

app.get('/api/comments', (req, res) => {
    Comment.find()
      .then(comm => {
          res.json(comm); console.log('get request works fine');
        })
      .catch(err => console.log(err))
});
  
app.post('/api/comments', async (req, res) => {
    const { name, comment, createdAt } = req.body;

    console.log(name, comment);

    try{
      let comm = await Comment.create({
        name: name,
        comment: comment,
        createdAt: createdAt
      });
      console.log(comm);
      res.status(201).json(comm);
    } catch(err){
        console.log(err);
        res.status(400).json({
            "message": "Error creating account"
        })
    }
});

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
  
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
