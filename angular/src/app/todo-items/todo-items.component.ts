import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';

import { TodoService }  from '../services/todo.service';
interface IEvent{
  title:string;
  id:number;
  status_id:number;
}

@Component({
  selector: 'todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  @Input() event: Event;
  @Output() eventClicked = new EventEmitter<Event>();

  todoData :any = [];
  editTodoData:any = {};
  events:IEvent[]=[];
  p: number = 1;
  
  constructor(private todoService :TodoService) { }

  ngOnInit() {
    this.getTodo();
   
  }

  getTodo() {
    this.todoService.getTodoData().subscribe(
      data => {
        this.todoData = data
        console.log(this.todoData);
      }
    );
    
  }

  childEventClicked(event){
    console.log(event)
    this.todoData.unshift(event);
  }
  childEventClickedEdit(event){
    this.getTodo();
    // this.editTodoData = event;
  }
 

  edit(item) {
    // this.events = item;
    item.type = "edit";
    // console.log(this.events)
    this.eventClicked.emit(item);
  }
  delete(item) {
    // console.log(item);
    item.type = "delete";
    // this.events = item;
  
    this.todoService.deleteTodo(item).subscribe(
      data => { 
        this.todoData = this.todoData.filter(h => h !== item);
        this.showSuccess("successfully deleted!");
      }
    )

  }

  showSuccess(data) {
    // this.toastr.success(data, 'Success', {
    //   positionClass : 'toast-bottom-center',
    //   timeOut: 1500
    // });
  }
}
