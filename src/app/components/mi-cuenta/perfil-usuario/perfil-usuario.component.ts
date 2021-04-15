import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import provincias from './provincias.json';
import ciudades from './ciudades-argentinas.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { SingletonService } from '../../singleton.service';
import { UploadService } from '../../../services/upload.service';
declare const nsfwjs: any;
import { NgxSpinnerService } from "ngx-spinner";

declare var require: any;
var sortJsonArray = require('sort-json-array');

export interface Provincias {
  value: string;
  viewValue: string
}

export interface Ciudades {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  providers: [AuthService, { provide: MAT_DATE_LOCALE, useValue: 'es-LA' }, UploadService]
})

export class PerfilUsuarioComponent implements OnInit {

  public name: string;
  public nombre: string;
  public apellido: string;
  public email: string;
  public codArea: number;
  public telefono: number;
  public fecha_nacimiento: Date;
  public provinciaActual: string;
  public imagen: string;
  public ciudad: string;
  public calle: string;
  public numero: number;
  public piso: number;
  public departamento: string;
  public codigoPostal: number;
  public _id: string;
  public urlImagenPerfil: string;
  public barrio: String;
  public numCodArea: String;
  public maxTelefono: number = 10;

  mostrar: boolean = false;

  //Datos del form
  formulario = new FormGroup({
    name: new FormControl({ value: '', disabled: true }),
    nombre: new FormControl({ value: '', disabled: false }),
    apellido: new FormControl({ value: '', disabled: false }),
    email: new FormControl({ value: '', disabled: true }),
    codArea: new FormControl({ value: '', disabled: false }),
    telefono: new FormControl({ value: '', disabled: false }),
    fecha_nacimiento: new FormControl({ value: '', disabled: true }),
    provincia: new FormControl({ value: '', disabled: false }),
    removableFile: new FormControl({ value: '', disabled: false }),
    ciudad: new FormControl({ value: '', disabled: false }),
    barrio: new FormControl({ value: '', disabled: false }),
    calle: new FormControl({ value: '', disabled: false }),
    numero: new FormControl({ value: '', disabled: false }),
    piso: new FormControl({ value: '', disabled: false }),
    departamento: new FormControl({ value: '', disabled: false }),
    codigoPostal: new FormControl({ value: '', disabled: false })
  });


  //Para traer los datos de la BD en el form
  public user = {};
  emailLogueado = localStorage.getItem("email");
  perfilSocial: boolean = this.esSocial();


  //Para armar los JSON de provincias y ciudades
  datosCiudades = [];
  datosProvincias: Provincias[];
  ciudadesFiltradas: Ciudades[];
  date = new FormControl();
  ciudadControl: FormControl = new FormControl();

  //Para Datepicker
  maxDate;

  //Para mensaje de eror
  @Output() mensajeError = new EventEmitter<string>();
  enviarError(mensaje: string) { this.mensajeError.emit(mensaje) }

  //Para subir archivos
  public filesToUpload: Array<File>;

  //Para mostrar o no imagen en Tab imagenes
  public tabCambiada: boolean = false;


  //Para previsualización de imagenes a subir
  public imagePath;
  imgURL: any;
  public message: string;
  hayImagen: boolean = false;
  tieneImagen: boolean = false;
  imagenGoogle: boolean = false;
  urlImagenGoogle;
  imagenFacebook: boolean = false;
  urlImagenFacebook;

  constructor(private spinner: NgxSpinnerService, private _auth: AuthService, private singletoon: SingletonService, private _snackBar: MatSnackBar, private _adapter: DateAdapter<any>, private singleton: SingletonService, private _router: Router, private _uploadService: UploadService) { }

