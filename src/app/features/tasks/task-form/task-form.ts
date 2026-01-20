import { Component, Inject, inject } from '@angular/core';
import { TaskService } from '../../../core/task/services/task-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTask, Task, TaskStatus } from '../../../core/task/interfaces/task';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth-service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
    private taskService = inject(TaskService);
    protected authService = inject(AuthService);
    protected fb: FormBuilder = inject(FormBuilder);
    protected router: Router = inject(Router);

    protected taskForm = this.fb.nonNullable.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        status: [TaskStatus.PENDING],
        targetUserId: [0],
    });

    protected onSubmit() {
        if (this.taskForm.invalid) {
            // this.errorMessage.set('Please fill in all fields.');
            return;
        }

        const formData: CreateTask = this.taskForm.value as CreateTask;
        this.taskService.createTask(formData)
            // .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (newTask: Task) => {
                    if (newTask) {
                        this.router.navigate(['/tasks']);
                    }
                },
                error: (error) => {
                    // this.errorMessage.set(error.error.message);
                    console.log(error)
                }
            });
    }
}
