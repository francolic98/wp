import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { User } from "../../types";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(protected http: HttpClient)
  { 
    this.getUser();
  }

  getUser()
  {
    this.http.get<User>("/api/user")
      .subscribe((user: User) => 
      {
        this.user.next(user);
      });
  }
}
