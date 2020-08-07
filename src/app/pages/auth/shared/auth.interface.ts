export interface IUserData {
    login: string,
    password: string
}
   
export interface IAuthAPI {
    accessLevel: number,
    id: number,
    msg: 'OK' | 'NO_USER' | 'PASSWORD_MISMATCH',
    name?: string,
    passw?: string,
    realname?: string
}
