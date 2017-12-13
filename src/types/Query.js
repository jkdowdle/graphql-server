import User from './User';

export const Query = `
  type Query {
    users: [User]
    usernameAvailable(value: String): String    
  }

  input Id {
    id: Int!
  }
`;

export default () => [ Query, User ];