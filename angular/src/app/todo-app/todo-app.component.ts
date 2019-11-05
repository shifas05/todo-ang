import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {
  public clickedEvent: Event;
  constructor() { }

  ngOnInit() {
  }

  childEventClicked(event: Event) {
    this.clickedEvent = event;
    console.log(this.clickedEvent);
  }

}
