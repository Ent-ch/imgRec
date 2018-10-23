
exports.up = function(knex, Promise) {
    // console.log(knex);
    return knex.schema.createTable('files', function (table) {
        table.increments().defaultTo(1); // hack for sqlite
        table.string('name');
        table.string('imagga_id');
        table.timestamp('created_at').defaultTo(knex.fn.now());
      });  
};

exports.down = function(knex, Promise) {
  
};
