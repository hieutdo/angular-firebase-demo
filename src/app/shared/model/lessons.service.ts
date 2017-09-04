import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

import { Lesson } from './lesson';

@Injectable()
export class LessonsService {
  constructor(private db: AngularFireDatabase) {}

  findAllLessons(): Observable<Lesson[]> {
    return this.db.list('lessons').map(Lesson.fromJsonArray);
  }

  findLessonByUrl(url: string): Observable<Lesson> {
    return this.db
      .list('lessons', {
        query: { orderByChild: 'url', equalTo: url },
      })
      .map(lessons => Lesson.fromJson(lessons[0]));
  }

  loadPreviousLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.db
      .list(`lessonsPerCourse/${courseId}`, {
        query: {
          orderByKey: true,
          endAt: lessonId,
          limitToLast: 2,
        },
      })
      .map(lessons => lessons[0].$key)
      .switchMap(lessonKey => this.db.object(`lessons/${lessonKey}`))
      .map(Lesson.fromJson);
  }

  loadNextLesson(courseId: string, lessonId: string): Observable<Lesson> {
    return this.db
      .list(`lessonsPerCourse/${courseId}`, {
        query: {
          orderByKey: true,
          startAt: lessonId,
          limitToFirst: 2,
        },
      })
      .map(lessons => lessons[1].$key)
      .switchMap(lessonKey => this.db.object(`lessons/${lessonKey}`))
      .map(Lesson.fromJson);
  }
}
