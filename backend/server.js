const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./model/user.js');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://tralicom:r1ULAU8iZVWEZZnh@cluster0.1zfel.mongodb.net/tralicomdb?retryWrites=true&w=majority', ()=> console.log('DB Connected'));

app.post('/users', (req, res)=> {
    const user = {
        title: req.body.title,
        brand: req.body.brand,
        image: req.body.image,
        color: req.body.color,
        rating: req.body.rating,
    }
    const userData = new User(user);
    userData.save();
});

app.get('/users', async (req, res)=> {
    const userData = await User.find({});
    res.send(userData);
});

app.delete('/users/:userid', function(req, res) {
    User.findByIdAndDelete(req.params.userid, (err, docs)=> {
        console.log(err);
        console.log(docs);
    });
});

app.listen('8000', ()=> console.log('Server Running...'));

