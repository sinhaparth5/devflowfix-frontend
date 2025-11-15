import { importProvidersFrom } from "@angular/core";
import {
    NbAuthModule,
    NbPasswordAuthStrategy,
    NbAuthJWTToken,
} from '@nebular/auth';

export function provideAuth() {
    return importProvidersFrom(
        NbAuthModule.forRoot({
            strategies: [
                NbPasswordAuthStrategy.setup({
                    name: 'email',
                    token: {
                        class: NbAuthJWTToken,
                        key: 'token',
                    },
                    baseEndpoint: 'http://localhost:3000/api',
                    login: {
                        endpoint: '/auth/login',
                        method: 'post',
                    },
                    register: {
                        endpoint: '/auth/register',
                        method: 'post',
                    },
                    logout: {
                        endpoint: '/auth/logout',
                        method: 'post',
                    },
                    requestPass: {
                        endpoint: '/auth/request-pass',
                        method: 'post'
                    },
                    resetPass: {
                        endpoint: '/auth/reset-pass',
                        method: 'post'
                    }
                }),
            ],
            forms: {
                login: {
                    redirectDelay: 500,
                    strategy: 'email',
                    rememberMe: true,
                    showMessages: {
                        success: true,
                        error: true,
                    },
                },
                register: {
                    redirectDelay: 500,
                    strategy: 'email',
                    showMessages: {
                        success: true,
                        error: true,
                    },
                    terms: true,
                },
            },
        })
    );
}