export const environment = {
    production: true,
    apiUrl: 'https://localhost:8000/api',
    appName: 'DevFlowFix',
    version: '1.0.0-dev',

    auth: {
        tokenKey: 'auth_token',
        refreshTokenKey: 'refresh_token',
    },

    features: {
        enableAnalytics: false,
        enableErrorTracking: false,
    },

    endpoints: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        refreshToken: '/auth/refresh'
    }
}