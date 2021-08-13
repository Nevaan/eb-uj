export const apiConfig = {
    baseUrl: process.env.REACT_APP_API_URL || '/api/',
    authEntrypoint: (process.env.REACT_APP_API_URL || '/api/') + 'auth'
}
