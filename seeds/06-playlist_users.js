
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('playlist_user').del()
    .then(() => {
      // Inserts seed entries
      return knex('playlist_user').insert([
        {
          role: 'owner',
          u_id: 'ryanj89@gmail.com',
          p_id: 1,
        },
        {
          role: 'owner',
          u_id: 'john.shepler.jr@gmail.com',
          p_id: 2,
        },
        {
          role: 'owner',
          u_id: 'be.daria@gmail.com',
          p_id: 3,
        },
        {
          role: 'owner',
          u_id: 'gboss0352@gmail.com',
          p_id: 4,
        },
        {
          role: 'collaborator',
          u_id: 'ryanj89@gmail.com',
          p_id: 3,
        },
        {
          role: 'collaborator',
          u_id: 'john.shepler.jr@gmail.com',
          p_id: 4,
        },
        {
          role: 'collaborator',
          u_id: 'be.daria@gmail.com',
          p_id: 1,
        },
        {
          role: 'collaborator',
          u_id: 'gboss0352@gmail.com',
          p_id: 2,
        },
      ]);
    });
};
