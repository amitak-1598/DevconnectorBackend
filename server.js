const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
  



const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();
   
// body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// DB Config
const db = require('./config/keys').mongoURI;


// connect to MongoDB
mongoose
   .connect(db)
   .then(() => console.log("Mongodb Connected"))
   .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

// passport Config
require('./config/passport.js')(passport);

// Use Routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const port = process.env.PORT || 5000;

app.listen(port,() => console.log('Server runnning on port ${port}'));

