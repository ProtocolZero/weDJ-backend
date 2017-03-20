
exports.up = (knex) => {
  return knex.schema.createTable('playlist_user', (playlist_user) => {
    playlist_user.increments('id');
    playlist_user.string('role');
    playlist_user.string('u_id').references('email').inTable('user');
    playlist_user.integer('p_id').references('id').inTable('playlist');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('playlist_user');
};
