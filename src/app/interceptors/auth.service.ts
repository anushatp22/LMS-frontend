import { HttpInterceptorFn  } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../../Service/auth-service.service';
import { catchError, switchMap, throwError, from  } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthServiceService);
  const token = authService.getAccessToken();

   // Clone request with access token if exists
  let authReq = req;
   if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

   return next(authReq).pipe(
    catchError((err) => {
      // If 401, try refreshing token
      if (err.status === 401) {
        // return from(authService.refreshToken()).pipe(
        //   switchMap((newToken) => {
        //    const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
        //     return next(retryReq);
        //   })
        // );
        authService.clearAccessToken();
        window.location.href = '/login'; // redirect to login
      }

      // If refresh fails or other error → propagate
      return throwError(() => err);
    })
  );
};
