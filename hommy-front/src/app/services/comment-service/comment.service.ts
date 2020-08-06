import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //"tipo" de resposta, com comportamento de espera
import { Observable } from 'rxjs'; //módulo responsável por fazer a requisição

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  apiUrl:string = 'http://localhost:8000/api/'; //salva a URL numa variável

  constructor(public http: HttpClient) { } //Assim que a página for carregada, todas as informações que estão no constructor serão carregadas.

  postComment(data): Observable<any> {
    return this.http.post(this.apiUrl + 'createComment', data); //pega a instância do http, usando a função post. Dentro do parênteses, chama a rota do método.'createComment' é o nome da função na Controller. 
  }

  listComment(id): Observable<any> {
    return this.http.get(this.apiUrl + 'showRepublicWithComments/' + id); //pega a instância do http, usando a função get. Dentro do parênteses, chama a rota do método.'showRepublicWithComments/{id}' é o nome da função na Controller. 
  }

  updateComment(id, data): Observable<any> {
    return this.http.put(this.apiUrl + 'updateComment/' + id, data);
  }

  deleteComment(id): Observable<any> {
    return this.http.delete(this.apiUrl + 'deleteComment/' + id);
  }
  
}
