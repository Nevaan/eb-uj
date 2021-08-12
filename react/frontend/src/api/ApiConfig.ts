export const apiConfig = {
    baseUrl: process.env.REACT_APP_API_URL || '/',
    authEntrypoint: process.env.REACT_APP_API_URL + 'auth' || '/auth'
}
