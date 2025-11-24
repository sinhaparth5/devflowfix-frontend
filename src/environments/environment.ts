export const environment = {
    production: false,
    apiUrl: 'https://devflowfix-new-production.up.railway.app/api/v1',
    appName: 'DevFlowFix',
    version: '1.0.0-dev',

    auth: {
        tokenKey: 'access_token',
        refreshTokenKey: 'refresh_token',
        tokenExpiry: 'token_expiry',
    },

    features: {
        enableAnalytics: false,
        enableErrorTracking: false,
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
