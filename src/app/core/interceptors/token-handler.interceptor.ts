import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const tokenHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  let token = userService.getToken();

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
  return next(authReq);
};
