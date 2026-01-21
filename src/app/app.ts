import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/header/header";
import { TasksService } from './core/services/tasks.service';
import { Task } from './shared/models/task.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly tasksService = inject(TasksService);

  protected readonly title = signal('FrontAngular');

  constructor() {
    this.initTasks();
  }

  private initTasks(): void {
    const demoTasks: Task[] = [
      {
        id: crypto.randomUUID(),
        title: 'Découvrir le Dashboard',
        description: 'Afficher les statistiques des tâches',
        status: 'DONE',
        assignedTo: 'test',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        title: 'Finaliser le projet Angular',
        description: 'Préparer la soutenance',
        status: 'TODO',
        assignedTo: 'test',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    ];


    if (this.tasksService.tasks().length === 0) {
      this.tasksService.setAll(demoTasks);
    }
  }
}

