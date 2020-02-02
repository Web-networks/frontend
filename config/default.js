const DEFAULT_PORT = 8080;
const FRONTEND_HOST = process.env.FRONTEND_HOST || `http://localhost:${process.env.FRONTEND_PORT || DEFAULT_PORT}`

module.exports = {
    port: process.env.FRONTEND_PORT || DEFAULT_PORT,
    frontendHost: FRONTEND_HOST,
    backendHost: process.env.BACKEND_HOST || 'http://localhost:5050',
    staticURL: `${FRONTEND_HOST}/bundles`
}