import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import {
  NbThemeModule,
  NbToastrModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { provideAuth } from './auth/auth.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAuth(),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'default' }),
      NbToastrModule.forRoot(),
      NbLayoutModule,
      NbMenuModule.forRoot(),
      NbSidebarModule.forRoot(),
      NbEvaIconsModule
    ),
  ],
};
