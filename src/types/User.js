export const User = `
  type User {
    id: ID!
    firstName: String!
    age: Int!
  }
`;

export default () => [ User ];