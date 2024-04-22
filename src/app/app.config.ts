import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { tokenHandlerInterceptor } from './core/interceptors/token-handler.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';
import { spinnerInterceptor } from './core/interceptors/spinner.interceptor';
import { ngrokInterceptor } from './core/interceptors/ngrok.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withFetch(), withInterceptors([ngrokInterceptor,errorHandlerInterceptor, tokenHandlerInterceptor, spinnerInterceptor])), provideAnimationsAsync()]
};
