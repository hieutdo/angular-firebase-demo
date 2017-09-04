import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

import { Course } from './course';

@Injectable()
export class CoursesService {
  constructor(private db: AngularFireDatabase) {}

  findAllCourses(): Observable<Course[]> {
    return this.db.list('courses').map(Course.fromJsonArray);
  }
}
