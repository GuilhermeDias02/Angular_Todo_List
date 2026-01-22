import { Routes } from '@angular/router';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { TaskList } from './features/tasks/task-list/task-list';
import { Home } from './features/home/home';
import { authGuard } from './core/auth/guards/auth-guard';
import { TaskForm } from './features/tasks/task-form/task-form';
import { TaskDetail } from './features/tasks/task-detail/task-detail';
import { Dashboard } from './features/dashboard/dashboard';

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
    },
    {
  path: "tasks/:id",
  component: TaskDetail,
  canActivate: [authGuard] 
},
{
        path: "dashboard",
        component: Dashboard,
       canActivate: [authGuard] 
    }
    ];
