const router = require('express').Router()
const knex = require('../db/knex')
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
//Queries

function getAllComments() {
  return knex('comment')
}

function getCommentById(id) {
  return knex('comment').where('id', id)
}

function getCommentByPlaylist(pId) {
  return knex('comment').where('p_id', pId)
}

function createNewComment(newComment) {
  return knex('comment').insert(newComment).returning('*')
}

function updateComment(id, newCommentObj) {
  return knex('comment').where('id', id).update(newCommentObj, '*')
}

function deleteComment(id) {
  return knex('comment').where('id', id).del()
}

//routes
//get all comments
router.get('/', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  getAllComments().then(result => {
    res.json(result)
  })
})
//get one comment
router.get('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = Number(req.params.id)
  getCommentById(id).then(result => {
    res.json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})
//get all comments for playlist
router.get('/playlist/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const pId = Number(req.params.id)
  getCommentByPlaylist(pId).then(result => {
    res.json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})
//create new comment
router.post('/', (req, res) => {
  createNewComment(req.body).then(newComment => {
    res.json(newComment)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})
//update comment
router.put('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = Number(req.params.id)
  updateComment(id, req.body).then(updatedComment => {
    res.json(updatedComment)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})

//delete comment
router.delete('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = Number(req.params.id)
  deleteComment(id).then(() => {
    res.status(204).send()
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})

module.exports = router
