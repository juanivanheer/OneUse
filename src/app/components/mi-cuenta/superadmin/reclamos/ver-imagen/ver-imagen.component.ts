import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-imagen',
  templateUrl: './ver-imagen.component.html',
  styleUrls: ['./ver-imagen.component.css']
})
export class VerImagenComponent implements OnInit {

  constructor(private _auth: AuthService, private dialogRef: MatDialogRef<VerImagenComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

  mostrar: boolean = false;
  hayImagen: boolean = false;

  ngOnInit() {
    this._auth.get_reclamo_imagen(this.data._id).subscribe(
      res => {
        this.hayImagen = true;
        this.mostrar = true;
      },
      err => {
        this.hayImagen = false;
        this.mostrar = true;
      }
    )
  }

  close() {
    this.dialogRef.close();
  }

}
