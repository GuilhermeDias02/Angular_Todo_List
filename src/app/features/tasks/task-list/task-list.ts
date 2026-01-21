import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../../core/task/services/task-service';
import { CreateTask, Task, TaskStatus } from '../../../core/task/interfaces/task';
import { Router } from '@angular/router';
import { TaskStatusPipe } from '../../../shared/pipes/task-status-pipe';
import { TaskFormService } from '../service/task-form-service';
import { TaskStatusColorPipe } from '../../../shared/pipes/task-status-color-pipe';
import { DatePipe } from '@angular/common';
import { TaskTitleStrikePipe } from '../../../shared/pipes/task-title-strike-pipe';

@Component({
    selector: 'app-task-list',
    imports: [ReactiveFormsModule, TaskStatusPipe, TaskStatusColorPipe, DatePipe, TaskTitleStrikePipe],
    templateUrl: './task-list.html',
    styleUrl: './task-list.css',
})
export class TaskList {
    private taskService: TaskService = inject(TaskService);
    private taskFormService = inject(TaskFormService);
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

    protected setTaskModification(id: number) {
        this.taskFormService.setTaskModificationForm(id);
        this.router.navigate(['/tasksForm']);
    }

    protected isTaskPending(task: Task): boolean {
        return task.status == TaskStatus.PENDING;
    }

    protected isTaskInProgress(task: Task): boolean {
        return task.status == TaskStatus.IN_PROGRESS;
    }

    protected startTask(task: Task) {
        const taskToStart: CreateTask = {
            title: task.title,
            description: task.description,
            status: TaskStatus.IN_PROGRESS,
            targetUserId: task.user?.id
        };

        this.taskService.modifyTask(taskToStart, task.id).subscribe({
            next: () => {
                this.fetchTaskList();
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    protected markAsDone(task: Task) {
        const taskToStart: CreateTask = {
            title: task.title,
            description: task.description,
            status: TaskStatus.DONE,
            targetUserId: task.user?.id
        };

        this.taskService.modifyTask(taskToStart, task.id).subscribe({
            next: () => {
                this.fetchTaskList();
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    protected viewTaskDetail(id: number) {
    this.router.navigate(['/tasks', id]);
}
}
