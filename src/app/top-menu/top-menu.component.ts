import { Component, OnInit } from '@angular/core';

import { AuthService } from '../shared/security/auth.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css'],
})
export class TopMenuComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  logout() {
    this.authService.logout();
  }
}
