import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../core/task/interfaces/task';

@Pipe({
  name: 'taskStatusColor',
})
export class TaskStatusColorPipe implements PipeTransform {

    transform(taskStatus: TaskStatus): string {
        if (taskStatus) {
            switch (taskStatus) {
                case TaskStatus.PENDING:
                    return "bg-red-400 text-red-100"
                case TaskStatus.IN_PROGRESS:
                    return "bg-yellow-200 text-yellow-700";
                case TaskStatus.DONE:
                    return "bg-green-300 text-green-700 line-through";
                default:
                    return "bg-red-400 text-red-100";
            }
        }
        return 'bg-red-400 text-red-100';
    }

}
