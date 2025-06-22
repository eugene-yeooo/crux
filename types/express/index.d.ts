import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Request {
    auth?: {
      sub: string
      email?: string
      given_name?: string
      family_name?: string
      picture?: string
      nickname?: string
    }
    user?: {
      id: number
      auth0_id: string
      name?: string
      username?: string
      email: string
      avatar_url?: string
      bio?: string
      country?: string
    }
  }
}