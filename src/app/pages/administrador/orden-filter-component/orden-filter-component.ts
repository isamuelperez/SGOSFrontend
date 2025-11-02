import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Cliente } from '../../../core/services/cliente';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { SelectModule } from 'primeng/select';
import { Orden } from '../../../core/services/orden';
import { Tecnico } from '../../../core/services/tecnico';

@Component({
  selector: 'app-orden-filter-component',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
    SelectModule
  ],
  templateUrl: './orden-filter-component.html',
  styleUrl: './orden-filter-component.css',
})
export class OrdenFilterComponent {

  myForm!: FormGroup;
  ordenes = signal<any>([]);
  clientes = signal<any>([]);
  tecnicos = signal<any>([]);
  showDialog = signal<boolean>(false);
  titleDialog: string = '';
  isEdit = signal<boolean>(false);
  submitted = signal<boolean>(false);
  objetRegister: any = null;
  id = signal<number>(0);

    estados = signal<any[]>([
    {
      value: 'Pendiente', label: 'Pendiente'
    }, 
    {
      value: 'En progreso', label: 'En progreso'
    }, 
    {
      value: 'Finalizada', label: 'Finalizada'
    }
  ])

  constructor(
    private _ordenService: Orden,
    private _clienteService: Cliente,
    private _tecnicoService: Tecnico,
    private messageService: MessageService,
    private fb: FormBuilder
  ) { }

  
  ngOnInit() {
    this.myForm = this.fb.group({
      estado: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tecnicoAsignado: ['', [Validators.required]],
      clienteAsociado: ['', [Validators.required]],
    });

    this.load();
  }

  load() {
    this._ordenService.getAll().subscribe({
      next: (resp) => {
        console.log(resp)
        if (resp.status === 200) {
          this.ordenes.set(resp.data);
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Fallo',
          detail: 'Error al obtener los registros',
          life: 3000,
        });
      },
    });

    this._clienteService.getAll().subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          this.clientes.set(resp.data);
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Fallo',
          detail: 'Error al obtener los registros',
          life: 3000,
        });
      },
    });

    this._tecnicoService.getAll().subscribe({
      next: (resp) => {
        if (resp.status === 200) {
          this.tecnicos.set(resp.data);
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'danger',
          summary: 'Fallo',
          detail: 'Error al obtener los registros',
          life: 3000,
        });
      },
    });
  }

}
