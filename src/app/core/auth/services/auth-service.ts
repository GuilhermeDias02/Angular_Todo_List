import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Credentials } from '../interfaces/credentials';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../../../environments/environment';
import { Jwt } from '../interfaces/jwt';
import { jwtDecode } from 'jwt-decode';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private httpClient: HttpClient = inject(HttpClient);
    private apiUrl: String = `${environment.apiUrl}/auth`;
    currentUser = signal(this.getUserFromStorage());
    private router = inject(Router);

    register(credentials: Credentials): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, credentials);
    }

    login(credentials: Credentials): Observable<Jwt> {
        return this.httpClient.post<Jwt>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap((res: Jwt) => {
                    localStorage.setItem("jwt", res.access_token);
                    this.currentUser.set(this.getUserFromStorage());
                })
            );
    }

    getUserToken(): string | null {
        return localStorage.getItem("jwt");
    }

    getUserFromStorage(): User | null {
        const token = this.getUserToken();
        if (!token) {
            return null;
        }

        try {
            const decoded: User = jwtDecode(token);

            // Vérifier l'expiration (exp est en secondes, Date.now() en ms)

            if (decoded.exp && decoded.exp * 1000 < Date.now()) return null; // Token périmé -> Dehors !

            return decoded;
        } catch (error) {
            return null; // Token corrompu -> On ignore, pas de crash
        }
    }

    logout() {
        localStorage.removeItem("jwt");
        this.currentUser.set(this.getUserFromStorage());
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return this.currentUser() === null ? false : true;
    }
}