  ngOnInit() {

    if (this.verificarInicioSesion() == false) {
      return;
    }

    this._adapter.setLocale('es');
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this._auth.user_data(this.emailLogueado).subscribe(
      res => {
        this._id = res._id;
        this.singleton.setIdLogueado(this._id);
        this.name = res.name;

        if (res.tipo == "google") {
          if (String(res.removablefile).includes("http")) {
            this.imagenGoogle = true;
          } else this.imagenGoogle = false;
        } else {
          if (res.tipo == "facebook") {
            if (String(res.removablefile).includes("http")) {
              this.imagenFacebook = true;
            } else this.imagenFacebook = false;
          }
        }

        if (res.nombre == undefined) {
          this.nombre = "";
        } else this.nombre = res.nombre;

        if (res.apellido == undefined) {
          this.apellido = "";
        } else this.apellido = res.apellido;

        this.email = res.email;

        if (res.codArea == undefined) {
          this.codArea = null;
        } else this.codArea = res.codArea;

        if (res.telefono == undefined) {
          this.telefono = null;
        } else this.telefono = res.telefono;

        if (res.fecha_nacimiento == undefined) {
          this.fecha_nacimiento = undefined;
          this.formulario.controls.fecha_nacimiento.patchValue('');
        } else {
          let fecha = new Date(res.fecha_nacimiento);
          this.fecha_nacimiento = fecha;
          this.formulario.controls.fecha_nacimiento.patchValue(fecha);
        }

        if (res.ciudad == undefined) {
          this.formulario.controls.ciudad.patchValue('')
        } else {
          let ciudad = res.ciudad;
          this.ciudad = ciudad;
          this.formulario.controls.ciudad.patchValue(res.ciudad)
        }

        if (res.provincia == undefined) {
          this.provinciaActual = undefined;
        } else {
          this.provinciaActual = res.provincia;
          this.filtrarCiudades(this.provinciaActual);
          this.formulario.controls.provincia.patchValue(res.provincia)
        }
        if (res.barrio == undefined) {
          this.barrio = "";
        } else this.barrio = res.barrio;


        if (res.calle == undefined) {
          this.calle = "";
        } else this.calle = res.calle;

        if (res.numero == undefined) {
          this.numero = null;
        } else this.numero = res.numero;

        if (res.piso == undefined) {
          this.piso = null;
        } else this.piso = res.piso;

        if (res.departamento == undefined) {
          this.departamento = "";
        } else this.departamento = res.departamento;

        if (res.codigoPostal == undefined) {
          this.codigoPostal = null;
        } else this.codigoPostal = res.codigoPostal;

        if (res.removablefile != undefined) {
          this.tieneImagen = true;
          if (res.tipo == "google") {
            this.urlImagenGoogle = res.removablefile;
          } else {
            if (res.tipo == "facebook") {
              this.urlImagenFacebook = res.removablefile;
            }
          }
        }
        this.mostrar = true;
      },
      error => {
        this.openSnackBar(error.error, "Aceptar")
      }
    )
    this.crearJSONprovincias();
    this.crearJSONciudades();

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
  }

  cerrarSesion() {
    this.singletoon.cerrarSesion();
  }

  onSelectionChanged({ value }) {
    this.provinciaActual = value;
    this.ciudadControl.enable();
    this.filtrarCiudades(value);
  }

  filtrarCiudades(selectedValue) {
    var filtro = [], index, ciudades = this.datosCiudades;

    for (index in ciudades) {
      if (ciudades[index].value == selectedValue) {
        filtro.push({ 'value': ciudades[index].viewValue, 'viewValue': ciudades[index].viewValue })
      }
    }
    this.ciudadesFiltradas = filtro;
  }

  //Para arreglos de provincias
  crearJSONprovincias() {
    let index, JSONprovincias = provincias;
    let arreglo = [];
    for (index in JSONprovincias) {
      arreglo.push({ 'value': JSONprovincias[index].iso_nombre, 'viewValue': JSONprovincias[index].nombre })
    }
    this.datosProvincias = sortJsonArray(arreglo, 'viewValue', 'asc');
  }

  //Para arreglos de Provincias + Ciudades
  crearJSONciudades() {
    let index1, index2, index3, JSONciudades = ciudades;
    let arregloInicial = [];
    let arregloFinal = [];

    for (index1 in JSONciudades) {
      //[(Provincia,Arreglo de ciudades)]
      arregloInicial.push({ 'provincia': JSONciudades[index1].nombre, 'ciudad': JSONciudades[index1].ciudades })
    }
    //console.log(arregloInicial);

    //[(Provincia,Ciudad)]
    for (index2 in arregloInicial) {
      for (index3 in arregloInicial[index2].ciudad) {
        arregloFinal.push({ 'value': arregloInicial[index2].provincia, 'viewValue': arregloInicial[index2].ciudad[index3].nombre })
      }
    }
    this.datosCiudades = arregloFinal;
    //console.log(this.datosCiudades);
  }

