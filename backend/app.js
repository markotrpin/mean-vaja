
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');


const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');


const app = express();
//mongodb+srv://trpo:6xgqmkFkQWrhKuY0@cluster0.w2ypj.mongodb.net/trpo


mongoose.connect('mongodb+srv://gringo:AsHYPKBMnL8TIP0R@cluster0.eruih.mongodb.net/myFirstDatabase')
.then(()=>{
  console.log('connected to databse');
})
.catch(()=>{
  console.log('conection failed');
});

app.use(bodyParser.json());

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
