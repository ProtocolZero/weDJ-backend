
exports.up = (knex) => {
  return knex.schema.createTable('comment', (comment) => {
    comment.increments('id');
    comment.string('body');
    comment.string('u_id').references('email').inTable('user');
    comment.integer('p_id').references('id').inTable('playlist');
    comment.timestamp('date_created').defaultTo(knex.fn.now()).notNullable();
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('comment');
};
