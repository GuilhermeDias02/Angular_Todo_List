import { Injectable, computed, signal } from '@angular/core';
import { Task } from '../../shared/models/task.model';

const STORAGE_KEY = 'tasks';

function readTasks(): Task[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Task[];
  } catch {
    return [];
  }
}

function writeTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

@Injectable({ providedIn: 'root' })
export class TasksService {
  private readonly _tasks = signal<Task[]>(readTasks());

  readonly tasks = this._tasks.asReadonly();

  reload(): void {
    this._tasks.set(readTasks());
  }

  setAll(tasks: Task[]): void {
    this._tasks.set(tasks);
    writeTasks(tasks);
  }

  ensureSeed(seed: Task[]): void {
  if (this._tasks().length === 0) {
    this.setAll(seed);
  }
  }

  add(task: Task): void {
  const next = [task, ...this._tasks()];
  this.setAll(next);
  }

  remove(id: string): void {
  const next = this._tasks().filter(t => t.id !== id);
  this.setAll(next);
  }

  update(id: string, patch: Partial<Task>): void {
  const next = this._tasks().map(t =>
    t.id === id
      ? { ...t, ...patch, updatedAt: new Date().toISOString() }
      : t
  );
  this.setAll(next);
  }



}
