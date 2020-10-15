const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  const users = [
    { 
      "id": 1,
      "email": "user1@hotmail.com",
      "pass": "1111",
      "verified": false,
    },
    {
      "id": 2,
      "email": "user2@gmail.com",
      "pass": "2222",
      "verified": false,
    },
    {
      "id": 3,
      "email": "user3@i.com",
      "pass": "3333",
      "verified": false,
    },
    {
      "id": 4,
      "email": "user4@mail.ch",
      "pass": "4444",
      "verified": false,
    },
    {
      "id": 5,
      "email": "user5@mail.ch",
      "pass": "5555",
      "verified": true,
    },
    
]

passport.serializeUser(function(user, done) {
  console.log('serialization ', user)
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  console.log('deserialization ', id)
  const user = users.find(current => current.id == id) 
  done(null, user)
})

passport.use(new LocalStrategy({usernameField: 'email'},
  function(email, password, done) {
    return done(null, users.find(current => current.email == email))
  }
));