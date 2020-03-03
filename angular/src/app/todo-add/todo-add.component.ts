import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

import { TodoService }  from '../services/todo.service';
interface IEvent{
  id:number;
  title:string;
  status_id: number;
}

@Component({
  selector: 'todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.scss']
})
export class TodoAddComponent implements OnInit {
  submitted = false;
  todo:any = { title : '', status_id: 1};
  editTodo:any;
  editFrm = false;
  // events:IEvent[];
  @Output() eventClicked = new EventEmitter<Event>();
  @Output() eventClickedEdit = new EventEmitter<Event>();
  @Input() event: Event;
  // todo = [{
  //   title : ''
  // }];
  constructor(private todoService:TodoService) { }
  events:IEvent[]=[]

  ngOnInit() {
    
  }

  onSubmit() { this.submitted = true; }

  add() {
    this.todoService.addTodo(this.todo).subscribe(
      data => {
        this.events = data;
        this.eventClicked.emit(data);
        this.showSuccess("successfully added!");
      },
      err => {
        console.error('Oops:', err.message);
      }
    );
  }
  childEventClicked_(event){
   if(event.type === "edit"){
      console.log(event)
      this.editFrm = true;
      this.editTodo = event;
   }
   if(event.type === "delete"){
      console.log(event);
      this.editTodo = event;
      // this.editFrm = true;
      // this.editTodo = event;
    }
  }
  edit() {
    this.editFrm = false;
    this.todoService.editTodo(this.editTodo).subscribe(
      data => {
        console.log(data)
        this.events = data;
        this.eventClickedEdit.emit(data); 
        this.showSuccess("successfully edited!");
      },
      err => {
        console.error('Oops:', err.message);
      }
    );
  }
  showSuccess(data) {
    // this.toastr.success(data, 'Success', {
    //   positionClass : 'toast-bottom-center',
    //   timeOut: 1500
    // });
  }
  // eventCalled(){
  //   event: Event;
  //   this.eventClicked.emit(event);
  // }

}
