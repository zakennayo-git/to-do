import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  error: string;

  constructor(public angularFire: AngularFireAuth, private router: Router) {
    angularFire.authState.subscribe(user => {
      this.user = user;
      console.log('user jest ', this.user);
    });
  }

  login(email: string, passwors: string) {
    this.angularFire.auth
    .signInWithEmailAndPassword(email, passwors)
    .then(user => {
      this.router.navigate(['/home']);
    })
    .catch(err => {
      if (err.code == 'auth/wrong-password') {
        this.error = 'Podałeś złe hasło';
      }
      if (err.code == 'auth/user-not-found') {
        this.error = 'Użytkownik nie został znaleziony';
      }
    });
  }
  signup(email: string, passwors: string) {
    this.angularFire.auth
    .createUserWithEmailAndPassword(email, passwors)
    .then(user => {
      this.router.navigate(['/home']);
    })
    .catch(err => {
      if (err.code == 'auth/weak-password') {
        this.error = 'Hasło musi zawierać conajmniej 6 znaków';
      }
      if (err.code == 'auth/email-already-in-use') {
        this.error = 'Ten e-mail jest zarejestrowany';
      }
    });
  }
  logout() {
    this.angularFire.auth.signOut();
    this.router.navigate(['/login']);
  }
}
