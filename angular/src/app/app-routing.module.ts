import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'payment',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/payment/payment.module').then((m) => m.PaymentModule)
      },
      {
        path: 'dragzone',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/dropZone/dropzone.module').then((m) => m.DropzoneModule)
      },
      {
        path: 'product',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/product/product.module').then((m) => m.ProductModule)
      },
      {
        path: 'full-calender',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/fullCalender/fullCalender.module').then((m) => m.FullCalenderModule)
      },
      {
        path: 'graphql',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/graphql/graphql.module').then((m) => m.GraphQLModule)
      },
      {
        path: 'real-time-chat',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/realTimeChat/realTimeChat.module').then((m) => m.RealTimeChatModule)
      },
      {
        path: 'group',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./views/group/group.module').then((m) => m.GroupModule)
      },
     
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
