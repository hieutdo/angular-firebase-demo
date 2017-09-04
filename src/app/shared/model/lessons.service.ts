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
}
