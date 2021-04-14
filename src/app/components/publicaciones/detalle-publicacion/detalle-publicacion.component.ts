import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SingletonService } from '../../singleton.service';
import { MatSnackBar } from '@angular/material';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.css']
})
export class DetallePublicacionComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private _auth: AuthService, private _singleton: SingletonService, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder) { }

  position: TooltipPosition = 'right';

  usuario_logueado = { name: '', email: '' };
  usuario_publicador;
  publicacion = {
    _id: '',
    titulo: '',
    categoria: '',
    subcategoria: '',
    descripcion: '',
    preciodia: '',
    preciosemana: '',
    preciomes: '',
    email: '',
    multiplefile: undefined,
    tipoAlquiler: '',
    estado: '',
    createdAt: '',
    cantDias: 0,
    cantidadDisponible: 0,
  }

  esConIntervencion = false;
  tienePreguntas = false;
  tieneRespuesta = false;
  es_publicador = false;
  estadoBtnPreguntar = false;
  estaLogueado = false;
  btnAlquilar = true;
  mostrar = false;

  arrayJSON = [];
  arrayCantidadDisponible = [];
  preguntas = [];
  arraycantidadDias = [];
  esActiva = false;
  JSONfinal;
  id;
  cantidadDiasSeleccionado;
  valorPregunta;
  cantidadDisponibleSeleccionada;
  tipoAlquiler;
  montoTotal;
  cantidades: FormGroup;


  ngOnInit() {
    this.spinner.show();
    var urlActual = window.location.href;
    if (window.location.hostname != 'localhost') {
      this.id = urlActual.substr(43);
    } else {
      this.id = urlActual.substr(37);
    }

    this.cantidades = this._formBuilder.group({
      cantidadDisponibleSeleccionada: ['', Validators.required],
      cantidadDiasSeleccionado: ['', Validators.required]
    });


    var obsA = this._auth.registrar_visita_publicacion(this.id);
    var obsB = this._auth.get_publicacion_id(this.id)
    var obsC = this._auth.get_all_users();
    const obsvArray = [obsA, obsB, obsC];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {

        let publicacion = res[1];
        let usuarios = res[2];

        this.publicacion.titulo = publicacion.titulo;
        this.publicacion.preciodia = publicacion.preciodia;
        this.publicacion.preciomes = publicacion.preciomes;
        this.publicacion.preciosemana = publicacion.preciosemana;
        this.publicacion.descripcion = publicacion.descripcion;
        this.publicacion.categoria = publicacion.categoria;
        this.publicacion.subcategoria = publicacion.subcategoria;
        this.publicacion.cantidadDisponible = publicacion.cantidadDisponible;
        this.publicacion.cantDias = publicacion.cantDias;
        this.publicacion.tipoAlquiler = publicacion.tipoAlquiler;
        this.publicacion.multiplefile = publicacion.multiplefile
        this.publicacion.email = publicacion.email
        this.publicacion.estado = publicacion.estado;

        if(this.publicacion.estado == "INACTIVA"){
          this.esActiva = false;
        } else {
          this.esActiva = true;
          for (let i = 0; i <= this.publicacion.cantidadDisponible; i++) {
            this.arrayCantidadDisponible.push(i);
          }
  
          for (let i = 0; i <= this.publicacion.cantDias; i++) {
            this.arraycantidadDias.push(i);
          }
        }

        if (this.publicacion.tipoAlquiler == 'AlquilerConIntervencion') {
          this.esConIntervencion = true;
        } else {
          this.esConIntervencion = false;
        }

        //Para mostrar las imagenes
        this.JSONfinal = JSON.parse(this.publicacion.multiplefile); //CREA JSON CONVERTIDO DE STRING
        for (let j in this.JSONfinal) {
          this.arrayJSON.push(this.JSONfinal[j]);
        }
        this.publicacion.multiplefile = this.arrayJSON;

        if (localStorage.getItem("email") == undefined || localStorage.getItem("email") == null) {
          this.estaLogueado = false;
        } else {
          this.estaLogueado = true;
        }

        for (let i = 0; i < usuarios.length; i++) {
          const element = usuarios[i];
          if (element.email == localStorage.getItem("email")) {
            this.usuario_logueado = element;

            if (element.email == this.publicacion.email) {
              this.es_publicador = true;
            }
            else this.es_publicador = false;
          }
          if (element.email == this.publicacion.email) {
            this.usuario_publicador = element;
          }
        }


        //VERIFICAR QUE SALGAN LAS PREGUNTAS SOLO DE ESTA PUBLICACION
        this._auth.get_preguntas_respuestas(this.id).subscribe(
          res => {
            //Me devuelve un objeto que contiene un array de pyr
            if (res.publicacion.length > 0) {
              this.preguntas = res.publicacion;
              this.preguntas.reverse();
              if (this.preguntas[0].pregunta != null || this.preguntas[0].pregunta != undefined) {
                this.tienePreguntas = true;
              }
            }
            this.mostrar = true;
            this.spinner.hide();
          },
        )
      }
    )
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
  }

  enviarPregunta(pregunta) {
    if (pregunta == "") {
      this.openSnackBar("No se pueden enviar preguntas vacías.", "Aceptar");
    } else {
      this.estadoBtnPreguntar = true;
      this.valorPregunta = "";
      let objeto = { pregunta: pregunta }

      var obsA = this._auth.post_pregunta_publicacion(this.id, this.usuario_logueado.name, objeto)
      var obsB = this._auth.notificacion_pregunta_publicacion(this.usuario_logueado.name, this.usuario_publicador.name, this.publicacion.titulo, this.publicacion.multiplefile[0], this.id)
      const obsvArray = [obsA, obsB];
      const zip2 = Observable.zip(...obsvArray)
      zip2.subscribe(
        res => {
          this.estadoBtnPreguntar = false;
          this.ngOnInit();
        }
      );
    }
  }

  enviarRespuesta(respuesta, pregunta) {
    let _id = pregunta._id;
    let objeto = { respuesta: respuesta }
    var obsA = this._auth.post_respuesta_publicacion(_id, this.usuario_logueado.name, objeto)
    var obsB = this._auth.get_una_pregunta_respuesta(_id)
    const obsvArray = [obsA, obsB];
    const zip3 = Observable.zip(...obsvArray)
    zip3.subscribe(
      res => {
        this.ngOnInit();
        let usuario_pregunta = res[1].pyr.usuario_pregunta;
        this._auth.notificacion_respuesta_publicacion(this.usuario_logueado.name, usuario_pregunta, this.publicacion.titulo, this.publicacion.multiplefile[0], this.id).subscribe(
          res2 => {
          }
        )
      }
    );
  }

  habilitarAlquilar() {
    if (this.cantidadDiasSeleccionado != null && this.cantidadDisponibleSeleccionada != null) {
      if (this.cantidadDiasSeleccionado == 0 || this.cantidadDisponibleSeleccionada == 0) {
        this.btnAlquilar = true;
        this.montoTotal = 0;
      } else {
        if (this.cantidadDiasSeleccionado < 29) {
          this.montoTotal = parseInt(this.cantidadDisponibleSeleccionada) * this.calcularPrecio();
        } else {
          if (this.cantidadDiasSeleccionado > 28) {
            this.montoTotal = parseInt(this.cantidadDisponibleSeleccionada) * (parseInt(this.publicacion.preciomes) + this.calcularPrecio());
          }
        }
        this.btnAlquilar = false;
      }

    }
  }

  registrarAlquiler() {
    let reembolso;
    if(this.publicacion.tipoAlquiler == "AlquilerSinIntervencion"){
      reembolso = 0;
    } else {
      reembolso = this.montoTotal * 0.40;
    }
    let nuevo_stock = this.publicacion.cantidadDisponible - this.cantidadDisponibleSeleccionada;
    var obsA = this._auth.registrar_EnProcesoPago(this.id, this.usuario_publicador.name, this.usuario_logueado.name, this.cantidadDiasSeleccionado, this.cantidadDisponibleSeleccionada, this.publicacion.multiplefile[0], this.montoTotal, reembolso, this.publicacion.titulo);
    var obsB = this._auth.reducir_stock(this.id, { nuevo_stock: nuevo_stock });
    const obsvArray = [obsA,obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        console.log(res);
        window.location.assign("pos-alquiler/" + res[0]._id)
      }
    )
  }

  iniciarSesion() {
    window.location.assign("login")
  }

  calcularPrecio() {
    let preciodia = parseInt(this.publicacion.preciodia);
    let preciosemana = parseInt(this.publicacion.preciosemana);
    let preciomes = parseInt(this.publicacion.preciomes);

    if (preciomes == 0 && preciosemana == 0) {
      return this.cantidadDiasSeleccionado * preciodia;
    } else {
      if (this.cantidadDiasSeleccionado < 7) {
        return this.cantidadDiasSeleccionado * preciodia;
      } else {
        if (preciosemana > 0) {
          if (this.cantidadDiasSeleccionado == 7) {
            return preciosemana;
          } else {
            if (this.cantidadDiasSeleccionado > 7 && this.cantidadDiasSeleccionado < 14) {
              let dias_restantes = this.cantidadDiasSeleccionado - 7
              return dias_restantes * preciodia + preciosemana
            } else {
              if (this.cantidadDiasSeleccionado == 14) {
                return preciosemana * 2;
              } else {
                if (this.cantidadDiasSeleccionado > 14 && this.cantidadDiasSeleccionado < 21) {
                  let dias_restantes = this.cantidadDiasSeleccionado - 14
                  return (dias_restantes * preciodia) + (2 * preciosemana)
                } else {
                  if (this.cantidadDiasSeleccionado == 21) {
                    return preciosemana * 3;
                  } else {
                    if (this.cantidadDiasSeleccionado > 21 && this.cantidadDiasSeleccionado < 28) {
                      let dias_restantes = this.cantidadDiasSeleccionado - 21
                      return (dias_restantes * preciodia) + (3 * preciosemana)
                    } else {
                      if (this.cantidadDiasSeleccionado == 28) {
                        return preciomes;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  irUsuario() {
    window.location.assign("/users/" + this.usuario_publicador._id)
  }

  //SWIPER
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
  };

}
