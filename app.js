const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(
    session({
        secret: 'qwerty',
        store: new FileStore(),
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
        resave: false,
        saveUninitialized: false,
    })
)

const articlesJSON = require('./articles/csvjson.json')
const users = [
    {
      "email": "user1@hotmail.com",
      "pass": "1111",
      "verified": false,
    },
    {
      "email": "user2@gmail.com",
      "pass": "2222",
      "verified": false,
    },
    {
      "email": "user3@i.com",
      "pass": "3333",
      "verified": false,
    },
    {
      "email": "user4@mail.ch",
      "pass": "4444",
      "verified": false,
    },
    {
      "email": "user5@mail.ch",
      "pass": "5555",
      "verified": true,
    },
    
]

require('./js/config-passport')
app.use(passport.initialize())
app.use(passport.session())

app.get('/articles', (req, res) => {
    res.send(articlesJSON)
})

app.get('/admin', (req, res) => {
    res.send("admin page")
})

app.get('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    } 
    if (!user) { 
      // return res.redirect('/login'); 
      return res.send('Укажите правильный email или пароль!'); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); 
      }
      // return res.redirect('/users/' + user.username);
      return res.redirect('/admin');
    });
  })(req, res, next);
})


app.get('/:id', (req, res) => {
    res.send(articlesJSON.find(current => current.SKU == req.params.id))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})