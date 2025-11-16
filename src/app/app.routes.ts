import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home,
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth-routing-module')
            .then((m) => m.AUTH_ROUTES),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
