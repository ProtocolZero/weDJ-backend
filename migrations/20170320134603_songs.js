
exports.up = (knex) => {
  return knex.schema.createTable('song', (song) => {
    song.increments('id');
    song.string('name');
    song.string('artist_name');
    song.string('album_name');
    song.string('album_URL');
    song.string('URL');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('song');
};
