import { Route } from '@angular/router';

import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import { NewLessonComponent } from './new-lesson/new-lesson.component';

export const routerConfig: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'courses',
    children: [
      {
        path: ':id',
        children: [
          {
            path: '',
            component: CourseDetailComponent,
          },
          {
            path: 'new',
            component: NewLessonComponent,
          },
        ],
      },
      {
        path: '',
        component: CoursesComponent,
      },
    ],
  },
  {
    path: 'lessons/:id',
    component: LessonDetailComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
