
exports.up = (knex) => {
  return knex.schema.createTable('playlist', (playlist) => {
    playlist.increments('id');
    playlist.string('name');
    playlist.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('playlist');
};
