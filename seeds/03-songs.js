
exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('song').del()
    .then(() => {
      // Inserts seed entries
      return knex('song').insert([
        {
          name: 'Outkast - SpottieOttieDopaliscious',
          album_img: 'https://i.ytimg.com/vi/vXmqauitBkM/hqdefault.jpg?custom=true&w=246&h=138&stc=true&jpg444=true&jpgq=90&sp=68&sat=0.3&sigh=mpjoP5DzR1zGkCI7dd-vY2zM3z8',
          URL: 'vXmqauitBkM',
        },
        {
          name: 'Outkast - So Fresh, So Clean',
          album_img: 'https://i.ytimg.com/vi/-JfEJq56IwI/hqdefault.jpg?custom=true&w=246&h=138&stc=true&jpg444=true&jpgq=90&sp=68&sat=0.3&sigh=x6Kx8XNzVnBWzX3uOgWGm9y7ulQ',
          URL: '-JfEJq56IwI',
        },
        {
          name: 'Deep Purple - Smoke On The Water',
          album_img: 'https://i.ytimg.com/vi/zUwEIt9ez7M/hqdefault.jpg?custom=true&w=246&h=138&stc=true&jpg444=true&jpgq=90&sp=68&sat=0.3&sigh=4MCKEjTX_lcyt3UJkkKRaCB4O68',
          URL: 'zUwEIt9ez7M',
        },
        {
          name: 'Drake - Energy',
          album_img: 'https://i.ytimg.com/vi/7LnBvuzjpr4/hqdefault.jpg?custom=true&w=246&h=138&stc=true&jpg444=true&jpgq=90&sp=68&sat=0.3&sigh=imBGW5_168ZAzuLKCPtIoTzIYYY',
          URL: '7LnBvuzjpr4',
        },
      ]);
    });
};
