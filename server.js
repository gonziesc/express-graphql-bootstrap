const config = require('./config'),
  migrationsManager = require('./migrations'),
  logger = require('./app/logger'),
  server = require('./app/graphql');

const port = config.common.api.port || 8080;

migrationsManager
  .check()
  .then(() =>
    /* const rollbar = new Rollbar({
      accessToken: config.common.rollbar.accessToken,
      enabled: !!config.common.rollbar.accessToken,
      environment: config.common.rollbar.environment || config.environment
    }); */
    server.listen(port).then(({ url }) => {
      logger.info(`🚀 Server ready at ${url}`);
    })
  )
  .catch(logger.error);
