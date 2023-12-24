export interface RefreshTokenResponse {
    token_type: string,
    access_token: string,
    expires_in: number,
    expire_date: Date
}