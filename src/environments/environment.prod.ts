export const environment = {
    production: true,
    apiUrl: 'https://api.devflowfix.com/api/v1', // Update with your production URL
    appName: 'DevFlowFix',
    version: '1.0.0',

    auth: {
        tokenKey: 'access_token',
        refreshTokenKey: 'refresh_token',
        tokenExpiry: 'token_expiry',
    },

    features: {
        enableAnalytics: true,
        enableErrorTracking: true,
    },

    endpoints: {
        login: '/auth/login',
        register: '/auth/register',
        logout: '/auth/logout',
        refresh: '/auth/refresh',
        me: '/auth/me',
        passwordChange: '/auth/password/change',
        passwordResetRequest: '/auth/password/reset/request',
        passwordResetConfirm: '/auth/password/reset/confirm',
        sessions: '/auth/sessions',
        mfaSetup: '/auth/mfa/setup',
        mfaEnable: '/auth/mfa/enable',
        mfaDisable: '/auth/mfa/disable',
    }
}