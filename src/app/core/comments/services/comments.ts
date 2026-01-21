import { Injectable, signal, WritableSignal } from '@angular/core';
import { Comment } from '../interfaces/comments';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  public Comments : WritableSignal<Comment[]> = signal([])

  deleteComment(comment_id: string) {
    this.Comments.update(currentComments => currentComments.filter(comment => comment.id !== comment_id))
  }

  createComment(task_id : number, message : string, created_by : number){
    this.Comments().push({
      id: uuidv4(),
      task_id : task_id,
      message : message,
      created_at: new Date().toISOString(),
      created_by : created_by
    })
  }

}
