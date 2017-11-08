import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'

import { appResolvers as resolvers } from '../resolvers'
import { appTypes as typeDefs } from '../types'

const schema = makeExecutableSchema({ typeDefs, resolvers })

export { schema };