import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';

import { TaskService } from '../../core/task/services/task-service';
import { Task, TaskStatus } from '../../core/task/interfaces/task';
import { AuthService } from '../../core/auth/services/auth-service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  private taskService = inject(TaskService);
  private authService = inject(AuthService);

  // 1) Récupérer toutes les tâches
  tasks$ = this.taskService.getTasks();

  // 2) KPI total
  total$ = this.tasks$.pipe(map((tasks: Task[]) => tasks.length));

  // 3) KPI DONE
  done$ = this.tasks$.pipe(
    map((tasks: Task[]) => tasks.filter(t => t.status === TaskStatus.DONE).length)
  );

  // 4) KPI Mes tâches (assignées à moi)

  mine$ = this.tasks$.pipe(
    map((tasks: Task[]) => {
      const me = this.authService.currentUser(); // signal
      const myId = me?.id;
      if (!myId) return 0;

      return tasks.filter(t => t.user?.id === myId).length;
    })
  );

  // 5) Bonus : progression en %
  progress$ = this.tasks$.pipe(
    map((tasks: Task[]) => {
      const total = tasks.length;
      const done = tasks.filter(t => t.status === TaskStatus.DONE).length;
      return total === 0 ? 0 : Math.round((done / total) * 100);
    })
  );
}
