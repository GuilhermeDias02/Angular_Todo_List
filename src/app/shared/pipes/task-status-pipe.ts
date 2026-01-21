import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../core/task/interfaces/task';

@Pipe({
    name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {

    transform(taskStatus: TaskStatus): string {
        if (taskStatus) {
            switch (taskStatus) {
                case TaskStatus.PENDING:
                    return "À faire";
                case TaskStatus.IN_PROGRESS:
                    return "En cours";
                case TaskStatus.DONE:
                    return "Finie";
                default:
                    return "";
            }
        }
        return '';
    }

}
