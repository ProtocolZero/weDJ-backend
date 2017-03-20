
exports.up = (knex) => {
  return knex.schema.createTable('user', (user) => {
    user.string('email').unique();
    user.string('username');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('user');
};
