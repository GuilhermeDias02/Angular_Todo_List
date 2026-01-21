import { effect, Injectable, signal, WritableSignal } from '@angular/core';
import { Comment } from '../interfaces/comments';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  public Comments : WritableSignal<Comment[]> = signal(this.getStoredComments())

  constructor() {
    effect(() => {
      localStorage.setItem('comments_data', JSON.stringify(this.Comments()));
    });
  }

  private getStoredComments(): Comment[] {
    const saved = localStorage.getItem('comments_data');
    return saved ? JSON.parse(saved) : [];
  }


  deleteComment(comment_id: string) {
    this.Comments.update(currentComments => currentComments.filter(comment => comment.id !== comment_id))
  }

  updateComment(comment_id: string, message: string) {
    this.Comments.update(currentComments =>
      currentComments.map(comment =>
        comment.id === comment_id ? { ...comment, message } : comment
      )
    )
  }

  createComment(task_id: number, message: string, created_by: number, username : string) {
    this.Comments.update(current => [
      {
        id: uuidv4(),
        task_id: task_id,
        username: username,
        message: message,
        created_at: new Date().toISOString(),
        created_by: created_by
      },
      ...current
    ]);
  }

}
