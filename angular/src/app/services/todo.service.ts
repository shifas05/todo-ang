import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import {environment} from "../../environments/environment";
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiURL = `${environment.api}`;
  constructor(private http: HttpClient ) { }

  addTodo(data):Observable<any>{
    // console.log(`${this.apiURL}post_test`);
    return this.http.post(`${this.apiURL}add_todo`,data,httpOptions);
  }

  getTodoData():Observable<any> {
    return this.http.get(`${this.apiURL}get_todo`);
  }

  editTodo(data):Observable<any>{
    // console.log(`${this.apiURL}post_test`);
    return this.http.post(`${this.apiURL}edit_todo`,data,httpOptions);
  }
  deleteTodo(data):Observable<any> {
    return this.http.post(`${this.apiURL}delete_todo`,data,httpOptions);
  }
}
