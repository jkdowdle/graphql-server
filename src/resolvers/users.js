let usersData = [
  { id: 0, firstName: 'Elliot', age: 2, createdAt: '10/28/2017-0' },
  { id: 1, firstName: 'Barton', age: 0, createdAt: '10/28/2017-1' },
  { id: 2, firstName: 'Ann', age: 26, createdAt: '10/28/2017-2' },
  { id: 3, firstName: 'Kurt', age: 24, createdAt: '10/28/2017-3' },
  // { id: 4, firstName: 'John', age: 29 },
  // { id: 5, firstName: 'Bilbo', age: 111 },
  // { id: 6, firstName: 'Frodo', age: 67 },
  // { id: 7, firstName: 'Bob', age: 55 },
];

export const users = () => {
  return usersData;
};

export const user = (_, { input: { id }}) => {
  return usersData.find((user) => user.id === id) || null;
}

export const addUser = (_, { input: { firstName, age }}) => {
  const newUser = { id: usersData.length, firstName, age, createdAt: '11/5/2017-' + usersData.length };
  
  usersData = [
    newUser,
    ...usersData,
  ]

  return newUser;
}

const checkId = (id) => (user) => user.id === id;

export const updateUser = (_, { id, input }) => {
  const checkUsersId = checkId(id);
  const index = usersData.findIndex(checkUsersId);

  if (index === -1) {
    return null;
  }

  const user = usersData.find(checkUsersId) || null;
  const updatedUser = { ...user, ...input };

  usersData = [
    ...usersData.slice(0, index),
    updatedUser,
    ...usersData.slice(index + 1)
  ];

  return updatedUser;
}

export const deleteUser = (_, { input: { id }}) => {
  console.log('removing user!')
  const checkUsersId = checkId(id);
  const index = usersData.findIndex(checkUsersId);

  if (index === -1) {
    throw new Error("No such user");
  }

  const user = usersData.find(checkUsersId) || null;

  usersData = [
    ...usersData.slice(0, index),
    ...usersData.slice(index + 1)
  ];

  return user;
}

export const usersFeed = (_, { cursor, limit = 2 }) => {
  
  cursor = cursor ? cursor: usersData[usersData.length - 1].createdAt; 

  const latestUserIndex = usersData.findIndex(({ createdAt }) => createdAt === cursor)

  const newCursor = usersData[latestUserIndex - 1].createdAt;

  return {
    cursor: newCursor,
    users: usersData.slice(latestUserIndex - limit + 1, latestUserIndex + 1)
  }
}

export const searchUsers = (_, { input: { searchTerm }}) => {
  return usersData.filter(({ firstName }) => firstName.toLowerCase().search(searchTerm.toLowerCase()) !== -1);
}

export default users;