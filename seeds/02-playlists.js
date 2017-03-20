
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('playlist').del()
    .then(() => {
      // Inserts seed entries
      return knex('playlist').insert([
        {
          name: "RJ's playlist",
        },
        {
          name: "J's playlist",
        },
        {
          name: "Daria's playlist",
        },
        {
          name: "Paul's playlist",
        },
      ]);
    });
};
