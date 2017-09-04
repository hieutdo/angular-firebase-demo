import { FirebaseListFactoryOpts } from 'angularfire2/database/interfaces';
import { query } from '@angular/core/src/animation/dsl';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

import { Course } from './course';
import { Lesson } from './lesson';

@Injectable()
export class CoursesService {
  constructor(private db: AngularFireDatabase) {}

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses').map(Course.fromJsonArray);
  }

  findCourseByUrl(courseUrl: string): Observable<Course> {
    return this.db
      .list('courses', { query: { orderByChild: 'url', equalTo: courseUrl } })
      .map(courses => courses[0]);
  }

  findLessonKeysPerCourseUrl(
    courseUrl: string,
    options: FirebaseListFactoryOpts = {}
  ): Observable<string[]> {
    return this.findCourseByUrl(courseUrl)
      .switchMap(course =>
        this.db.list(`lessonsPerCourse/${course.$key}`, options)
      )
      .map(lspc => lspc.map(lcm => lcm.$key));
  }

  findLessonsForLessonKeys(
    lessonsKeys$: Observable<string[]>
  ): Observable<Lesson[]> {
    return lessonsKeys$
      .map(lspc =>
        lspc.map(lessonKey => this.db.object(`lessons/${lessonKey}`))
      )
      .flatMap(fbojs => Observable.combineLatest(fbojs));
  }

  findLessonsForCourse(courseUrl: string): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(
      this.findLessonKeysPerCourseUrl(courseUrl)
    );
  }

  loadFirstLessonsPage(
    courseUrl: string,
    pageSize: number
  ): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(
      this.findLessonKeysPerCourseUrl(courseUrl, {
        query: {
          limitToFirst: pageSize
        }
      })
    );
  }

  loadPreviousLessonsPage(
    courseUrl: string,
    lessonKey: string,
    pageSize: number
  ): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(
      this.findLessonKeysPerCourseUrl(courseUrl, {
        query: {
          endAt: lessonKey,
          limitToLast: pageSize + 1,
          orderByKey: true
        }
      })
    ).map(lessons => lessons.slice(0, lessons.length - 1));
  }

  loadNextLessonsPage(
    courseUrl: string,
    lessonKey: string,
    pageSize: number
  ): Observable<Lesson[]> {
    return this.findLessonsForLessonKeys(
      this.findLessonKeysPerCourseUrl(courseUrl, {
        query: {
          startAt: lessonKey,
          limitToFirst: pageSize + 1,
          orderByKey: true
        }
      })
    ).map(lessons => lessons.slice(1));
  }
}
