import { Component, OnInit } from '@angular/core';

import { Lesson } from '../shared/model/lesson';
import { LessonsService } from '../shared/model/lessons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allLessons: Lesson[];
  filtered: Lesson[];

  constructor(private lessonsService: LessonsService) {}

  ngOnInit() {
    this.lessonsService
      .findAllLessons()
      .subscribe(lessons => (this.allLessons = this.filtered = lessons));
  }

  search(term: string) {
    this.filtered = this.allLessons.filter(lesson =>
      lesson.description.toLowerCase().includes(term.toLowerCase())
    );
  }
}
