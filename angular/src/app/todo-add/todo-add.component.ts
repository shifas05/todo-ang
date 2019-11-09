import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
  editTodo:any = {id:'',title:'',status_id:'' };
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
      },
      err => {
        console.error('Oops:', err.message);
      }
    );
  }
  // eventCalled(){
  //   event: Event;
  //   this.eventClicked.emit(event);
  // }

}
