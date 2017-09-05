import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
  }

  signup(email: string, password: string): Observable<User> {
    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  login(email: string, password: string): Observable<User> {
    return Observable.fromPromise(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
