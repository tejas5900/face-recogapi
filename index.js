const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'password',
      database : 'smartbrain'
    }
  });

db.select('*').from('userinfo').then(data=>
    {
        console.log(data);
    });

const app=express();
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req,res)=>{ 
  res.send('it is working')}
   )
app.post('/signin',(req,res) =>{ signin.handleSignin( req , res , db , bcrypt )})
app.post('/register',(req,res)=>{ register.handleRegister( req , res , db , bcrypt)})
app.get('/profile/:id', (req,res)=>{ profile.handleProfile( req , res , db )})
app.post('/image',(req,res)=>{ image.handleImage( req , res, db)  })
app.post('/imageurl',(req,res)=>{ image.handleApi( req , res)  })

app.listen(porcess.env.PORT || 5000,()=>{
    console.log("App is working on port 5000");
})