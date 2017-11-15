import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';


// // import OpticsAgent from 'optics-agent';

import { schema } from './schema';

dotenv.config();

const app = express();

// // OpticsAgent.instrumentSchema(schema);

// // app.use(OpticsAgent.middleware());

app.use('*', cors({ origin: ['http://localhost:3000','http://localhost:3001'] }));

app.use('/graphql', bodyParser.json(), graphqlExpress((request) => {
  console.log('hitting graphql server');
  // const context = { opticsContext: OpticsAgent.context(request) };
  return {
    schema,
    // context
  }
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(process.env.PORT, () => {
  console.info('Listening on port', process.env.PORT);
});