const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
var morgan = require('morgan');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const User = require('./userModel');

mongoose.connect('mongodb://localhost/jwt-test', {useMongoClient: true});

// axios.defaults.withCredentials = true;

const corsOptions = {
  "origin": "http://localhost:3000",
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204,
  "credentials": true // enable set cookie
};

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

const sendUserError = (err, res) => {
  res.status(422);
  if (typeof err === 'string') {
    res.json({ err });
    return
  } else if (err && err.message) {
    res.json({
      message: err.message,
      stack: err.stack,
    });
    return;
  }
  res.json(err);
};

// add the routes

app.get('/', (req, res) => {
  res.send('hello i am working');
});

app.get('/setup', (req, res) => {
  const ely = new User({
    username: 'john',
    password: 'alamillo',
  })

  ely.save((err) => {
    if (err) throw err;
    console.log('user has been saved');
    res.json({ sucess: true })
  })
});



// API ROUTES -------------------
var apiRoutes = express.Router();

apiRoutes.post('/authenticate', (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  User.findOne({ username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      sendUserError('user not found', res);
      return;
    }
    if ( user.password != password ) {
      sendUserError('password invalid', res);
      return;
    }
    const token = jwt.sign(user, 'secret', { expiresIn: '1h' }) // jwt.sign(user, secret)
    res.json({ message: 'here is a token', token });
  });
});
// this is the middleware for the token auth
apiRoutes.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    sendUserError('the token was not provided', res);
    return;
  }
  jwt.verify(token, 'secret', (err, decodedToken) => {
    if (err) {
      sendUserError('token not valid', res);
      return;
    }
    req.decoded = decodedToken;
    next();
  });
});

apiRoutes.get('/', (req, res) => {
  res.json({ message: 'we are in the app root'})
})

apiRoutes.get('/showAllUsers', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      // sendUserError(err, res);
      throw err;
      return;
    }
    res.json(users);
  });
});



// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


// show that it works
app.listen(3000, () => {
  console.log('listening on port 3000');
});
