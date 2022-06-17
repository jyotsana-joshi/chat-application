import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { AuthService } from '../../service/auth.service';
import { Observable, map } from 'rxjs';
import gql from 'graphql-tag';
import { Course, Query } from './types';
const get_courses = gql`
{
  getSingleUser {
    courses{
      name,
      number
    }
  }
}
`

@Component({
  selector: 'app-graphql',
  templateUrl: './graphql.component.html',
  styleUrls: ['./graphql.component.scss']
})
export class GraphQLComponent {

  public courses!: Observable<any>;
  constructor(
    public router: Router,
    public authService: AuthService,
    public fb: FormBuilder,
    public apollo: Apollo
  ) {

  }


  ngOnInit(): void {
    this.courses = this.apollo.watchQuery<Query>({
      query: get_courses
    }).valueChanges
      .pipe(
        map(result => {
          console.log('result', result);

        })
      );


  }

}





