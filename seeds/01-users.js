
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('app_user').del()
    .then(() => {
      // Inserts seed entries
      return knex('app_user').insert([
        {
          email: 'ryanj89@gmail.com',
          username: 'rynj',
        },
        {
          email: 'john.sheplerjr@gmail.com',
          username: 'J',
        },
        {
          email: 'be.daria@gmail.com',
          username: 'Daria',
        },
        {
          email: 'gboss0352@gmail.com',
          username: 'Paul',
        },
      ]);
    });
};
