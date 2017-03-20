
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('playlist_song').del()
    .then(() => {
      // Inserts seed entries
      return knex('playlist_song').insert([
        {
          p_id: 1,
          s_id: 1,
          song_order: 1,
        },
        {
          p_id: 1,
          s_id: 2,
          song_order: 2,
        },
        {
          p_id: 1,
          s_id: 4,
          song_order: 3,
        },
        {
          p_id: 2,
          s_id: 3,
          song_order: 1,
        },
        {
          p_id: 2,
          s_id: 4,
          song_order: 2,
        },
        {
          p_id: 2,
          s_id: 1,
          song_order: 3,
        },
        {
          p_id: 3,
          s_id: 4,
          song_order: 1,
        },
        {
          p_id: 3,
          s_id: 2,
          song_order: 2,
        },
        {
          p_id: 3,
          s_id: 3,
          song_order: 3,
        },
        {
          p_id: 4,
          s_id: 1,
          song_order: 1,
        },
        {
          p_id: 4,
          s_id: 2,
          song_order: 2,
        },
        {
          p_id: 4,
          s_id: 3,
          song_order: 3,
        },
      ]);
    });
};
