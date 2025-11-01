import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Cliente } from '../../../core/services/cliente';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Tecnico } from '../../../core/services/tecnico';

@Component({
  selector: 'app-tecnico-component',
  imports: [
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    TableModule,
  ],
  templateUrl: './tecnico-component.html',
  styleUrl: './tecnico-component.css',
})
export class TecnicoComponent {

  myForm!: FormGroup;

  tecnicos = signal<any>([]);
  showDialog = signal<boolean>(false);
  titleDialog: string = '';
  isEdit = signal<boolean>(false);
  submitted = signal<boolean>(false);
  objetRegister: any = null;
  id = signal<number>(0);

  constructor(
    private _tecnicoService: Tecnico,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      nombreCompleto: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
    });

    this.load();
  }

  load() {
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

  openDialog() {
    this.myForm.reset();
    this.id.set(0);
    this.objetRegister = null;
    this.submitted.set(false);
    this.isEdit.set(false);
    this.titleDialog = 'Registrar';
    this.showDialog.set(true);
  }

  hideDialog() {
    this.showDialog.set(false);
  }

  edit(item: any): void {
    this.objetRegister = { ...item };
    this.id.set(item.id);
    this.isEdit.set(true);
    this.myForm.patchValue(this.objetRegister);
    this.titleDialog = 'Modificar';
    this.showDialog.set(true);
  }

  save(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (this.objetRegister !== null) {
      this.update();
      return;
    }

    this.create();
  }

  create(): void {
    this._tecnicoService.create(this.myForm.value).subscribe((resp) => {
      if (resp.status == 201) {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: resp.data,
          life: 3000,
        });

        this.myForm.reset();
        this.showDialog.set(false);
        this.load();
        return;
      }
      this.messageService.add({
        severity: 'danger',
        summary: 'Error',
        detail: 'Error en el registro',
        life: 3000,
      });
      this.myForm.reset();
      this.showDialog.set(true);
    });
  }

  update(): void {
    this._tecnicoService
      .update(this.id(), this.myForm.value)
      .subscribe((resp) => {
        if (resp.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: resp.data,
            life: 3000,
          });

          this.myForm.reset();
          this.showDialog.set(false);
          this.load();
          return;
        }
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail: 'Error en el registro',
          life: 3000,
        });
        this.myForm.reset();
        this.showDialog.set(true);
      });
  }

  delete(id: number) {
    this._tecnicoService
      .delete(id)
      .subscribe((resp) => {
        if (resp.status == 200) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: resp.data,
            life: 3000,
          });

          this.myForm.reset();
          this.showDialog.set(false);
          this.load();
          return;
        }
        this.messageService.add({
          severity: 'danger',
          summary: 'Error',
          detail:  resp.data,
          life: 3000,
        });
        this.myForm.reset();
        this.showDialog.set(true);
      });
  }
}
