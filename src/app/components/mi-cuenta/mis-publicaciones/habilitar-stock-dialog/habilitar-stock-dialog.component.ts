import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-habilitar-stock-dialog',
  templateUrl: './habilitar-stock-dialog.component.html',
  styleUrls: ['./habilitar-stock-dialog.component.css']
})
export class HabilitarStockDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<HabilitarStockDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  stockFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(3),
    Validators.min(0)
  ]);

  ngOnInit() {
  }

  update(cantidad) {
    if (parseInt(cantidad) != 0 && String(cantidad) != "" && String(cantidad).length < 4 && cantidad != undefined && cantidad != null) {
      this.data.publicacion.cantidadDisponible = cantidad;
      this.data.publicacion.estado = "ACTIVA";
      this._auth.update_publicacion(this.data.publicacion._id, this.data.publicacion).subscribe(
        res => {
          this.ngOnInit();
          this.dialogRef.close();
        },
      )
    }
  }

    close() {
      this.dialogRef.close();
    }

  }
