import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../core/comments/services/comments';
import { AuthService } from '../../core/auth/services/auth-service';

@Component({
  selector: 'app-comments',
  imports: [ReactiveFormsModule],
  templateUrl: './commentslist.html',
  styleUrl: './commentslist.css',
})
export class Commentslist {
  protected commentService : CommentService = inject(CommentService);
  public authService : AuthService = inject(AuthService);
  private fb : FormBuilder = new FormBuilder();
  CommentForm : FormGroup = this.fb.group({
    message : ['', Validators.required],
  })

  onSubmit(){
    const user = this.authService.currentUser()
    if (user){
    this.commentService.createComment(1, this.CommentForm.value.message, user.id )
      }
  }

}
