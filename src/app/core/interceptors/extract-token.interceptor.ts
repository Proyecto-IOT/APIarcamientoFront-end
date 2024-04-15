import { HttpInterceptorFn } from '@angular/common/http';

export const extractTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
