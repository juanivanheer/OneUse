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
  styleUrls: ['./reclamar-alquiler.component.css'],
})
export class ReclamarAlquilerComponent implements OnInit {

  //Para traer los datos de la BD en el form
  public user = {};
  emailLogueado = localStorage.getItem("email");
  
  //tipo_reclamo = {pagado: undefined, codigos_ingresados: undefined}

  //Para subir archivos
  public filesToUpload: Array<File>;

  

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
    let reclama
    let tipo_reclamo = {pagado: undefined, codigos_ingresados: undefined}

    if (this.verificarInicioSesion() == false) {
      return;
    }
    this._auth.datosAlquiler.pipe(take(1))
    .subscribe(mensaje => this.datosAlquiler = mensaje);
    console.log('hola')
    console.log(this.datosAlquiler);

    let quien_reclama = localStorage.getItem("email");
    let alquiler = JSON.parse(localStorage.getItem("alquiler"));
  
    this._auth.user_data(quien_reclama).subscribe(
      res => {
      
      if(this.datosAlquiler.name_usuarioLocatario == res.name)
        reclama = 'Locatario'
      else
        reclama = 'Propietario'

      if(this.datosAlquiler.fuePagado && !this.datosAlquiler.codigoLocatarioIngresado && !this.datosAlquiler.codigoPropietarioIngresado){
        tipo_reclamo.pagado = true
        tipo_reclamo.codigos_ingresados = false
      }else{
        tipo_reclamo.pagado = true
        tipo_reclamo.codigos_ingresados = true
      }
      
        
      this.crearJSONmotivos(reclama,tipo_reclamo);  
      console.log(reclama)
    
    })

    
    
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


