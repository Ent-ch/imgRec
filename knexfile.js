// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/dev.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './db/prod.sqlite3'
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    useNullAsDefault: true,
  }

};
