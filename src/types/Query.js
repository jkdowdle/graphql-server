import User from './User';

export const Query = `
  type Query {
    users: [User]
    
  }

  input Id {
    id: Int!
  }
`;

export default () => [ Query, User ];