import { Routes } from '@angular/router';
import { tokenGuard } from './core/guards/token.guard';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./Views/home/home.component'),
  },
  {
    path: 'parking',
    title: 'Estacionamiento',
    loadComponent: () => import('./Views/parking/parking.component'),
    canActivate: [tokenGuard],
  },
  /*{
    path: 'aboutUs',
    title: 'Sobre nosotros',
    loadComponent: () => import('./Views/about-us/about-us.component'),
  },*/
  {
    path: 'dashboard',
    title: 'Dashaboard',
    loadComponent: () => import('./Views/dashboard/user-dashboard/user-dashboard.component'),
    canActivate: [tokenGuard],
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        title: 'Mi perfíl',
        loadComponent: () => import('./Views/dashboard/profile/profile.component'),
        canActivate: [tokenGuard],
      },
      {
        path: 'profileSettings',
        title: 'Opciones de la cuenta',
        loadComponent: () => import('./Views/dashboard/profile-settings/profile-settings.component'),
        canActivate: [tokenGuard],
      },
      {
        path: 'myVehicles',
        title: 'Mis vehículos',
        loadComponent: () => import('./Views/dashboard/my-vehicles/my-vehicles.component'),
        canActivate: [tokenGuard],
      },
      {
        path: 'incidentAlerts',
        title: 'Alertas de incidentes',
        loadComponent: () => import('./Views/dashboard/alerts/alerts.component'),
        canActivate: [tokenGuard],
      },
      {
        path: 'addVehicle',
        title: 'Agregar vehículo',
        loadComponent: () => import('./Views/dashboard/add-vehicle/add-vehicle.component'),
        canActivate: [tokenGuard],
      },
      {
        path: 'allSensors',
        title: 'Todos los registros',
        loadComponent: () => import('./Views/dashboard/all-registros/all-registros.component'),
        canActivate: [tokenGuard],
      }
    ],
  },
  {
    path: 'login',
    title: 'Iniciar sesion',
    loadComponent: () => import('./Views/login/login.component'),
  },
  {
    path: 'sign-Up',
    title: 'Sign-Up',
    loadComponent: () => import('./Views/sign-up/sign-up.component'),
  },
  //No pongan rutas despues de estas dos, luego no funcionan
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '**',
    loadComponent: () =>
      import('./Views/page-not-found/page-not-found.component'),
  },
];
