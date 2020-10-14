// import * as articles from './articles/csvjson.json'

const express = require('express')
const app = express()
const port = 3000
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

app.get('/articles', (req, res) => {
    res.send(articlesJSON)
})

app.get('/:id', (req, res) => {
    res.send(articlesJSON.find(current => current.SKU == req.params.id))
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})