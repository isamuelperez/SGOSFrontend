import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-administrador',
  imports: [RouterOutlet, MenubarModule],
  templateUrl: './administrador.html',
  styleUrl: './administrador.css',
})
export class Administrador {
  items: MenuItem[] = [
    {
      label: 'Gestión de Clientes',
      icon: 'pi pi-calendar-plus',
      routerLink: ['/administrador/clientes'],
    },
    {
      label: 'Gestión de Tecnicos',
      icon: 'pi pi-book',
      routerLink: ['/administrador/tecnicos'],
    },

    {
      label: 'Gestión de Ordenes',
      icon: 'pi pi-book',
      routerLink: ['/administrador/ordenes'],
    },
    {
      label: 'Buscar Orden',
      icon: 'pi pi-book',
      routerLink: ['/administrador/odenes-filter'],
    }
  ];

  logOut(): void {
    
  }
}
