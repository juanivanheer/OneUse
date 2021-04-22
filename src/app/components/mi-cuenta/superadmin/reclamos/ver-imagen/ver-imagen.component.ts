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
    
    this._auth.get_all_reclamos().subscribe(
      res => {
        console.log(this.data)
        for (let index = 0; index < res.reclamos.length; index++) {
          const element = res.reclamos[index];
          if(element._id == this.data._id && this.data.imagen_reclamo != undefined){
            this.hayImagen = true;
          }
        }
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
