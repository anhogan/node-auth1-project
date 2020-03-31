
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'batman', password: 'iam'},
        {id: 2, username: 'sparta', password: 'dog'},
        {id: 3, username: 'Panic!atTheDisco', password: 'jammingallday'}
      ]);
    });
};
