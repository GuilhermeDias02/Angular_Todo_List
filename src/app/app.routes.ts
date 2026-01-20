import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { TaskList } from './features/tasks/task-list/task-list';
import { Home } from './features/home/home';
import { authGuard } from './core/auth/guards/auth-guard';
import { TaskForm } from './features/tasks/task-form/task-form';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "register",
        component: Register
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "tasks",
        component: TaskList,
        canActivate: [authGuard]
    },
    {
        path: "tasksForm",
        component: TaskForm,
        canActivate: [authGuard]
    }
];
