import { auth } from 'express-oauth2-jwt-bearer'

const checkJwt = auth({
  audience: 'https://crux/api',
  issuerBaseURL: 'https://crux.au.auth0.com',
})

export default checkJwt
