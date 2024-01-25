export interface GastosXLucroResponse {
    chave: string,
    resultado: {
        ganho: number,
        lucro: number,
        custo: number
    }
}