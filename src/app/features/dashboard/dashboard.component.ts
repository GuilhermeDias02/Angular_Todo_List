import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TasksService } from '../../core/services/tasks.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule],
  template: `
    <section class="page">
      <header class="header">
        <h1>Dashboard</h1>
        <p class="subtitle">Analytics des tâches</p>
      </header>

      <div class="grid">
        <div class="card">
          <div class="kpi-title">Total tâches</div>
          <div class="kpi-value">{{ totalTasks() }}</div>
        </div>

        <div class="card">
          <div class="kpi-title">Tâches terminées (DONE)</div>
          <div class="kpi-value">{{ doneTasks() }}</div>
        </div>

        <div class="card">
          <div class="kpi-title">Mes tâches</div>
          <div class="kpi-value">{{ myTasks() }}</div>
          @if (!isConnected()) {
            <a class="link" routerLink="/login">Se connecter pour voir “Mes tâches”</a>
          }
        </div>
      </div>

      <div class="card progress-card">
        <div class="row">
          <div class="kpi-title">Progression</div>
          <div class="percent">{{ completionPercent() }}%</div>
        </div>

        <div class="bar">
          <div class="bar-fill" [style.width.%]="completionPercent()"></div>
        </div>

        <div class="hint">
          {{ doneTasks() }} / {{ totalTasks() }} tâches terminées
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page { max-width: 980px; margin: 0 auto; padding: 24px; }
    .header { margin-bottom: 18px; }
    h1 { margin: 0; font-size: 28px; }
    .subtitle { margin: 6px 0 0; opacity: .75; }

    .grid { display: grid; gap: 16px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .card { background: #fff; border: 1px solid #e6e6e6; border-radius: 12px; padding: 16px; }
    .kpi-title { font-size: 13px; opacity: .7; }
    .kpi-value { font-size: 34px; font-weight: 700; margin-top: 8px; }
    .link { display: inline-block; margin-top: 8px; font-size: 13px; text-decoration: underline; }

    .progress-card { margin-top: 16px; }
    .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
    .percent { font-weight: 700; }

    .bar { height: 10px; background: #f0f0f0; border-radius: 999px; overflow: hidden; margin-top: 10px; }
    .bar-fill { height: 100%; background: #3b82f6; border-radius: 999px; transition: width 200ms ease; }
    .hint { margin-top: 10px; font-size: 13px; opacity: .75; }

    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
    }
  `],
})
export class DashboardComponent {
  private readonly tasksService = inject(TasksService);
  private readonly authService = inject(AuthService);

  readonly isConnected = this.authService.isAuthenticated;

  readonly totalTasks = computed(() => this.tasksService.tasks().length);

  readonly doneTasks = computed(
    () => this.tasksService.tasks().filter(t => t.status === 'DONE').length
  );

  readonly myTasks = computed(() => {
    const user = this.authService.currentUser();
    if (!user) return 0;
    return this.tasksService.tasks().filter(t => t.assignedTo === user.username).length;
  });

  readonly completionPercent = computed(() => {
    const total = this.totalTasks();
    if (total === 0) return 0;
    return Math.round((this.doneTasks() / total) * 100);
  });
}
