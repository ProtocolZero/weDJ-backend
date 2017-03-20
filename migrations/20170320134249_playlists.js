
exports.up = (knex) => {
  return knex.schema.createTable('playlist', (playlist) => {
    playlist.increments('id');
    playlist.string('name');
    playlist.timestamp('date_created').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('playlist');
};
