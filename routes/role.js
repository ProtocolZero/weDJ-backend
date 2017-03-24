const router = require('express').Router()
const knex = require('../db/knex')

//Queries

function getAllRoles() {
  return knex('playlist_user')
}

function getPlaylistByUser(id) {
  return knex('playlist_user')
  .leftJoin('playlist', 'playlist_user.p_id', 'playlist.id')
  .where('u_id', id)
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

function updateUserForPlaylist(id, updateObj) {
  return knex('playlist_user').where('id', id).update(updateObj, '*')
}

function deleteUserForPlaylist(id) {
  return knex('playlist_user').where('id', id).del()
}

//routes

//get all roles
router.get('/', (req, res) => {
  getAllRoles().then(result => {
    res.json(result)
  })
})
//get all playlists for a specific user
router.get('/:id', (req, res) => {
  const id = req.params.id
  getPlaylistByUser(id).then(result => {
    res.json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})

//get all users for a specific playlist
router.get('/playlist/:id', (req, res) => {
  const id = Number(req.params.id)
  getUsersForPlaylist(id).then(result => {
    res.json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})
//add user to a playlist
router.post('/', (req, res) => {
  createNewPlaylistUser(req.body).then(newUser => {
    res.json(newUser)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})
//update user in a playlist
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  updateUserForPlaylist(id, req.body).then(updatedUser => {
    res.json(updatedUser)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})
//delete user from playlist
router.delete('/:id', (req, res) => {
  const id = req.params.id
  deleteUserForPlaylist(id).then(() => {
    res.status(204).send()
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})


module.exports = router
