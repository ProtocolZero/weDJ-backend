const router = require('express').Router();
const knex = require('../db/knex');

// Get all songs
router.get('/', (req, res) => {
  knex('song')
  .then((songs) => {
    res.json(songs);
  });
});

// Get one song
router.get('/:id', (req, res) => {
  knex('song')
  .where('id', req.params.id)
  .first()
  .then((song) => {
    res.json(song)
  })
});

// Post new song
router.post('/', (req, res) => {
  knex('song')
  .insert(req.body)
  .returning('*')
  .then(function (data) {
    res.json(data)
  })
});

// Update song
router.put('/:id', (req, res) => {
  const song = req.body;
  const id = req.params.id;
  knex('song')
  .where('id', id)
  .update(song, '*')
  .then((updatedSong) => {
    res.json(updatedSong);
  });
});

// Delete song
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  knex('song')
  .where('id', id)
  .del()
  .then(() => {
    res.status(204).send();
  });
});

module.exports = router;
