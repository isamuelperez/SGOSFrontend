import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'administrador',
        loadChildren: () => import('./rutas.routing').then((r) => r.lisRutas),
  },
  { path: '**', redirectTo: '/administrador', pathMatch: 'full' },
];
