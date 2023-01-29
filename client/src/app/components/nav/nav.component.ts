import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, observable, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { Page, User } from '../../types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  User$: BehaviorSubject<User | null>;

  userIcon = faUser
  isMenuCollapsed = true;

  constructor (protected userService: UserService) { }

  ngOnInit() 
  {
    this.User$ = this.userService.user;
  }
}
