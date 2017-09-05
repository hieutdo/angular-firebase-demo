import { Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatabaseReference } from 'angularfire2/database/interfaces';
import { Observable, Subject } from 'rxjs/Rx';

import { Lesson } from './lesson';

@Injectable()
export class LessonsService {
  sdkDb: DatabaseReference;

  constructor(
    private db: AngularFireDatabase,
    private firebaseApp: FirebaseApp
  ) {
    this.sdkDb = firebaseApp.database().ref();
  }

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

  createNewLesson(courseId: string, lesson: any): Observable<any> {
    const newLessonKey = this.sdkDb.child('lessons').push().key;
    const dataToSave = {
      [`lessons/${newLessonKey}`]: Object.assign({}, lesson, { courseId }),
      [`lessonsPerCourse/${courseId}/${newLessonKey}`]: true,
    };
    return this.firebaseUpdate(dataToSave);
  }

  saveLesson(lessonId: string, lesson: Lesson): Observable<any> {
    const lessonToSave = Object.assign({}, lesson);
    delete lessonToSave.$key;
    return this.firebaseUpdate({
      [`lessons/${lessonId}`]: lessonToSave,
    });
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();
    this.sdkDb.update(dataToSave).then(
      val => {
        subject.next(val);
        subject.complete();
      },
      err => {
        subject.error(err);
        subject.complete();
      }
    );
    return subject.asObservable();
  }
}
