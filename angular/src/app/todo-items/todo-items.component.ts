import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  events:IEvent[]=[]
  
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
    this.events = item;
    // console.log(this.events)
    this.eventClicked.emit(item);
  }
}
