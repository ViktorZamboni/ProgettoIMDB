import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

export interface UserData {
  uid: string;
  email: string;
  displayName?: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  currentUser: User | null = null;

  constructor() {
      onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  async login(email: string, password: string): Promise<User> {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    return result.user;
  }

  async register(email: string, password: string, displayName: string): Promise<User> {
    const result = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = result.user;

    const userRef = doc(this.firestore, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: displayName || user.email,
      createdAt: new Date()
    });

    return user;
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  async getUserData(uid: string): Promise<any> {
    const userRef = doc(this.firestore, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    }

    return null;
  }
}