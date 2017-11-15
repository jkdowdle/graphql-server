export const User = `

  type User {
    id: ID!
    firstName: String!
    age: Int!
  }

  type UserFeed {
    cursor: String!
    users: [User]!
  }
  
  extend type Query {
    usersFeed(cursor: String): UserFeed
    user(input: Id!): User
    searchUsers(input: SearchUser): [User]!
  }

  extend type Mutation {
    updateUser(id: Int!, input: UserInput): User
    deleteUser(input: Id!): User
  }

  input UserInput {
    firstName: String
    age: Int
  }

  input SearchUser {
    searchTerm: String
    orderBy: String
  }

`;

export default () => [ User ];