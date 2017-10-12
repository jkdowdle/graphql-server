import User from './User';

export const Mutation = `
  type Mutation {
    addUser(firstName: String!, age: Int!): User
  }
`

export default () => [ Mutation, User ];
