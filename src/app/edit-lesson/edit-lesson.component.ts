import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Lesson } from '../shared/model/lesson';
import { LessonsService } from '../shared/model/lessons.service';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css'],
})
export class EditLessonComponent implements OnInit {
  lesson: Lesson;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lessonService: LessonsService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ lesson }) => (this.lesson = lesson));
  }

  save(form) {
    this.lessonService.saveLesson(this.lesson.$key, form.value).subscribe(
      () => {
        this.router.navigate(['lessons', this.lesson.url]);
      },
      err => {
        alert(err);
      }
    );
  }
}
