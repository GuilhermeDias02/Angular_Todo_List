import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Credentials } from '../../../core/auth/interfaces/credentials';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Header } from '../../../shared/header/header';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {
    private authService: AuthService = inject(AuthService);
    private fb: FormBuilder = inject(FormBuilder);
    private router = inject(Router);
    protected errorMessage = signal("");
    // private destroyRef = inject(DestroyRef);

    registerForm = this.fb.nonNullable.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
    });

    protected register() {
        if (this.registerForm.invalid) {
            this.errorMessage.set('Please fill in all fields.');
            return;
        }

        const formData: Credentials = this.registerForm.value as Credentials;
        this.authService.register(formData)
        // .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
            next: (user) => {
                if (user) {
                    this.router.navigate(['/login']);
                }
            },
            error: (error) => {
                this.errorMessage.set(error.error.message);
            }
        });
    }

    protected redirectToLogin() {
        this.router.navigate(['/login']);
    }
}
