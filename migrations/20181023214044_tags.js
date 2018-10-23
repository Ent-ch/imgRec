
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function (table) {
    table.integer('file_id');
    table.text('tags');
  });  
};

exports.down = function(knex, Promise) {
  
};
