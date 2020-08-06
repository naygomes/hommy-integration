import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../services/comment-service/comment.service'; //importando a classe do comment.service.ts


@Component({
  selector: 'app-republica',
  templateUrl: './republica.page.html',
  styleUrls: ['./republica.page.scss'],
})
export class RepublicaPage implements OnInit {

  commentForm: FormGroup;
  editCommentForm: FormGroup;
  editMode = false;
  commentId: number;
  comments = [];
  republic_id:number = JSON.parse(localStorage.getItem('republica')).id; //vai no local storage e pega somente o id do objeto.

  constructor(
              public formbuilder: FormBuilder,
              public commentService: CommentService
             ) { 
    this.commentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
    this.editCommentForm = this.formbuilder.group({
      text: [null, [Validators.required, Validators.maxLength(140)]],
    });
  }

  ngOnInit() {
    this.listComment(this.republic_id);
  }

  listComment(republic_id) {
    this.commentService.listComment(republic_id).subscribe(
      (res) => {
        console.log(res);
        this.comments=res.comments;
      }, (err) => {
        console.log(err);
      }
    );
  }

  sendComment(form){
    console.log(form);
    console.log(form.value);
    let body = form.value;
    body.republic_id = this.republic_id;
    let name = localStorage.getItem('username'); // não precisa do JSON.parse pois é uma string, não um objeto.
    body.username = name;

    this.commentService.postComment(body).subscribe(
      (res) => {
        console.log(res);
        this.listComment(this.republic_id);
        this.commentForm.reset();
      }, (err) => {
        console.log(err);
      } //verificar se ele teve alguma resposta ou se deu algum erro de requisição no back.

    );
  }
  
  toggleEdit(id){
    this.editMode = true;
    this.commentId = id;
    console.log(id);
  }

  sendEditComment(form){
    console.log(form);
    console.log(form.value);
    this.editMode = false;
    this.commentService.updateComment(this.commentId, form.value).subscribe(
      (res) => {
        console.log(res);
        this.listComment(this.republic_id);
        this.editCommentForm.reset();
      }, (err) => {
        console.log(err);
      }
    );
  }

  deleteComment(id){
    this.commentService.deleteComment(id).subscribe(
      (res) => {
        console.log(res);
        console.log('Mais que cancelado: ' + id);
        this.listComment(this.republic_id);
      }, (err) => {
        console.log(err);
      }
    );
  }

}
