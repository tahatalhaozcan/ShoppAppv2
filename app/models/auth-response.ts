export interface AuthResponse {
  idToken: string,
  email:string,
  refreshToken:string,
  expireIn: string,
  localId:string
  registered?:boolean
}
