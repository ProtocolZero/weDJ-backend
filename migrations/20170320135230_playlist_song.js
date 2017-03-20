
exports.up = (knex) => {
  return knex.schema.createTable('playlist_song', (playlist_song) => {
    playlist_song.increments('id');
    playlist_song.integer('p_id').references('id').inTable('playlist');
    playlist_song.integer('s_id').references('id').inTable('song');
    playlist_song.integer('song_order');
    playlist_song.integer('likes').defaultTo(0);
    playlist_song.integer('dislikes').defaultTo(0);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('playlist_song');
};
