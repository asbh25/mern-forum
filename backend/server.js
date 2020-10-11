const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
const PORT = process.env.PORT || 5000;
require('./database');

app.use(bodyParser.json());
app.use(cors());

const users = require('./api/users');
app.use('./api/users', users);

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

// mongodb+srv://ggandr:<password>@forumcluster.h663z.mongodb.net/<dbname>?retryWrites=true&w=majority
