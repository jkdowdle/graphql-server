import User from './User';

export const Mutation = `
  type Mutation {
    addUser(input: UserInput!): User
  }
`;

export default () => [ Mutation, User ];
