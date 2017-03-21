const router = require('express').Router();
const knex = require('../db/knex');

// Queries
function getAllPlaylistSongs() {
  return knex('playlist_song');
}
function getPlaylistSong(id) {
  return knex('playlist_song').where('id', id);
}
function getPlaylistSongsByPlaylistID(id) {
  return knex('playlist_song').where('p_id', id);
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
router.get('/', (req, res) => {
  getAllPlaylistSongs().then((results) => {
    res.json(results);
  });
});

// Get result by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  if (validId(id)) {
    getPlaylistSong(id).then((results) => {
      res.json(results);
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
});

// Get results by playlist id
router.get('/playlist/:id', (req, res) => {
  const id = req.params.id;
  if (validId(id)) {
    getPlaylistSongsByPlaylistID(id).then((results) => {
      res.json(results);
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
});

// Get related playlists by song id
router.get('/song/:id', (req, res) => {
  const id = req.params.id;
  if (validId(id)) {
    getPlaylistSongsBySongID(id).then((results) => {
      res.json(results);
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
});

// Post new playlist/song relation
router.post('/', (req, res) => {
  const playlistSong = req.body;
  createPlaylistSong(playlistSong).then((newItem) => {
    res.json(newItem);
  });
});

// Update playlist/song relation
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const playlistSong = req.body;
  if (validId(id)) {
    updatePlaylistSong(id, playlistSong).then((updatedItem) => {
      res.json(updatedItem);
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
});

// Delete playlist/song relation
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (validId(id)) {
    deletePlaylistSong(id).then(() => {
      res.status(204).send();
    });
  } else {
    res.status(400).send({ error: 'Bad Request' });
  }
});

module.exports = router;
