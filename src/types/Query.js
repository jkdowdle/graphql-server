import User from './User';

export const Query = `
  type Query {
    users: [User]
  }
`

export default () => [ Query, User ];