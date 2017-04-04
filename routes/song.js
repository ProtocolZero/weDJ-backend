const router = require('express').Router();
const knex = require('../db/knex');
var jwt = require('express-jwt');
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
// Get all songs
router.get('/', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  if(!!req.user.admin){

  knex('song')
  .then((songs) => {
    res.json(songs);
  });
} else { res.sendStatus(404)}
});

// Get one song
router.get('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}), (req, res) => {
  console.log(JSON.stringify(req.user))
  return knex.select('song.name', 'song.URL', 'song.id', 'song.album_img').from('song').join('playlist_song', 'song.id', 'playlist_song.s_id').join('playlist', 'playlist_song.p_id', 'playlist.id').join('playlist_user', 'playlist.id', 'playlist_user.p_id')
  .where({'song.id': req.params.id, 'playlist_user.u_id': req.user.email})
  .then((song) => {
    if (song.length > 0 ){
    res.json(song[0])
  } else {
    res.sendStatus(404)
  }
  })
});

// Post new song
router.post('/', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}),(req, res) => {

  knex('song')
  .insert(req.body)
  .returning('*')
  .then(function (data) {
    res.json(data)
  })
});

// Update song
router.put('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}),(req, res) => {
  const song = req.body;
  const id = req.params.id;
  return knex.select( 'song.id').from('song').join('playlist_song', 'song.id', 'playlist_song.s_id').join('playlist', 'playlist_song.p_id', 'playlist.id').join('playlist_user', 'playlist.id', 'playlist_user.p_id' )
  .where({'song.id': req.params.id, 'playlist_user.u_id': req.user.email})
  .then((id)=>{
if (id.length > 0){
  knex('song').update(song, '*')
  .then((updatedSong) => {
    res.json(updatedSong);
  });
} else res.send(404)
});
})

// Delete song
router.delete('/:id', jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  credentialsRequired: true,
  getToken: fromHeaderOrQuerystring
}),(req, res) => {
  const id = req.params.id;
  return knex.select( '*').from('song').join('playlist_song', 'song.id', 'playlist_song.s_id').join('playlist', 'playlist_song.p_id', 'playlist.id').join('playlist_user', 'playlist.id', 'playlist_user.p_id' )
  .where({'song.id': req.params.id, 'playlist_user.u_id': req.user.email})
  .then((id2)=>{
if (id2.length > 0){
  knex('song')
  .where('id', id)
  .del()
  .then(() => {
    res.status(204).send();
  });
} else {res.sendStatus(404)}
});
})

module.exports = router;
