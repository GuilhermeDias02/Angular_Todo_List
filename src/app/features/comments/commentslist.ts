import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommentService } from '../../core/comments/services/comments';
import { AuthService } from '../../core/auth/services/auth-service';
import { computed } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule, FormsModule, DatePipe],
  templateUrl: './commentslist.html',
  styleUrl: './commentslist.css',
})
export class Commentslist {
  @Input() task_id!: number;
  protected commentService : CommentService = inject(CommentService);
  public authService : AuthService = inject(AuthService);
  private fb : FormBuilder = new FormBuilder();
  CommentForm : FormGroup = this.fb.group({
    message : ['', Validators.required],
  })
  editingCommentId: string | null = null;
  editMessage: string = '';

  filteredComments = computed(() => {
    return this.commentService.Comments()
      .filter(comment => comment.task_id === this.task_id);
  });

  onSubmit(){
    const user = this.authService.currentUser()
    if (user){
    this.commentService.createComment(this.task_id, this.CommentForm.value.message, user.id, user.username)
      this.CommentForm.reset()
      }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  isOwner(comment_created_by: number): boolean {
    const user = this.authService.currentUser();
    return user ? user.id === comment_created_by : false;
  }

  startEdit(commentId: string, currentMessage: string) {
    this.editingCommentId = commentId;
    this.editMessage = currentMessage;
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.editMessage = '';
  }

  saveEdit(commentId: string) {
    if (this.editMessage.trim()) {
      this.commentService.updateComment(commentId, this.editMessage.trim());
      this.cancelEdit();
    }
  }

  deleteComment(commentId: string) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(commentId);
    }
  }
}
