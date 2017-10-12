let usersData = [
  { id: 0, firstName: 'Elliot', age: 2 },
  { id: 1, firstName: 'Barton', age: 0 },
  { id: 2, firstName: 'Ann', age: 26 },
  { id: 3, firstName: 'Kurt', age: 24 },
];

export const users = () => {
  return usersData;
};

export const addUser = (_, { firstName, age }) => {
  const newUser = { id: usersData.length + 1, firstName, age };
  
  usersData = [
    ...usersData,
    newUser
  ]

  return newUser;
}

export default users;