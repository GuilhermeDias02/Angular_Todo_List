import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Credentials } from '../credentials';
import { Observable } from 'rxjs';
import { User } from '../user';
import { environment } from '../../../../environments/environment';
import { Jwt } from '../jwt';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private httpClient: HttpClient = inject(HttpClient);
    private apiUrl: String = `${environment.apiUrl}/auth`;

    register(credentials: Credentials): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, credentials);
    }

    login(credentials: Credentials): Observable<Jwt> {
        return this.httpClient.post<Jwt>(`${this.apiUrl}/login`, credentials);
    }
}
