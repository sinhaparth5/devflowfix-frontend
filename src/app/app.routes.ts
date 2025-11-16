import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './auth/auth-routing-module';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'auth',
        children: AUTH_ROUTES,
    },
    {
        path: '**',
        redirectTo: '',
    },
];
