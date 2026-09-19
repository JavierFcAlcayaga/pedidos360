import {
  Routes
} from '@angular/router';

import {
  MsalGuard
} from '@azure/msal-angular';

import {
  Login
} from './pages/login/login';

import {
  Home
} from './pages/home/home';

import {
  Pedidos
} from './pages/pedidos/pedidos';

import {
  NuevoPedido
} from './pages/nuevo-pedido/nuevo-pedido';

import { Productos } from './pages/productos/productos';

import { NuevoProducto } from './pages/nuevo-producto/nuevo-producto';

export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'home',
    component: Home,
    canActivate: [
      MsalGuard
    ]
  },

  {
    path: 'pedidos',
    component: Pedidos,
    canActivate: [
      MsalGuard
    ]
  },

  {
    path: 'pedidos/nuevo',
    component: NuevoPedido,
    canActivate: [
      MsalGuard
    ]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'productos',
    component: Productos,
    canActivate: [
      MsalGuard
    ]
  },

  {
  path: 'productos/nuevo',
  component: NuevoProducto,
  canActivate: [MsalGuard]
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];