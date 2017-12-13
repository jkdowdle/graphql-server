import jwt from 'jsonwebtoken'

let usersData = [
  { id: 0, firstName: 'Elliot', age: 2, createdAt: '10/28/2017-0' },
  { id: 1, firstName: 'Barton', age: 0, createdAt: '10/28/2017-1' },
  { id: 2, firstName: 'Ann', age: 26, createdAt: '10/28/2017-2' },
  { id: 3, firstName: 'Kurt', age: 24, createdAt: '10/28/2017-3' }
  // { id: 4, firstName: 'John', age: 29 },
  // { id: 5, firstName: 'Bilbo', age: 111 },
  // { id: 6, firstName: 'Frodo', age: 67 },
  // { id: 7, firstName: 'Bob', age: 55 },
]

let authUsers = [
  { id: 'zcd', email: 'joshd@gmail.com', password: 'password' },
  { id: 'drf', email: 'kurtd@gmail.com', password: 'password' },
  { id: '0.6273072611759374', email: 'jkd@gmail.com', password: 'pass' }
]

export const currentUser = async (_, args, context) => {
  return context.user
}

export const login = (_, { email, password }, context) => {
  const user = authUsers.find(
    user => user.email === email && user.password === password
  )

  if (!user) {
    throw new Error('User not found')
  }

  return { ...user, jwt: jwt.sign({ id: user.id }, 'super-cool') }
}

export const signup = (_, { email, password }, context) => {
  const existingUser = authUsers.find(user => user.email === email)

  if (existingUser) {
    throw new Error('Email already used')
  }

  authUsers = [...authUsers, { id: String(Math.random()), email, password }]

  const user = authUsers.find(user => user.email === email)

  return { ...user, jwt: jwt.sign({ id: user.id }, 'super-cool') }
}

export const users = () => {
  return usersData
}

export const user = (_, { input: { id } }) => {
  return usersData.find(user => user.id === id) || null
}

export const addUser = (_, { input: { firstName, age } }) => {
  const newUser = {
    id: usersData.length,
    firstName,
    age,
    createdAt: '11/5/2017-' + usersData.length
  }

  usersData = [newUser, ...usersData]

  return newUser
}

const checkId = id => user => user.id === id

export const updateUser = (_, { id, input }) => {
  const checkUsersId = checkId(id)
  const index = usersData.findIndex(checkUsersId)

  if (index === -1) {
    return null
  }

  const user = usersData.find(checkUsersId) || null
  const updatedUser = { ...user, ...input }

  usersData = [
    ...usersData.slice(0, index),
    updatedUser,
    ...usersData.slice(index + 1)
  ]

  return updatedUser
}

export const deleteUser = (_, { input: { id } }) => {
  console.log('removing user!')
  const checkUsersId = checkId(id)
  const index = usersData.findIndex(checkUsersId)

  if (index === -1) {
    throw new Error('No such user')
  }

  const user = usersData.find(checkUsersId) || null

  usersData = [...usersData.slice(0, index), ...usersData.slice(index + 1)]

  return user
}

export const usersFeed = (_, { cursor, limit = 2 }) => {
  cursor = cursor ? cursor : usersData[usersData.length - 1].createdAt

  const latestUserIndex = usersData.findIndex(
    ({ createdAt }) => createdAt === cursor
  )

  const newCursor = usersData[latestUserIndex - 1].createdAt

  return {
    cursor: newCursor,
    users: usersData.slice(latestUserIndex - limit + 1, latestUserIndex + 1)
  }
}

export const searchUsers = (_, { input: { searchTerm, orderBy } }) => {
  if (orderBy === 'desc') {
    return usersData
      .filter(
        ({ firstName }) =>
          firstName.toLowerCase().search(searchTerm.toLowerCase()) !== -1
      )
      .sort((a, b) => b.age - a.age)
  }

  if (orderBy === 'asc') {
    return usersData
      .filter(
        ({ firstName }) =>
          firstName.toLowerCase().search(searchTerm.toLowerCase()) !== -1
      )
      .sort((a, b) => a.age - b.age)
  }

  return usersData.filter(
    ({ firstName }) =>
      firstName.toLowerCase().search(searchTerm.toLowerCase()) !== -1
  )
}

export async function setContext(headers, secrets) {
  const authorization = headers['authorization']
  const user = await getUser(authorization, secrets)
    .then(res => res)
    .catch(e => console.log(e))
  return {
    user,
    secrets
  }
}

async function getUser(authorization, secrets) {
  const bearerLength = 'Bearer '.length
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength)

    const { ok, result } = await new Promise(resolve => {
      jwt.verify(token, 'super-cool', (error, result) => {
        if (error) {
          resolve({
            ok: false,
            result: error
          })
        }

        resolve({
          ok: true,
          result
        })
      })
    })

    if (ok) {
      const user = await authUsers.find(user => user.id === result.id)
      return user
    }

    return null
  }
}

export const usernameAvailable = (_, { value }) => {
  const exists = authUsers.find(({ email }) => email === value) || null
  if (exists) {
    return 'Email address is allready in use'
  }
}

export default users
