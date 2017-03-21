const router = require('express').Router()
const knex = require('../db/knex')

//Queries

function getAllRoles() {
  return knex('playlist_user')
}

function getPlaylistByUser(id) {
  return knex('playlist_user').where('u_id', id)
}

function getUsersForPlaylist(id) {
  return knex('playlist_user').where('p_id', id)
}

function createNewPlaylistUser(newUserObj) {
  return knex('playlist_user').insert(newUserObj).returning('*')
}

function updateUserForPlaylist(id, updateObj) {
  return knex('playlist_user').where('p_id', id).update(updateObj, '*')
}

function deleteUserForPlaylist(id) {
  return knex('playlist_user').where('p_id', id).del()
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
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  getUsersForPlaylist(id).then(result => {
    res.json(result)
  })
  .catch(err => {
    console.log(err)
    res.status(503).send(err.message)
  })
})

module.exports = router
