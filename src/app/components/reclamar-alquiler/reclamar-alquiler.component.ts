import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
//import cancelaciones from './cancelaciones.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { SingletonService } from '../singleton.service';
import motivos from './motivos.json';
import { take } from 'rxjs/operators';

declare var require: any;
var sortJsonArray = require('sort-json-array');


export interface Motivos {
  value: string;
  viewValue: string;
  }

@Component({
  selector: 'app-confirmacion',
  templateUrl: './reclamar-alquiler.component.html',
  styleUrls: ['./reclamar-alquiler.component.css']

})
export class ReclamarAlquilerComponent implements OnInit {

  //Para traer los datos de la BD en el form
  public user = {};
  emailLogueado = localStorage.getItem("email");

  //Para armar JSON
  hoy = new Date();
  motivosCancelacion: Motivos[];
  reclamoData = { tipo: undefined, motivo: undefined, usuario_reclamo: this.emailLogueado, 
    codigoLocatarioDevolucionIngresado: undefined,
    codigoLocatarioIngresado: undefined,
    codigoPropietarioDevolucionIngresado: undefined,
    codigoPropietarioIngresado: undefined,
    id_publicacion:undefined,
    estado_reclamo: undefined,
    imagen: undefined,
    usuario_propietario: undefined,
    usuario_locatario: undefined,
    resolucion: undefined,
    titulo: undefined,
    respuestas: 
    [] 
  } 
  datosAlquiler: any;

  constructor(private _auth: AuthService, private singletoon: SingletonService, private _snackBar: MatSnackBar, private _adapter: DateAdapter<any>, private singleton: SingletonService, private _router: Router) { }

  ngOnInit() {
    if (this.verificarInicioSesion() == false) {
      return;
    }
    this._auth.datosAlquiler.pipe(take(1))
    .subscribe(mensaje => this.datosAlquiler = mensaje);
    console.log('hola')
    console.log(this.datosAlquiler);
    this.crearJSONmotivos();
  }

  cerrarSesion() {
    this.singletoon.cerrarSesion();
  }

  verificarInicioSesion(): boolean {
    if (this.singleton.getInicioSesion() == false) {
      this._router.navigate(['/*']);
      return false;
    }
    return true;
  }


  devolucionPagoCancelacion(pago){

    let fecha_hoy = new Date()
    let fecha_pago = new Date(pago)
    let diferencia_fecha = fecha_hoy.getTime() - fecha_pago.getTime();
    let horas_transcurridas = diferencia_fecha / 1000 / 60 / 60;

    if(horas_transcurridas <= 12)
      return true
    else
      return false

  }

  devolucionNoContacto(pago){

    let fecha_hoy = new Date()
    let fecha_pago = new Date(pago)
    let diferencia_fecha = fecha_hoy.getTime() - fecha_pago.getTime();
    let horas_transcurridas = diferencia_fecha / 1000 / 60 / 60;

    if(horas_transcurridas <= 24)
      return true
    else
      return false

  }

  reclamar() {

    
    this._auth.datosAlquiler.pipe(take(1))
    .subscribe(mensaje => this.datosAlquiler = mensaje);
    let motivo = this.reclamoData.motivo
    let tipo = this.reclamoData.tipo
    let f_pago = this.datosAlquiler.updatedAt
    let f_creac = this.datosAlquiler.createdAt
    let pagado = this.datosAlquiler.fuePagado
    let cerrar_reclamo = true
    let codigo_locatario = this.datosAlquiler.codigoLocatarioIngresado;
    let codigo_propietario = this.datosAlquiler.codigoPropietarioIngresado


    
    switch (tipo) {
      //Si fue pagado, no se ingreso ningun 
      case "He pagado el alquiler pero ya no estoy interesado en el objeto":
        if(!this.devolucionPagoCancelacion(f_pago)){

          this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
            codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
            codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
            codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
            codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
            id_publicacion:this.datosAlquiler.id_publicacion,
            estado_reclamo: 'Cerrado',
            imagen: this.datosAlquiler.imagen,
            usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
            usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
            resolucion: 1,
            titulo: this.datosAlquiler.titulo_publicacion,
            respuestas: [{
              emisor_respuesta: this.emailLogueado,
              respuesta: motivo,
              nro_rta: 1
          
              },{
              emisor_respuesta: 'Equipo de OneUse',
              respuesta: 'Lamentamos mucho que ya no desee el objeto. Han pasado mas de 12hs desde que ud pagó el objeto, por lo establecido en nuestras politicas el alquiler queda cancelado y no hay reembolso de dinero. Gracias por utilizar OneUse',
              nro_rta: 2
              }] 
          }

        }else{

          this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
            codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
            codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
            codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
            codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
            id_publicacion:this.datosAlquiler.id_publicacion,
            estado_reclamo: 'Cerrado',
            imagen: this.datosAlquiler.imagen,
            usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
            usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
            resolucion: 2,
            titulo: this.datosAlquiler.titulo_publicacion,
            respuestas: [{
              emisor_respuesta: this.emailLogueado,
              respuesta: motivo,
              nro_rta: 1
          
              },{
              emisor_respuesta: 'Equipo de OneUse',
              respuesta: 'Lamentamos mucho que ya no desee el objeto. Han pasado menos de 12hs desde que ud pagó el objeto, por lo establecido en nuestras politicas el alquiler queda cancelado y se te reembolsara el dinero. Gracias por utilizar OneUse',
              nro_rta: 2
              }] 
          }

        }
        
