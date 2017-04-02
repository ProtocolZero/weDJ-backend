const express = require('express')
const router = express.Router()
var knex = require('../db/knex')
var jwt = require('express-jwt')
function fromHeaderOrQuerystring (req) {
  console.log(req.headers)
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    console.log(req.headers.authorization.split(' ')[1])
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}
function User(){
    return knex('app_user')
}
// CREATE
    router.post('/', function (req, res){
        User().insert({
            email: req.body.email,
            username: req.body.username
        })
        .then(function(){
            res.sendStatus(201)
        })
    })
// READ
    router.get('/', jwt({
      secret: process.env.AUTH0_CLIENT_SECRET,
      credentialsRequired: true,
      getToken: fromHeaderOrQuerystring
    }), function (req, res){
      if (!!req.user.admin){
     User().select().then(function (result){
           res.send(result)
       })
     } else {res.send(404)}
    })

    router.get('/:email', jwt({
      secret: process.env.AUTH0_CLIENT_SECRET,
      credentialsRequired: true,
      getToken: fromHeaderOrQuerystring
    }), function (req, res){
console.log(req.user.email)
        User().where('email',
        req.user.email).then(function
        (result){
            res.send(result)

        })
    })
// UPDATE
router.put('/:email', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), function (req, res){
    User().where('email', req.user.email)
    .update({
        username: req.body.username
    },'email').then(function(result){
      if (result.length> 0){
        res.send(result)
      } else {
        res.sendStatus(404)
      }
    }).catch(err => {
        console.log(err)
    })
})

// DELETE
router.delete('/:email', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), function (req, res){
    User().where('email', req.user.email).del()
    .then(function (result){
      if (result.length> 0){
        res.send(201)
      } else {
        res.sendStatus(404)
      }
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router
