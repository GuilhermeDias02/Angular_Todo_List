import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TaskForm } from '../../../features/tasks/task-form/task-form';
import { TaskService } from '../../../core/task/services/task-service';
import { Task } from '../../../core/task/interfaces/task';

@Injectable({
    providedIn: 'root',
})
export class TaskFormService {
    private taskService = inject(TaskService);
    private router: Router = inject(Router);
    public isModify = signal(false);
    public taskToModify = signal<Task | null>(null);

    public setTaskModificationForm(id: number) {
        if (id > 0) {
            this.taskService.getTask(id).subscribe({
                next: (task: Task) => {
                    this.taskToModify.set(task);
                    this.isModify.set(true);
                },
                error: (error) => {
                    console.log(error);
                }
            })
        }
        this.router.navigate(['/tasksForm']);
    }
}
