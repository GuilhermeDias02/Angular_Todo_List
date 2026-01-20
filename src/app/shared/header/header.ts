import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from '../../features/home/home';
import { AuthService } from '../../core/auth/services/auth-service';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.html',
    styleUrl: './header.css',
})
export class Header {
    protected authService: AuthService = inject(AuthService);

    protected logout() {
        this.authService.logout();
    }
}
