import { Component } from '@angular/core';

import { navItems } from './_nav';
import { AuthService } from '../../service/auth.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {

  public navItems: any;
  public currentUser: any;
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser()
    if (this.currentUser.role == 'user') {

      const index = _.findIndex(navItems, { name: 'Add Group' })
      navItems.splice(index, 1);
      this.navItems = navItems;
    } else {
      this.navItems = navItems;
    }
    console.log('navItems', this.navItems);
  }
}
