const router = require('express').Router();
const knex = require('../db/knex');
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
// Queries
function getAllPlaylistSongs() {
  return knex('playlist_song');
}
function getPlaylistSong(id) {
  return knex('playlist_song').where('id', id);
}
function getPlaylistSongsByPlaylistID(id) {
  return knex.select().from('playlist_song').join('song', 'playlist_song.s_id', 'song.id').where('p_id', id);
}
function getPlaylistSongsBySongID(id) {
  return knex('playlist_song').where('s_id', id);
}
function createPlaylistSong(obj) {
  return knex('playlist_song').insert(obj).returning('*');
}
function updatePlaylistSong(id, obj) {
  return knex('playlist_song').where('id', id).update(obj, '*');
}
function deletePlaylistSong(id) {
  return knex('playlist_song').where('id', id).del();
}

// Helper Functions
function validId(id) {
  return !isNaN(id);
}

// Get all results
router.get('/', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  if(!!req.user.admin){
  getAllPlaylistSongs().then((results) => {
    res.json(results);
  });
} else {
  res.sendStatus(404)
}
});

// Get result by id

var jwt = require('express-jwt');

router.get('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = req.params.id;
  knex.select('*').from('playlist_song').join('playlist_user', 'playlist_song.p_id', 'playlist_user.p_id').where({'playlist_user.u_id': req.user.email, 'playlist_song.id': id })
  .then(function(result){
    if (result.length > 0){
  if (validId(id)) {
    getPlaylistSong(id).then((results) => {
      res.json(results);
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
} else {
  res.sendStatus(404)
}
})
});

// Get results by playlist id
router.get('/playlist/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = req.params.id;
  knex.select('*').from('playlist_song').join('playlist_user', 'playlist_song.p_id', 'playlist_user.p_id').where({'playlist_user.u_id': req.user.email, 'playlist_song.p_id': id })
  .then(function(result){
    if (result.length > 0){
  if (validId(id)) {
    getPlaylistSongsByPlaylistID(id).then((results) => {
      res.json(results);
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
} else {
  res.sendStatus(404)
}
});
})
// Get related playlists by song id
router.get('/song/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = req.params.id;
  knex.select('playlist_song.p_id').from('playlist_song').join('playlist_user', 'playlist_song.p_id', 'playlist_user.p_id').where({'playlist_user.u_id': req.user.email, 'playlist_song.s_id': id })
  .then(function(result){
    if (result.length > 0){
  if (validId(id)) {
    getPlaylistSongsBySongID(id).then((results) => {
      res.json(result.filter(function(el , ind , arr){
        return el.s_id == id
      }));
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
} else {
  res.sendStatus(404)
}
});
})

// Post new playlist/song relation
router.post('/', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const playlistSong = req.body;
  createPlaylistSong(playlistSong).then((newItem) => {
    res.json(newItem);
  });
});

// Update playlist/song relation
router.put('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = req.params.id;
  const playlistSong = req.body;
  knex.select('*').from('playlist_song').join('playlist_user', 'playlist_song.p_id', 'playlist_user.p_id').where({'playlist_user.u_id': req.user.email, 'playlist_song.id': id })
  .then(function(result){
    if (result.length > 0){
  if (validId(id)) {
    updatePlaylistSong(id, playlistSong).then((updatedItem) => {
      res.json(updatedItem);
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
} else {
  res.sendStatus(404)
}
})
});

// Delete playlist/song relation
router.delete('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  const id = req.params.id;
  knex.select('*').from('playlist_song').join('playlist_user', 'playlist_song.p_id', 'playlist_user.p_id').where({'playlist_user.u_id': req.user.email, 'playlist_song.id': id })
  .then(function(result){
    if (result.length > 0){
  if (validId(id)) {
    deletePlaylistSong(id).then(() => {
      res.status(204).send();
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
} else {
  res.sendStatus(404)
}
})
});

module.exports = router;
