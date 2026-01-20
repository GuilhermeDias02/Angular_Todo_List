import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Header } from '../../../shared/header/header';

@Component({
    selector: 'app-task-list',
    imports: [ReactiveFormsModule],
    templateUrl: './task-list.html',
    styleUrl: './task-list.css',
})
export class TaskList {
    
}
