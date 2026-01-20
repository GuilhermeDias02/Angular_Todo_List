import { Component, DestroyRef, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/auth/services/auth-service';
import { Router } from '@angular/router';
import { Credentials } from '../../../core/auth/interfaces/credentials';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css',
})
export class Login {
    private authService: AuthService = inject(AuthService);
    private fb: FormBuilder = inject(FormBuilder);
    private router = inject(Router);
    protected errorMessage = signal("");
    // private destroyRef = inject(DestroyRef);

    loginForm = this.fb.nonNullable.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    protected login() {
        if (this.loginForm.invalid) {
            this.errorMessage.set('Please fill in all fields.');
            return;
        }

        const formData: Credentials = this.loginForm.value as Credentials;
        this.authService.login(formData)
            // .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (jwt) => {
                    if (jwt) {
                        console.log("navigate");
                        this.router.navigate(['/tasks']);
                    }
                },
                error: (error) => {
                    this.errorMessage.set(error.error.message);
                }
            });
    }

    protected redirectToRegister() {
        this.router.navigate(['/register']);
    }
}
