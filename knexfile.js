const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.db'),
    },
    migrations:{
      extension: 'js',
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'migrations')
    },
    seeds:{
      directory: path.resolve(__dirname, 'src', 'database', 'knex', 'seeds')
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    useNullAsDefault: true
  }
};
