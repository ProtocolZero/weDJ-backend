
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('song').del()
    .then(() => {
      // Inserts seed entries
      return knex('song').insert([
        {
          name: 'SpottieOttieDopaliscious',
          artist_name: 'Outkast',
          album_name: 'Aquemini',
          album_img: 'https://i.scdn.co/image/ea975d1ebda8f229d3fa1c9b6fdc38d39a22e1d6',
          URL: 'spotify:track:4GdB5M7GbwLZLouktYocFC',
        },
        {
          name: 'So Fresh, So Clean',
          artist_name: 'Outkast',
          album_name: 'Stankonia',
          album_img: 'https://i.scdn.co/image/48787c279dab6e8c1cc3b4beb27875ff37715fec',
          URL: 'spotify:track:6glsMWIMIxQ4BedzLqGVi4',
        },
        {
          name: 'Smoke On The Water',
          artist_name: 'Deep Purple',
          album_name: 'Machine Head',
          album_img: 'https://i.scdn.co/image/a5ce92252b85847dab3869e73d8b8480ea2c8ce7',
          URL: 'spotify:track:5SAUIWdZ04OxYfJFDchC7S',
        },
        {
          name: 'Energy',
          artist_name: 'Drake',
          album_name: "If You're Reading This It's Too Late",
          album_img: 'https://i.scdn.co/image/bcd6801c26cb293a45df9b092227395c5b403b4c',
          URL: 'spotify:track:79XrkTOfV1AqySNjVlygpW',
        },
      ]);
    });
};
