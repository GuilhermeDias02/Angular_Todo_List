import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { User } from '../../../core/auth/interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private httpClient: HttpClient = inject(HttpClient);
    private apiUrl: string = `${environment.apiUrl}/users`;

    getUsers(): Observable<Array<User>> {
        return this.httpClient.get<Array<User>>(`${this.apiUrl}`);
    }
}
