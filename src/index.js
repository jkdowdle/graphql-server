import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';

import { setContext } from './resolvers/users'

// // import OpticsAgent from 'optics-agent';

import { schema } from './schema';

dotenv.config();

const app = express();

// // OpticsAgent.instrumentSchema(schema);

// // app.use(OpticsAgent.middleware());

app.use('*', cors({ origin: ['http://localhost:3000','http://localhost:3001'] }));

app.use('/graphql', bodyParser.json(), graphqlExpress(async (request) => {
  console.log('hitting graphql server');
  // const context = { opticsContext: OpticsAgent.context(request) };
  request.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAuNjI3MzA3MjYxMTc1OTM3NCIsImlhdCI6MTUxMDc4NzE4MX0.mgwZ3TnCm7A6ATEDWl-YXA8li2XyRz_GgZ9-L3zIJlo'
  const context = await setContext(request.headers, {})
  console.log('context', context);
  
  return {
    schema,
    context
  }
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

app.listen(process.env.PORT || 5000, () => {
  console.info('Listening on port', process.env.PORT || 5000);
});