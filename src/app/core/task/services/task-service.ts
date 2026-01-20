import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CreateTask, Task, TaskStatus } from '../interfaces/task';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private httpClient: HttpClient = inject(HttpClient);
    private apiUrl: String = `${environment.apiUrl}/tasks`;
    private router: Router = inject(Router);

    createTask(task: CreateTask): Observable<Task> {
        task.status ??= TaskStatus.PENDING;
        return this.httpClient.post<Task>(`${this.apiUrl}`, task);
    }

    getTasks(): Observable<Array<Task>> {
        return this.httpClient.get<Array<Task>>(`${this.apiUrl}`);
    }

    deleteTask(id: number) {
        return this.httpClient.delete(`${this.apiUrl}/${id}`);
    }
}
