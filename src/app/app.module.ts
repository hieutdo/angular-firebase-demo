import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { firebaseConfig } from '../environments/firebase.config';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LessonsService } from './shared/model/lessons.service';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [LessonsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
