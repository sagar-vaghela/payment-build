export interface User {
  iss?: string,
  // aud: string,
  // auth_time: number,
  // user_id: string,
  // sub: string,
  // iat: number,
  // exp: number,
  email: string,
  // email_verified: boolean,
  // firebase: {
  //     identities:Identities,
  //     sign_in_provider: string
  // }
  id: string,
  avatar: string | undefined,
  name: string,
  password?: string,
  plan?: string
}
export interface Identities {
  email: string[]
}
