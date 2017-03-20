
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('comment').del()
    .then(() => {
      // Inserts seed entries
      return knex('comment').insert([
        {
          body: 'This playlist is sick!',
          u_id: 'ryanj89@gmail.com',
          p_id: 3,
        },
        {
          body: 'Needs more Taylor Swift...',
          u_id: 'gboss0352@gmail.com',
          p_id: 1,
        },
        {
          body: 'I love this song!',
          u_id: 'be.daria@gmail.com',
          p_id: 2,
        },
        {
          body: 'This is awful!',
          u_id: 'john.shepler.jr@gmail.com',
          p_id: 4,
        },
      ]);
    });
};
