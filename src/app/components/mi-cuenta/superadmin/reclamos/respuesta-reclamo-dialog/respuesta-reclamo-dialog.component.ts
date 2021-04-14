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

    if(this.data.data.estado_reclamo == 'Cerrado'){
      document.getElementById('txt_rta').style.display = 'none';
      document.getElementById('btn_rta').style.display = 'none';
      document.getElementById('close').style.display = 'none';
      document.getElementById('lbl_cerrado').style.display = 'none';
    }
    
    this.respuestas = this.data.data.respuestas
    
  }

  close() {
    this.dialogRef.close();
  }

  enviar_respuesta(){

    let cerrar_reclamo = document.getElementById('close') as HTMLInputElement;
    let next_rta = this.respuestas.length + 1;

    console.log(cerrar_reclamo.checked)
    if(cerrar_reclamo.checked)
      this.data.data.estado_reclamo = 'Cerrado'
    else
      this.data.data.estado_reclamo = 'Respondido por OneUse'

    
    this.data.data.respuestas.push({ emisor_respuesta: 'Equipo de OneUse', respuesta: this.respuesta, nro_rta: next_rta });
     
    //  console.log(this.respuesta)
    //  console.log(this.respuestas.length)
    console.log(this.data.data)
    this._auth.responder_reclamo(this.data.data).subscribe()

  }

}
