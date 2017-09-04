import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Course } from '../shared/model/course';
import { CoursesService } from '../shared/model/courses.service';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  courseUrl: string;
  lessons: Lesson[];

  course$: Observable<Course>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findCourseByUrl(this.courseUrl);
    this.coursesService
      .loadFirstLessonsPage(this.courseUrl, 3)
      .subscribe(lessons => (this.lessons = lessons));
  }

  previous() {
    this.coursesService
      .loadPreviousLessonsPage(this.courseUrl, this.lessons[0].$key, 3)
      .subscribe(lessons => (this.lessons = lessons));
  }

  next() {
    this.coursesService
      .loadNextLessonsPage(
        this.courseUrl,
        this.lessons[this.lessons.length - 1].$key,
        3
      )
      .subscribe(lessons => (this.lessons = lessons));
  }
}
