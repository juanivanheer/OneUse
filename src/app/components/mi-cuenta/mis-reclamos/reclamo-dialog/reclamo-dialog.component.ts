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
    if(this.data.data.estado_reclamo == 'Cerrado'){
      document.getElementById('txt_rta').style.display = 'none';
      document.getElementById('btn_rta').style.display = 'none';
    }
    this.respuestas = this.data.data.respuestas

  }

  close() {
    this.dialogRef.close();
  }

  enviar_respuesta(){

    
    let next_rta = this.respuestas.length + 1;
    let usr = this.data.data.usuario_reclamo
    this.data.data.estado_reclamo = 'Esperando respuesta del sitio'
    
    
    this.data.data.respuestas.push({ emisor_respuesta: usr, respuesta: this.respuesta, nro_rta: next_rta });
    this._auth.responder_reclamo(this.data.data).subscribe()

  }

}
