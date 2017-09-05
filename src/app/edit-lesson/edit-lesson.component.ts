import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Lesson } from '../shared/model/lesson';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css'],
})
export class EditLessonComponent implements OnInit {
  lesson: Lesson;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(({ lesson }) => (this.lesson = lesson));
  }
}
