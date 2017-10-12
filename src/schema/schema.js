import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { appResolvers as resolvers } from '../resolvers';
import { appTypes as typeDefs } from '../types';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});