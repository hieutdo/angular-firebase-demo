import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Lesson } from './lesson';
import { LessonsService } from './lessons.service';

@Injectable()
export class LessonResolver implements Resolve<Lesson> {
  constructor(private lessonService: LessonsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Lesson> {
    return this.lessonService.findLessonByUrl(route.params['id']).first();
  }
}
