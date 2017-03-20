
exports.up = (knex) => {
  return knex.schema.createTable('app_user', (user) => {
    user.string('email').unique();
    user.string('username');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('app_user');
};
