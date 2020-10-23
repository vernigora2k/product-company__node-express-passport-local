const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

  const users = [
    { 
      id: 1,
      email: "user1@hotmail.com",
      password: "1111",
      verified: false,
    },
    {
      id: 2,
      email: "user2@gmail.com",
      password: "2222",
      verified: false,
    },
    {
      id: 3,
      email: "user3@i.com",
      password: "3333",
      verified: false,
    },
    {
      id: 4,
      email: "user4@mail.ch",
      password: "4444",
      verified: false,
    },
    {
      id: 5,
      email: "user5@mail.ch",
      password: "5555",
      verified: true,
    },
    
]
const userDB = {
  id: 1,
  email: 'test@mail.ru',
  password: '123'
}

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
    console.log(email)
    console.log(password)
    return done(null, users.find(current => current.email == email && current.password == password))
  }
));