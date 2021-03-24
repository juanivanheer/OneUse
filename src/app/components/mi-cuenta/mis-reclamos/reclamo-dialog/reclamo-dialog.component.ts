import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-reclamo-dialog',
  templateUrl: './reclamo-dialog.component.html',
  styleUrls: ['./reclamo-dialog.component.css']
})
export class ReclamoDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ReclamoDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  respuestas = []
  respuesta = undefined

  ngOnInit() {
    console.log(this.data)
    this.respuestas = this.data.data.respuestas

  }

  close() {
    this.dialogRef.close();
  }

  enviar_respuesta(){
    console.log(this.data.data._id)
    console.log(this.respuesta)
    console.log(this.respuestas.length)
  }

}
