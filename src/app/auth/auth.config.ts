import { importProvidersFrom } from "@angular/core";
import {
    NbAuthModule,
    NbPasswordAuthStrategy,
    NbAuthJWTToken,
} from '@nebular/auth';
import { environment } from "../../environments/environment";

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
                    baseEndpoint: environment.apiUrl,
                    login: {
                        endpoint: environment.endpoints.login,
                        method: 'post',
                    },
                    register: {
                        endpoint: environment.endpoints.logout,
                        method: 'post',
                    },
                    logout: {
                        endpoint: environment.endpoints.logout,
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