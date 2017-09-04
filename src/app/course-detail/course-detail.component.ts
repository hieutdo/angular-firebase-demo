import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Course } from '../shared/model/course';
import { CoursesService } from '../shared/model/courses.service';
import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  pageSize = 3;

  courseUrl: string;
  lessons: Lesson[];

  course$: Observable<Course>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.courseUrl = this.route.snapshot.params['id'];
    this.course$ = this.coursesService.findCourseByUrl(this.courseUrl);
    this.coursesService
      .loadFirstLessonsPage(this.courseUrl, this.pageSize)
      .subscribe(lessons => (this.lessons = lessons));
  }

  previous() {
    const lessonKey = this.lessons[0].$key;
    this.coursesService
      .loadPreviousLessonsPage(this.courseUrl, lessonKey, this.pageSize)
      .subscribe(lessons => (this.lessons = lessons));
  }

  next() {
    const lessonKey = this.lessons[this.lessons.length - 1].$key;
    this.coursesService
      .loadNextLessonsPage(this.courseUrl, lessonKey, this.pageSize)
      .subscribe(lessons => (this.lessons = lessons));
  }

  navigateToLesson(lesson: Lesson) {
    this.router.navigate(['lessons', lesson.url]);
  }
}
