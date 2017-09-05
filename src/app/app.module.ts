import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { firebaseConfig } from '../environments/firebase.config';
import { AppComponent } from './app.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { LessonFormComponent } from './lesson-form/lesson-form.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';
import { NewLessonComponent } from './new-lesson/new-lesson.component';
import { routerConfig } from './router.config';
import { CoursesService } from './shared/model/courses.service';
import { LessonsService } from './shared/model/lessons.service';
import { SafeUrlPipe } from './shared/security/safe-url.pipe';
import { TopMenuComponent } from './top-menu/top-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LessonsListComponent,
    TopMenuComponent,
    CoursesComponent,
    CourseDetailComponent,
    LessonDetailComponent,
    SafeUrlPipe,
    NewLessonComponent,
    LessonFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routerConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [LessonsService, CoursesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
