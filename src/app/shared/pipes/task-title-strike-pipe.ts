import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../core/task/interfaces/task';

@Pipe({
    name: 'taskTitleStrike',
})
export class TaskTitleStrikePipe implements PipeTransform {

    transform(taskStatus: TaskStatus): string {
        if (taskStatus == TaskStatus.DONE) {
            return "line-through";
        }
        return "";
    }

}
