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
    private router: Router = inject(Router);

    protected authService: AuthService = inject(AuthService);

    protected logout() {
        this.authService.logout();
    }

    protected redirectionToTasks() {
       
        this.router.navigateByUrl('/tasks');
    }

    protected redirectionToDashboard() {
       
        this.router.navigateByUrl('/dashboard');
    }
}
