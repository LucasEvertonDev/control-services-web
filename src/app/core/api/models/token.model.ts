export interface TokenModel{
    'JWTUserClaims.Name': string,
    'JWTUserClaims.Email': string,
    role: string[],
    nbf: number,
    exp: number,
    iat: number,
    expirationFormated: Date,
    refreshTokenInMS: number
}