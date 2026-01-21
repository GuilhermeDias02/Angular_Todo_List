import { Injectable, computed, signal } from '@angular/core';
import { User } from '../auth/interfaces/user';


const USER_KEY = 'current_user';

function readUser(): User | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user = signal<User | null>(readUser());
  readonly currentUser = this._user.asReadonly();

  readonly isAuthenticated = computed(() => this._user() !== null);

  setUser(user: User): void {
    this._user.set(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  logout(): void {
    this._user.set(null);
    localStorage.removeItem(USER_KEY);
  }
}
