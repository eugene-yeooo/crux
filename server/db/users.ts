import connection from './connection.ts'

export function getUserByUsername(username: string) {
  return connection('users').where({ username }).first()
}

export function getUserByAuthId(auth0Id: string) {
  return connection('users').where({ auth0_id: auth0Id }).first()
}

