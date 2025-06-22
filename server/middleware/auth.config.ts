import { auth } from 'express-oauth2-jwt-bearer'

export default function checkJwt() {
  return auth({
    audience: 'https://crux/api',
    issuerBaseURL: 'https://crux.au.auth0.com',
  })
}
