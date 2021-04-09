import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-respuesta-reclamo-dialog',
  templateUrl: './respuesta-reclamo-dialog.component.html',
  styleUrls: ['./respuesta-reclamo-dialog.component.css']
})


export class RespuestaReclamoDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<RespuestaReclamoDialogComponent>, private _auth: AuthService, @Inject(MAT_DIALOG_DATA) private data) { }


  respuestas = []
  respuesta = undefined

  ngOnInit() {
    
    this.respuestas = this.data.data.respuestas
    
  }

  close() {
    this.dialogRef.close();
  }

  enviar_respuesta(){

    this._auth.responder_reclamo(this.data).subscribe()
    // console.log(this.data.data._id)
    // console.log(this.respuesta)
    // console.log(this.respuestas.length)
  }

}
