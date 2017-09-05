import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LessonsService } from '../shared/model/lessons.service';

@Component({
  selector: 'app-new-lesson',
  templateUrl: './new-lesson.component.html',
  styleUrls: ['./new-lesson.component.css'],
})
export class NewLessonComponent implements OnInit {
  courseId: string;
  courseUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonsService
  ) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.queryParams['courseId'];
    this.courseUrl = this.route.snapshot.params['id'];
  }

  save(form) {
    this.lessonService.createNewLesson(this.courseId, form.value).subscribe(
      () => {
        this.router.navigate(['courses', this.courseUrl]);
      },
      err => {
        alert(err);
      }
    );
  }
}
