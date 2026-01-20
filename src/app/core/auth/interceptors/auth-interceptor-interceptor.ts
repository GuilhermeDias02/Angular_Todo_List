import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService) ;
    const token = authService.getUserToken();

    // On clone la requête pour y ajouter le header (Immuabilité)
    if (token) {
        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
    }
    return next(req);
};
