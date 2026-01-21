import { Component, Inject, inject, signal, WritableSignal } from '@angular/core';
import { TaskService } from '../../../core/task/services/task-service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateTask, Task, TaskStatus } from '../../../core/task/interfaces/task';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth-service';
import { UserService } from '../../user/services/user-service';
import { User } from '../../../core/auth/interfaces/user';
import { TaskFormService } from '../service/task-form-service';

@Component({
    selector: 'app-task-form',
    imports: [ReactiveFormsModule],
    templateUrl: './task-form.html',
    styleUrl: './task-form.css',
})
export class TaskForm {
    private taskService = inject(TaskService);
    protected taskFromService = inject(TaskFormService);
    protected authService = inject(AuthService);
    private userService = inject(UserService);
    protected fb: FormBuilder = inject(FormBuilder);
    protected router: Router = inject(Router);
    protected users = signal(new Array<User>);

    protected taskForm = this.fb.nonNullable.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        targetUserId: [0],
    });

    get title() {
        return this.taskForm.get('title');
    }

    get description() {
        return this.taskForm.get('description');
    }

    ngOnInit() {
        this.userService.getUsers().subscribe({
            next: (users: Array<User>) => {
                if (users) {
                    this.users.set(users);
                }
            },
            error: (error) => {
                console.log(error);
            }
        })
    }

    protected onSubmit() {
        if (this.taskForm.invalid) {
            // this.errorMessage.set('Please fill in all fields.');
            return;
        }

        const formData: CreateTask = this.taskForm.value as CreateTask;
        if (this.taskFromService.isModify() && this.taskFromService.taskToModify()) {
            const id = this.taskFromService.taskToModify()?.id;
            if (!id || id <= 0) return;
            this.taskService.modifyTask(formData, id)
                // .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe({
                    next: (modifiedTask: Task) => {
                        if (modifiedTask) {
                            this.router.navigate(['/tasks']);
                        }
                    },
                    error: (error) => {
                        // this.errorMessage.set(error.error.message);
                        console.log(error)
                    }
                });
        } else {
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

    onCancel() {
        this.router.navigate(['/tasks']);
    }

    // public setTaskModification(id: number) {
    //     if (id > 0) {
    //         this.taskService.getTask(id).subscribe({
    //             next: (task: Task) => {
    //                 this.taskToModify.set(task);
    //                 this.isModify.set(true);
    //             },
    //             error: (error) => {
    //                 console.log(error);
    //             }
    //         })
    //     }

    // }
}