  crearJSONmotivos(reclama, tipo_reclamo) {


    let index, JSONmotivos = motivos;
    let arreglo = [];
    
    for (index in JSONmotivos) {

      if(JSONmotivos[index].id == 9)
        arreglo.push({ 'value': JSONmotivos[index].id, 'viewValue': JSONmotivos[index].descripción })

      if(reclama == 'Locatario' && tipo_reclamo.pagado && !tipo_reclamo.codigos_ingresados && (JSONmotivos[index].id > 0 && JSONmotivos[index].id < 4))
        arreglo.push({ 'value': JSONmotivos[index].id, 'viewValue': JSONmotivos[index].descripción })
      
      if(reclama == 'Locatario' && tipo_reclamo.pagado && tipo_reclamo.codigos_ingresados && JSONmotivos[index].id == 4 )
        arreglo.push({ 'value': JSONmotivos[index].id, 'viewValue': JSONmotivos[index].descripción })

      if(reclama == 'Propietario' && tipo_reclamo.pagado && !tipo_reclamo.codigos_ingresados && (JSONmotivos[index].id > 4 && JSONmotivos[index].id < 7 ))
        arreglo.push({ 'value': JSONmotivos[index].id, 'viewValue': JSONmotivos[index].descripción })

      if(reclama == 'Propietario' && tipo_reclamo.pagado && tipo_reclamo.codigos_ingresados && (JSONmotivos[index].id >= 7  && JSONmotivos[index].id < 9 ))
        arreglo.push({ 'value': JSONmotivos[index].id, 'viewValue': JSONmotivos[index].descripción })
    
    }

    this.motivosCancelacion = sortJsonArray(arreglo, 'value', 'asc');
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
    let codigo_propietario = this.datosAlquiler.codigoPropietarioIngresado;
    let codigo_propietario_devolucion = this.datosAlquiler.codigoPropietarioDevolucionIngresado;


    
    switch (tipo) {
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

      case "No me puedo contactar con el propietario para retirar el objeto":
          if(!this.devolucionNoContacto(f_pago)){

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
                respuesta: 'Lamentamos mucho que no puedas contactarte con el propietario. Han pasado mas de 24hs desde que ud realizo el alquiler, por lo establecido en nuestras politicas nos contactaremos con el propietario para saber que fue lo que paso y dentro de las proximas 48hs tendra una nueva respuesta. Gracias por utilizar OneUse',
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
              estado_reclamo: 'Respondido por OneUse',
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
                respuesta: 'Lamentamos mucho que no puedas contactarte con el propietario. Han pasado menos de 24hs desde que ud realizo el alquiler, por lo establecido en nuestras politicas el propietario aun tiene tiempo para contactarse. Gracias por utilizar OneUse',
                nro_rta: 2
                }] 
            }

            
  
          }

        cerrar_reclamo = false;
      break;

      case "El objeto que alquilé no estaba en las mismas condiciones que se mostraban en las fotos o no funciona correctamente":
        
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
                respuesta: 'Lamentamos mucho que el objeto no haya sido lo que usted esperaba. Entre las proximas 24 y 48hs se le reembolsara el dinero. Gracias por utilizar OneUse',
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

      case "No me puedo contactar con el propietario para devolver el objeto":
            
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
              resolucion: 8,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Gracias por avisar a OneUse de lo ocurrido. Avisaremos al propietario para que se comunique contigo lo antes posible, pasadas las 72hs habiles se te liberara el dinero en garantia.',
                nro_rta: 2
                }] 
            }
      break;

      case "No me puedo contactar con el locatario para entregarlo":

          if(!this.devolucionNoContacto(f_pago)){

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
              resolucion: 9,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho que no puedas contactarte con el locatario. Han pasado mas de 24hs desde que se realizo el alquiler, por lo establecido en nuestras politicas nos contactaremos con el locatario para saber que fue lo que paso y pronto tendra una nueva respuesta. Gracias por utilizar OneUse',
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
              estado_reclamo: 'Esperando respuesta del sitio',
              imagen: this.datosAlquiler.imagen,
              usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
              usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
              resolucion: 10,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho que no puedas contactarte con el locatario. Han pasado menos de 24hs desde que el locatario realizo el alquiler, por lo establecido en nuestras politicas el locatario aun tiene tiempo para contactarse. Gracias por utilizar OneUse',
                nro_rta: 2
                }] 
            }

            cerrar_reclamo = false;

          }
      break;
        
      case "El locatario no se contacto conmigo para devolverme el objeto":
            
            this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
              codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
              codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
              codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
              codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
              id_publicacion:this.datosAlquiler.id_publicacion,
              estado_reclamo: 'Esperando respuesta del sitio',
              imagen: this.datosAlquiler.imagen,
              usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
              usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
              resolucion: 11,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho lo que paso. Intentaremos contactarnos con el propietario lo antes posible y volveremos a contactarnos contigo en las proximas 48hs.',
                nro_rta: 2
                }] 
            }
      break;

      case "El producto fue devuelto en malas condiciones":
            
          if(!codigo_propietario_devolucion){
  
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
              resolucion: 12,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho la experiencia que tuvo. Analizaremos su caso y en un lapso de entre 48 y 72hs tendra una respuesta favorable a su caso. Gracias por utilizar OneUse',
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
              resolucion: 13,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                },{
                emisor_respuesta: 'Equipo de OneUse',
                respuesta: 'Lamentamos mucho la experiencia que tuvo. Ud ingreso su codigo de devolucion de propietario, por lo que segun nuestra politica ud no tiene derecho a reembolso por este reclamo. Gracias por utilizar OneUse',
                nro_rta: 2
                }] 
            }
  
          }

      break;

      case "Otro (Especificar que pasó)":
            this.reclamoData = { tipo: tipo, motivo: motivo, usuario_reclamo: this.emailLogueado, 
              codigoLocatarioDevolucionIngresado: this.datosAlquiler.codigoLocatarioDevolucionIngresado,
              codigoLocatarioIngresado: this.datosAlquiler.codigoLocatarioIngresado,
              codigoPropietarioDevolucionIngresado: this.datosAlquiler.codigoPropietarioDevolucionIngresado,
              codigoPropietarioIngresado: this.datosAlquiler.codigoPropietarioIngresado,
              id_publicacion:this.datosAlquiler.id_publicacion,
              estado_reclamo: 'Esperando respuesta del sitio',
              imagen: this.datosAlquiler.imagen,
              usuario_propietario: this.datosAlquiler.name_usuarioPropietario            ,
              usuario_locatario: this.datosAlquiler.name_usuarioLocatario,
              resolucion: 14,
              titulo: this.datosAlquiler.titulo_publicacion,
              respuestas: [{
                emisor_respuesta: this.emailLogueado,
                respuesta: motivo,
                nro_rta: 1
            
                }] 
            }
      break;
        
    
      default:
        break;
    }

    console.log(this.reclamoData)
                     

    // this._auth.registrar_reclamo(this.reclamoData).subscribe(
      
    //   res => {
        
    //   },
    //   err => {
    //     console.log(err)
        
    //   }
    // )

    // Dejo esto comentado, es lo que cambia de estado del alquiler a en proceso de reclamo para poder hacer muchos reclamos de 1 sola publi
    
    // if(cerrar_reclamo)
    // this._auth.registrar_reclamado(this.datosAlquiler._id).subscribe(
    //   res => {
        
    //   },
    //   err => {
    //     console.log(err)
        
    //   }


    // )


    //this._router.navigate(['/reclamo-exito']);


  }



  


}



