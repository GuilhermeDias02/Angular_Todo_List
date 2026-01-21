import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Commentslist } from '../comments/commentslist';

@Component({
  selector: 'app-home',
  imports: [
    Commentslist
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
    private router: Router = inject(Router);
    protected logout(): void {
        this.router.navigate(['/login']);
    }

    protected login(): void {
        this.router.navigate(['/login']);
    }
}
