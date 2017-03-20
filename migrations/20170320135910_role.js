
exports.up = (knex) => {
  return knex.schema.createTable('role', (role) => {
    role.increments('id');
    role.string('role');
    role.string('u_id').references('email').inTable('user');
    role.integer('p_id').references('id').inTable('playlist');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('role');
};
