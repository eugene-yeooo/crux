import { getUserByAuthId } from '../db/users'
import connection from '../db/connection'
import { Request, Response, NextFunction } from 'express'

export async function ensureUserExists(req: Request, res: Response, next: NextFunction) {
  const auth0Id = req.auth?.sub

  const fullName = `${req.auth?.given_name ?? ''} ${req.auth?.family_name ?? ''}`.trim() || 'Unknown'


  if (!auth0Id) {
    return res.status(401).send('No Auth0 ID found')
  }

  let user = await getUserByAuthId(auth0Id)

  if (!user) {
    // Create a new user with fields from Auth0
    await connection('users').insert({
      auth0_id: auth0Id,
      email: req.auth?.email,
      name: fullName,
      avatar_url: req.auth?.picture,
    })

    user = await getUserByAuthId(auth0Id)
  }

  req.user = user // Attach user to the request for downstream access
  next()
}
