import { Routes } from "@angular/router";
import { Administrador } from "./pages/administrador/administrador";
import { ClienteComponent } from "./pages/administrador/cliente-component/cliente-component";
import { TecnicoComponent } from "./pages/administrador/tecnico-component/tecnico-component";
import { OrdenComponent } from "./pages/administrador/orden-component/orden-component";
import { OrdenFilterComponent } from "./pages/administrador/orden-filter-component/orden-filter-component";

export const lisRutas: Routes = [
  {
    path: '',
    component: Administrador,
    children: [
      { path: 'clientes', component:  ClienteComponent},
      { path: 'tecnicos', component: TecnicoComponent },
      { path: 'ordenes', component: OrdenComponent },
      { path: 'odenes-filter', component: OrdenFilterComponent },
    ],
  },
];
