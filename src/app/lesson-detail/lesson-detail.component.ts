import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Lesson } from '../shared/model/lesson';
import { LessonsService } from '../shared/model/lessons.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css'],
})
export class LessonDetailComponent implements OnInit {
  lesson: Lesson;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonsService
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap(params => this.lessonService.findLessonByUrl(params['id']))
      .subscribe(lesson => (this.lesson = lesson));
  }

  previous() {
    this.lessonService
      .loadPreviousLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  next() {
    this.lessonService
      .loadNextLesson(this.lesson.courseId, this.lesson.$key)
      .subscribe(this.navigateToLesson.bind(this));
  }

  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }
}
