// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: '127.0.0.1',
      username: 'postgres',
      password: process.env.DB_URL,
      database: 'auth'
      // filename: './data/users.db3'
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    },
    pool: {
      min: 2,
      max: 10
      // afterCreate: (conn, done) => {
      //   conn.run('PRAGMA foreign_keys = ON', done);
      // }
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      username: username,
      password: password,
      database: 'my_db'
      // filename: './data/users.db3'
    },
    pool: {
      min: 2,
      max: 10
      // afterCreate: (conn, done) => {
      //   conn.run('PRAGMA foreign_keys = ON', done);
      // }
    },
    migrations: {
      directory: './data/migrations',
      filename: 'knex_migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }

};
