const express = require('express')
const router = express.Router()
var knex = require('../db/knex')

function play() {
  return knex('playlist')
}
function playID(req, res, id){
  return knex.select('*').from('playlist').join('playlist_user', 'playlist.id', 'playlist_user.p_id' ).where({'playlist_user.u_id': req.user.email, 'playlist.id': id})
}
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
// CREATE
    router.post('/', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), function (req, res){
        play()
				.insert({
            name: req.body.name
        }).returning('id')
        .then(function(result){
            res.send({'id':result[0]})

        })
    })
// READ
    router.get('/', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), function (req, res){
  if (req.user.admin) {
       play().select().then(function (result){
           res.send(result)
       })
  } else {
    res.sendStatus(404)
  }
    })

    router.get('/:id', jwt({
      secret: process.env.AUTH0_CLIENT_SECRET,
      credentialsRequired: true,
      getToken: fromHeaderOrQuerystring
    }), function (req, res){
        var id = req.params.id
         playID(req, res, id).where('playlist.id',
        req.params.id).then(function
        (result){
            res.send(result[0])
        })
    })
// UPDATE
router.put('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), function (req, res){
  var id = req.params.id
    playID(req, res, id)
    .then(function(result1){
      if(result1.length > 0)
      knex('playlist').where('id', id).update(req.body)
      .then(function(result){
        res.send('playlist'+ result + 'was updated')
      })
    }).catch(err => {
        console.log(err)
    })
})

// DELETE
router.delete('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), function (req, res){
    playID().where('playlist.id', req.params.id).del()
    .then(function (result){
        res.send(201);
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router
