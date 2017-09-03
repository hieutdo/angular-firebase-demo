import { Component, OnInit } from '@angular/core';

import { Lesson } from '../shared/model/lesson';
import { LessonsService } from '../shared/model/lessons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  lessons: Lesson[];

  constructor(private lessonsService: LessonsService) {}

  ngOnInit() {
    this.lessonsService
      .findAllLessons()
      .do(console.log)
      .subscribe(lessons => (this.lessons = lessons));
  }
}
