import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task, TaskStatus } from '../../../core/task/interfaces/task';
import { TaskService } from '../../../core/task/services/task-service';
import { Router } from '@angular/router';
import { TaskStatusPipe } from '../../../shared/pipes/task-status-pipe';
import { TaskStatusColorPipe } from '../../../shared/pipes/task-status-color-pipe';

@Component({
    selector: 'app-task-detail',
    imports: [DatePipe, TaskStatusPipe, TaskStatusColorPipe],
    templateUrl: './task-detail.html',
    styleUrl: './task-detail.css',
})
export class TaskDetail implements OnInit {
    @Input() id!: number;
    
    private taskService = inject(TaskService);
    private router = inject(Router);
    
    protected task = signal<Task | null>(null);
    protected isLoading = signal(true);
    protected errorMessage = signal<string | null>(null);
    
    ngOnInit() {
        if (this.id) {
            this.fetchTask();
        }
    }
    
    private fetchTask() {
        this.taskService.getTask(this.id).subscribe({
            next: (task: Task) => {
                this.task.set(task);
                this.isLoading.set(false);
            },
            error: (error) => {
                this.errorMessage.set('Erreur lors du chargement de la tâche');
                this.isLoading.set(false);
                console.error(error);
            }
        });
    }
    
    protected goBack() {
        this.router.navigate(['/tasks']);
    }
    
    protected isTaskPending(status: TaskStatus): boolean {
        return status === TaskStatus.PENDING;
    }
    
    protected isTaskInProgress(status: TaskStatus): boolean {
        return status === TaskStatus.IN_PROGRESS;
    }
    
    protected isTaskDone(status: TaskStatus): boolean {
        return status === TaskStatus.DONE;
    }
}