  onSubmit() {
    this.updateFormularioControl();
    let objeto = {
      nombre: this.formulario.controls.nombre.value,
      apellido: this.formulario.controls.apellido.value,
      codArea: this.formulario.controls.codArea.value,
      telefono: this.formulario.controls.telefono.value,
      fecha_nacimiento: this.formulario.controls.fecha_nacimiento.value,
      provincia: this.formulario.controls.provincia.value,
      ciudad: this.formulario.controls.ciudad.value,
      barrio: this.formulario.controls.barrio.value,
      calle: this.formulario.controls.calle.value,
      numero: this.formulario.controls.numero.value,
      piso: this.formulario.controls.piso.value,
      departamento: this.formulario.controls.departamento.value,
      codigoPostal: this.formulario.controls.codigoPostal.value,
    }

    this._auth.update_user(objeto, this._id).subscribe(
      response => {
        if (window.localStorage.getItem("tipo") == "facebook" || window.localStorage.getItem("tipo") == "google") {
          window.location.assign("mi-cuenta/perfil")
        } else {
          if (this.filesToUpload != undefined) {
            this._uploadService.makeFileRequest("http://localhost:4201/api/upload-image/" + this._id, [], this.filesToUpload, 'removablefile')
              .then((result: any) => {
                window.location.assign("mi-cuenta/perfil")
              });
          }
        }
      },
      err => { }
    )
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.imagen = this.filesToUpload[0].name;
  }

  verificarInicioSesion(): boolean {
    if (this.singleton.getInicioSesion() == false) {
      this._router.navigate(['/*']);
      return false;
    }
    return true;
  }

  updateFormularioControl() {

    this.formulario.patchValue({
      name: this.name,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      codArea: this.codArea,
      telefono: this.telefono,
      fecha_nacimiento: this.formulario.controls.fecha_nacimiento.value,
      provincia: this.provinciaActual,
      barrio: this.barrio,
      ciudad: this.ciudad,
      removableFile: null,
      calle: this.calle,
      numero: this.numero,
      piso: this.piso,
      departamento: this.departamento,
      codigoPostal: this.codigoPostal
    })

  }

  obtenerIdActual(email): string {
    let valor;
    this._auth.user_data(email).subscribe(
      res => {
        //console.log(res._id);
        valor = res._id;
        //console.log(valor);
      },
      err => {
        //console.log(err);
      }
    )
    return valor;
  }

  cambioTab(event: MatTabChangeEvent) {
    this.tabCambiada = true;
  }

  obtenerMaxTelefono(evento) {
    this.numCodArea = evento.target.value;
    let cantidad = this.numCodArea.length;
    if (cantidad == 0) {
      this.maxTelefono = 10;
    }
    if (cantidad == 1) {
      this.maxTelefono = 9;
    }
    if (cantidad == 2) {
      this.maxTelefono = 8;
    }
    if (cantidad == 3) {
      this.maxTelefono = 7;
    }
    if (cantidad == 4) {
      this.maxTelefono = 6;
    }
  }

  preview(files) {
    let imagen = files.path[1].value;
    if (imagen.length === 0)
      return;

    var mimeType = imagen[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = imagen;
    reader.readAsDataURL(imagen[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.hayImagen = true;
      this.detectarImagenes(this.imagen[0])
    }
  }

  predicciones = [];

  async detectarImagenes(array) {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      var img = document.createElement("img");
      img.setAttribute("src", element);
      const model = await nsfwjs.load()
      const predictions = await model.classify(img)
      console.log('Predictions: ', predictions)
      this.predicciones.push(predictions)
    }
    this.procesarPredicciones();
  }

  procesarPredicciones() {
    for (let i = 0; i < this.predicciones.length; i++) {
      const imagen = this.predicciones[i];
      for (let j = 0; j < imagen.length; j++) {
        const prediccion = imagen[j];
        if ((prediccion.className == "Porn" && prediccion.probability > 0.30) || (prediccion.className == "Hentai" && prediccion.probability > 0.30) || (prediccion.className == "Sexy" && prediccion.probability > 0.30)) {
          this._snackBar.open("Una o varias de las imágenes cargadas no aceptan nuestros términos y condiciones", "Aceptar")
          this.spinner.hide();
          this.imagePath = undefined;
          return;
        } else {
          continue;
        }
      }
    }
    this.spinner.hide();
  }

  esSocial() {
    if (window.localStorage.getItem("tipo") == "facebook" || window.localStorage.getItem("tipo") == "google") {
      return true;
    } else return false
  }
}


