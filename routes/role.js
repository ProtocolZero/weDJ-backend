const router = require('express').Router()
const knex = require('../db/knex')

//Queries
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

function getAllRoles() {
  return knex('playlist_user')
}

function getPlaylistByUser(req, res, id) {
  return knex('playlist_user')
  .leftJoin('playlist', 'playlist_user.p_id', 'playlist.id')
  .where('u_id', req.user.email)
  .select(
    'playlist.name as title',
    'playlist_user.role as role',
    'playlist.id as id'
  )
}

function getUsersForPlaylist(id) {
  return knex('playlist_user').where('p_id', id)
}

function createNewPlaylistUser(newUserObj) {
  return knex('playlist_user').insert(newUserObj).returning('*')
}

function updateUserForPlaylist(res, req, id, updateObj) {
  return knex('playlist_user').where({'id': id, 'u_id': req.user.email}).update(updateObj, '*')
}

function deleteUserForPlaylist(id) {
  return knex('playlist_user').where('id', id).del()
}

//routes

//get all roles
router.get('/', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  if (req.user.admin){
  getAllRoles().then(result => {
    res.json(result)
  })
} else {res.sendStatus(404)}
})
//get all playlists for a specific user
router.get('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = req.params.id
  getPlaylistByUser(req, res, id).then(result => {
    res.json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})

//get all users for a specific playlist
router.get('/playlist/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = Number(req.params.id)
  knex.select('u_id').from('playlist_user').where({'playlist_user.u_id': req.user.email, 'playlist_user.p_id': id})
  .then(function(data){
    if (data.length > 0){
      getUsersForPlaylist(id).then(result => {
        res.json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(503).send(err.message)
      })
    } else {
      res.sendStatus(404)
    }
  })

})
//add user to a playlist
router.post('/', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  createNewPlaylistUser(req.body).then(newUser => {
    res.json(newUser)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})
//update user in a playlist
router.put('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = Number(req.params.id)
  updateUserForPlaylist(res, req, id, req.body).then(updatedUser => {
    res.json(updatedUser)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})
//delete user from playlist
router.delete('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = req.params.id
  deleteUserForPlaylist(res, req, id).then(() => {
    res.status(204).send()
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})


module.exports = router
