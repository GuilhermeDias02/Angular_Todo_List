import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../../shared/header/header';
import { TaskService } from '../../../core/task/services/task-service';
import { Task } from '../../../core/task/interfaces/task';
import { Router } from '@angular/router';

@Component({
    selector: 'app-task-list',
    imports: [ReactiveFormsModule],
    templateUrl: './task-list.html',
    styleUrl: './task-list.css',
})
export class TaskList {
    private taskService: TaskService = inject(TaskService);
    protected taskList = signal<Array<Task>>(new Array<Task>);
    private router: Router = inject(Router);

    constructor() {
        this.fetchTaskList();
    }

    private fetchTaskList(): void {
        this.taskService.getTasks()
            .subscribe({
                next: (tasks: Array<Task>) => {
                    if (tasks) {
                        console.log(tasks);
                        this.updateTasks(tasks);
                    }
                },
                error: (error) => {
                    console.log(error);
                }
            });
    }

    private updateTasks(tasks: Array<Task>): void {
        this.taskList.set(tasks);
    }

    protected createTask() {
        this.router.navigate(['/tasksForm']);
    }

    protected deleteTask(id: number) {
        this.taskService.deleteTask(id)
        .subscribe({
            next: () => {
                const tasks = this.taskList();
                const remainingTasks = tasks.filter(task => task.id !== id);
                this.updateTasks(remainingTasks);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}
