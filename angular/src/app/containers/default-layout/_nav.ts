import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  // {
  //   name: 'Payment',
  //   url: '/payment',
  //   iconComponent: { name: 'cil-star' },
  
  // },
  // {
  //   name: 'DragZone',
  //   url: '/dragzone',
  //   iconComponent: { name: 'cil-star' },
  
  // },
  // {
  //   name: 'Cart',
  //   url: '/product',
  //   iconComponent: { name: 'cilList' },
  
  // },
  // {
  //   name: 'Calender',
  //   url: '/full-calender',
  //   iconComponent: { name: 'cilList' },
  
  // },
  // {
  //   name: 'graphql',
  //   url: '/graphql',
  //   iconComponent: { name: 'cilList' },
  
  // },

  {
    name: 'Add Group',
    url: '/group',
    iconComponent: { name: 'cilList' },
  
  },
  {
    name: 'chatModule',
    url: '/real-time-chat',
    iconComponent: { name: 'cilList' },
  
  },
  
  {
    title: true,
    name: 'Extras'
  },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register'
  //     },
     
  //     {
  //       name: 'Error 500',
  //       url: '/500'
  //     }
  //   ]
  // },
];
