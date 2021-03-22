import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SingletonService } from '../../singleton.service';
import { MatSnackBar } from '@angular/material';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.css']
})
export class DetallePublicacionComponent implements OnInit, OnDestroy {

  constructor(private _auth: AuthService, private _singleton: SingletonService, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder) { }

  position: TooltipPosition = 'below';


  id;
  titulo;
  preciodia;
  preciosemana;
  preciomes;
  descripcion;
  categoria;
  subcategoria;
  publicacion;
  JSON;
  JSONfinal;
  arrayJSON = [];
  preguntas = [];
  tienePreguntas = false;
  tieneRespuesta = false;
  es_publicador = false;
  email;
  logueado;
  usuario = { name: '' };
  usuario_logueado = { name: '' };
  estadoBtnPreguntar = false;
  valorPregunta;
  esConIntervencion = false;
  estaLogueado = false;
  cantidadDisponible;
  arrayCantidadDisponible = [];
  cantidadDisponibleSeleccionada;
  cantidadDias;
  arraycantidadDias = [];
  cantidadDiasSeleccionado;
  btnAlquilar = true;
  cantidades: FormGroup;
  tipoAlquiler;
  suscription: Subscription;
  montoTotal;

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }

  ngOnInit() {
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

    this.suscription = this._auth.registrar_visita_publicacion(this.id).subscribe(
      res => {
        //console.log(res);
      }
    )

    this._auth.get_publicacion_id(this.id).subscribe(
      res => {

        this.titulo = res.titulo;
        this.preciodia = res.preciodia;
        this.preciomes = res.preciomes;
        this.preciosemana = res.preciosemana;
        this.descripcion = res.descripcion;
        this.categoria = res.categoria;
        this.subcategoria = res.subcategoria;
        this.cantidadDisponible = res.cantidadDisponible;
        this.cantidadDias = res.cantDias;
        this.tipoAlquiler = res.tipoAlquiler;

        if (this.tipoAlquiler == 'AlquilerConIntervencion') {
          this.esConIntervencion = true;
        } else {
          this.esConIntervencion = false;
        }

        for (let i = 0; i <= this.cantidadDisponible; i++) {
          this.arrayCantidadDisponible.push(i);
        }

        for (let i = 0; i <= this.cantidadDias; i++) {
          this.arraycantidadDias.push(i);
        }

        //Para mostrar las imagenes
        this.publicacion = res;
        this.JSON = res.multiplefile;
        this.JSONfinal = JSON.parse(this.JSON); //CREA JSON CONVERTIDO DE STRING
        for (let j in this.JSONfinal) {
          this.arrayJSON.push(this.JSONfinal[j]);
        }
        this.publicacion.multiplefile = this.arrayJSON;

        this.email = this.publicacion.email;
        if (localStorage.getItem("email") == undefined || localStorage.getItem("email") == null) {
          this.estaLogueado = false;
        } else {
          this._auth.user_data(localStorage.getItem("email")).subscribe(
            res => {
              this.usuario_logueado = res;
              this.logueado = res;
              this.estaLogueado = true;
              if (this.email == this.logueado.email) {
                this.es_publicador = true;
              } else {
                this.es_publicador = false;
              }
            }
          )
        }


        this._auth.user_data(this.email).subscribe(
          res => {
            this.usuario = res;
          }
        )


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
          },
        )
      },
      res => {
      })
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
      this._auth.user_data(localStorage.getItem("email")).subscribe(
        res => {
          let usuario_pregunta = res;
          let objeto = { pregunta: pregunta }
          this._auth.post_pregunta_publicacion(this.id, usuario_pregunta.name, objeto).subscribe(
            res => {
              this.estadoBtnPreguntar = false;
              this.ngOnInit();
            }
          );

          this._auth.user_data(this.publicacion.email).subscribe(
            res1 => {
              let usuario_publicacion = res1.name;
              this._auth.notificacion_pregunta_publicacion(usuario_pregunta.name, usuario_publicacion, this.publicacion.titulo, this.publicacion.multiplefile[0], this.publicacion._id).subscribe(
                res2 => {
                  //console.log(res2);
                }
              )
            }
          )

        }
      )
    }
  }

  enviarRespuesta(respuesta, pregunta) {

    let _id = pregunta._id;

    this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        let usuario_respuesta = res;
        let objeto = { respuesta: respuesta }
        this._auth.post_respuesta_publicacion(_id, usuario_respuesta.name, objeto).subscribe(
          res => {
            this.ngOnInit();
          }
        );
        this._auth.get_una_pregunta_respuesta(_id).subscribe(
          res1 => {
            let usuario_pregunta = res1.pyr.usuario_pregunta;
            this._auth.notificacion_respuesta_publicacion(usuario_respuesta.name, usuario_pregunta, this.publicacion.titulo, this.publicacion.multiplefile[0], this.publicacion._id).subscribe(
              res2 => {
              }
            )
          }
        )

      }
    )
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
            this.montoTotal = parseInt(this.cantidadDisponibleSeleccionada) * (parseInt(this.preciomes) + this.calcularPrecio());
          }
        }
        this.btnAlquilar = false;
      }

    }
  }

  registrarAlquiler() {
    let reembolso = this.montoTotal * 0.40;
    this._auth.registrar_EnProcesoPago(this.id, this.usuario.name, this.usuario_logueado.name, this.cantidadDiasSeleccionado, this.cantidadDisponible, this.publicacion.multiplefile[0], this.montoTotal, reembolso, this.publicacion.titulo).subscribe(
      res => {
        window.location.assign("pos-alquiler/" + this.publicacion._id)
      }
    )
  }

  iniciarSesion() {
    window.location.assign("login")
  }

  calcularPrecio() {
    if (this.preciomes == 0 && this.preciosemana == 0) {
      return this.cantidadDiasSeleccionado * this.preciodia;
    } else {
      if (this.cantidadDiasSeleccionado < 7) {
        return this.cantidadDiasSeleccionado * this.preciodia;
      } else {
        if (this.preciosemana > 0) {
          if (this.cantidadDiasSeleccionado == 7) {
            return this.preciosemana;
          } else {
            if (this.cantidadDiasSeleccionado > 7 && this.cantidadDiasSeleccionado < 14) {
              let dias_restantes = this.cantidadDiasSeleccionado - 7
              return dias_restantes * this.preciodia + parseInt(this.preciosemana)
            } else {
              if (this.cantidadDiasSeleccionado == 14) {
                return this.preciosemana * 2;
              } else {
                if (this.cantidadDiasSeleccionado > 14 && this.cantidadDiasSeleccionado < 21) {
                  let dias_restantes = this.cantidadDiasSeleccionado - 14
                  return (dias_restantes * this.preciodia) + (2 * parseInt(this.preciosemana))
                } else {
                  if (this.cantidadDiasSeleccionado == 21) {
                    return this.preciosemana * 3;
                  } else {
                    if (this.cantidadDiasSeleccionado > 21 && this.cantidadDiasSeleccionado < 28) {
                      let dias_restantes = this.cantidadDiasSeleccionado - 21
                      return (dias_restantes * this.preciodia) + (3 * parseInt(this.preciosemana))
                    } else {
                        if (this.cantidadDiasSeleccionado == 28) {
                          return parseInt(this.preciomes);
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
