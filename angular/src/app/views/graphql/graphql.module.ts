import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { GraphQLComponent } from './graphql.component';


const routes: Routes = [
  {
    path: '',
    component: GraphQLComponent,
    data: {
      title: 'graphQl'
    }
  }
];
const uri = 'http://localhost:3000/graphql'
export function createApollo(httpLink: HttpLink)  {
  return {
    link: httpLink.create( { uri } ),
    cache: new InMemoryCache(),
    credentials: 'same-origin',

  };
}

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ApolloModule


  ],
  exports: [RouterModule, HttpLinkModule, ApolloModule],

  declarations: [GraphQLComponent],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
 ],
})
export class GraphQLModule {
}
