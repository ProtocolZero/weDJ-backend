
exports.up = (knex) => {
  return knex.schema.createTable('song', (song) => {
    song.increments('id');
    song.string('name');
    song.string('album_img');
    song.string('URL');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('song');
};
