const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');




const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '9966',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data =>{
	console.log(data);
});

const app = express();
app.use(express.json());
app.use(cors());



app.get('/', (req, res) => { res.send('success') })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})


app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })


app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })


app.put('/image', (req, res,) => { image.handleImage(req, res, db) })

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })


 
let PORT1 = process.env.PORT || 5000;

app.listen(PORT1, () => {
  console.log(`Listening on ${ PORT1 }`);
});