        break;

      case "No me puedo contactar con el propietario/locatario":
          if(!this.devolucionPagoCancelacion(f_creac)){

            this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
              codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
              codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
              codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
              codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
              id_publicacion:this.datosAlquiler.id_publicacion,
              estado_reclamo: 'Respondido por OneUse',
              imagen: this.datosAlquiler.imagen,
              usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
              usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
              resolucion: 3,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho que no puedas contactarte con la otra parte. Han pasado mas de 24hs desde que ud realizo el alquiler, por lo establecido en nuestras politicas nos contactaremos con la otra parte para saber que fue lo que paso y dentro de 12hs tendra una nueva respuesta. Gracias por utilizar OneUse',
                nro_rta: 2
                }] 
            }
  
          }else{
  
            this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
              codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
              codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
              codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
              codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
              id_publicacion:this.datosAlquiler.id_publicacion,
              estado_reclamo: 'Cerrado',
              imagen: this.datosAlquiler.imagen,
              usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
              usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
              resolucion: 4,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho que no puedas contactarte con la otra parte. Han pasado menos de 24hs desde que ud realizo el alquiler, por lo establecido en nuestras politicas la otra parte aun tiene tiempo para contactarse. Gracias por utilizar OneUse',
                nro_rta: 2
                }] 
            }

            cerrar_reclamo = false;
  
          }

        break;

      case "El producto que alquilé no estaba en las mismas condiciones que se mostraban en las fotos o no funciona correctamente":
          if(!codigo_locatario){
  
            this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
              codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
              codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
              codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
              codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
              id_publicacion:this.datosAlquiler.id_publicacion,
              estado_reclamo: 'Cerrado',
              imagen: this.datosAlquiler.imagen,
              usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
              usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
              resolucion: 5,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho que el objeto no haya sido lo que usted esperaba. En un lapso de entre 24 y 48hs se le reembolsara el dinero. Gracias por utilizar OneUse',
                nro_rta: 2
                }] 
            }
  
          }else{
  
            this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
              codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
              codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
              codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
              codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
              id_publicacion:this.datosAlquiler.id_publicacion,
              estado_reclamo: 'Cerrado',
              imagen: this.datosAlquiler.imagen,
              usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
              usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
              resolucion: 6,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho que el objeto no haya sido lo que usted esperaba. Ud ingresó el codigo de conformidad de locatario, por lo que segun nuestra politica el alquiler queda cancelado pero no tiene derecho a un reembolso. Gracias por utilizar OneUse',
                nro_rta: 2
                }] 
            }
  
          }

        break;

        case "He tenido un problema con el objeto y no puedo cumplir / No deseo alquilarlo a esta persona":
          if(!codigo_propietario){
  
            this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
              codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
              codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
              codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
              codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
              id_publicacion:this.datosAlquiler.id_publicacion,
              estado_reclamo: 'Cerrado',
              imagen: this.datosAlquiler.imagen,
              usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
              usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
              resolucion: 7,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho que hayas tenido un problema. Se le devolvera el dinero del alquiler al locatario. Gracias por utilizar OneUse',
                nro_rta: 2
                }] 
            }
  
          }

        break;

        //
        
    
      default:
        break;
    }

    console.log(this.reclamoData)
                     

    this._auth.registrar_reclamo(this.reclamoData).subscribe(
      
      res => {
        
      },
      err => {
        console.log(err)
        
      }
    )

    // Dejo esto comentado, es lo que cambia de estado del alquiler a en proceso de reclamo para poder hacer muchos reclamos de 1 sola publi
    
    // this._auth.registrar_reclamado(this.datosAlquiler._id).subscribe(
    //   res => {
        
    //   },
    //   err => {
    //     console.log(err)
        
    //   }


    // )


    this._router.navigate(['/reclamo-exito']);


  }



  crearJSONmotivos() {
    let index, JSONmotivos = motivos;
    let arreglo = [];
    for (index in JSONmotivos) {
      arreglo.push({ 'value': JSONmotivos[index].id, 'viewValue': JSONmotivos[index].descripción })
    }
    this.motivosCancelacion = sortJsonArray(arreglo, 'value', 'asc');
  }


}



