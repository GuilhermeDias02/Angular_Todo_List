import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { CreateTask, Task, TaskStatus } from '../interfaces/task';
import { Observable } from 'rxjs';
import { TaskForm } from '../../../features/tasks/task-form/task-form';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private httpClient: HttpClient = inject(HttpClient);
    private apiUrl: String = `${environment.apiUrl}/tasks`;

    public createTask(task: CreateTask): Observable<Task> {
        task.status ??= TaskStatus.PENDING;
        return this.httpClient.post<Task>(`${this.apiUrl}`, task);
    }

    public getTasks(): Observable<Array<Task>> {
        return this.httpClient.get<Array<Task>>(`${this.apiUrl}`);
    }

    public getTask(id: number): Observable<Task> {
        return this.httpClient.get<Task>(`${this.apiUrl}/${id}`);
    }

    public deleteTask(id: number) {
        return this.httpClient.delete(`${this.apiUrl}/${id}`);
    }

    public modifyTask(task: CreateTask, id: number): Observable<Task> {
        return this.httpClient.patch<Task>(`${this.apiUrl}/${id}`, task);
    }

    
    // public setTaskModificationForm(id: number) {
        
    //     this.router.navigate(['/tasksForm']);
    // }
}
