
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {userName: "admin", password: "admin"},
        {userName: "Greg", password: "abc123"},
        {userName: "test", password: "test"}
      ]);
    });
};
