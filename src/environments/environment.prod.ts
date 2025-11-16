export const environment = {
    production: true,
    apiUrl: 'https://example.com/api',
    appName: 'DevFlowFix',
    version: '1.0.0',

    auth: {
        tokenKey: 'auth_token',
        refreshTokenKey: 'refresh_token',
    },

    features: {
        enableAnalytics: true,
        enableErrorTracking: true,
    },

    endpoints: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        refreshToken: '/auth/refresh'
    }
}