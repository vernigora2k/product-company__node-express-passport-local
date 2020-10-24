const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
const corsOptions = {
  origin: 'http://localhost:8080',
  credentials:  true
}
app.use(require('cors')(corsOptions))

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
app.use(passport.session({
  cookie: {secure: false}
}))

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    } 
    if (!user) { 
      console.log(user)
      // return res.redirect('/login'); 
      return res.send({wrong_email_or_pass: 'Укажите правильный email или пароль!'}); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); 
      }
      // return res.redirect('/users/' + user.username);
      // return res.redirect('/articles');
      return res.send({success: `Вы вошли в вашу учечную запись ${user.email}`}); 
    });
  })(req, res, next);
})

const auth = (req, res, next) => {
  console.log('req')
  console.log(req.isAuthenticated())
  if (req.isAuthenticated()) {
    next()
  } else {
    return res.redirect('/')
  }
}

app.get('/', (req, res) => {
    res.send('base page')
})

// app.get('/articles', auth, (req, res) => {
//     res.send(articlesJSON)
// })
app.get('/articles', auth, (req, res) => {
    res.send(articlesJSON)
})

app.get('/admin', auth, (req, res) => {
  res.send("admin page")
})

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); 
  });
});

app.get('/:id', (req, res) => {
    res.send(articlesJSON.find(current => current.SKU == req.params.id))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})






// const express = require('express');
// const session = require('express-session');
// const FileStore = require('session-file-store')(session);
// const passport = require('passport');

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(
//   session({
//     secret: 'hghtyNN23h',
//     store: new FileStore(),
//     cookie: {
//       path: '/',
//       httpOnly: true,
//       maxAge: 60 * 60 * 1000,
//     },
//     resave: false,
//     saveUninitialized: false,
//   })
// );

// require('./js/config-passport');
// app.use(passport.initialize());
// app.use(passport.session());

// app.get('/', (req, res) => {
//   console.log(req.session);
//   res.send('Hello World!');
// });

// app.post('/login', (req, res, next) => {
//   passport.authenticate('local', function(err, user) {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.send('Укажите правильный email или пароль!');
//     }
//     req.logIn(user, function(err) {
//       if (err) {
//         return next(err);
//       }
//       return res.redirect('/admin');
//     });
//   })(req, res, next);
// });

// const auth = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     return res.redirect('/');
//   }
// };

// app.get('/logout', function (req, res){
//   req.session.destroy(function (err) {
//     res.redirect('/'); //Inside a callback… bulletproof!
//   });
// });

// // app.get('/logout', (req, res) => {
// //   req.logout();
// //   res.redirect('/');
// // });

// // app.get('/logout', function(req, res){
// //   req.logout();
// //   res.redirect('/');
// // });

// app.get('/admin', auth, (req, res) => {
//   res.send('Admin page!');
// });


// app.listen(port, () => console.log(`Example app listening on port ${port}!`));