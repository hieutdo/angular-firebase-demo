import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'app-lessons-list',
  templateUrl: './lessons-list.component.html',
  styleUrls: ['./lessons-list.component.css'],
})
export class LessonsListComponent implements OnInit {
  @Input() lessons: Lesson[];
  @Output() onClick = new EventEmitter<Lesson>();

  constructor() {}

  ngOnInit() {}

  handleClick(lesson: Lesson) {
    this.onClick.emit(lesson);
  }
}
