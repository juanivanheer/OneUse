import { Component, OnInit, EventEmitter, Output, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { SingletonService } from '../../singleton.service'
import { DropdownDirective, TOGGLE_STATUS } from 'angular-custom-dropdown';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar, MatInput } from '@angular/material';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import "rxjs/add/observable/zip";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {

  private suscripcion: Subscription

  @Output() sidenavToggle = new EventEmitter<void>();
  onToggleSidenav() { this.sidenavToggle.emit(); }
  @ViewChild(MatInput, { static: true }) inputPalabra: MatInput;

  noHayNotificaciones = true;
  noHayNotificacionesNuevas = false;
  estadoDropdown: boolean = false;
  estadoNotDropdown: boolean = false;
  subscriptionIniciada: boolean = false;
  subscriptionNotIniciada: boolean = false;
  esImagenGoogle: boolean = false;
  esImagenFacebook: boolean = false;
  mostrarImagen: boolean = false;
  tieneNombre: boolean = false;
  esImagenOneUse: boolean = false;
  esAdmin: boolean = false;
  estadoBuscador: boolean;
  inicioSesion: boolean;
  urlActual: string;
  urlRecortada: string;
  paginaActual: string;

  usuarioIniciado = { name: '' };

  _id;
  urlImagenGoogle;
  usuarioLogueado;
  urlImagenFacebook;
  usuarioActivo;
  cantidad;

  notificaciones = [];
  notificaciones_nuevas = [];
  tituloPublicacion;


  constructor(private http: HttpClient, private singleton: SingletonService, private _auth: AuthService, private _snackBar: MatSnackBar, /* private pusherService: PusherService */) { }


  ngOnInit() {
    this.urlActual = window.location.href;
    if (window.location.hostname != "localhost") {
      this.urlRecortada = this.urlActual.substr(40);
    } else {
      this.urlRecortada = this.urlActual.substr(22);
    }

    this.paginaActual = this.urlRecortada;
    this.checkPage(this.paginaActual);
    this.setearInicioSesion();
    this.obtenerNombreLogueado();
    this.checkCaducidadesAlquilerPropietario();
    this.checkCaducidadesAlquilerPropios();
    if (this.urlActual.includes('/p/')) {
      let url = this.urlActual.slice(34);
      this.inputPalabra.value = url;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.actualizarTokenFacebook();
    }, 3000);

  }

  setearInicioSesion() {
    this.usuarioActivo = localStorage.getItem("email");
    if (this.usuarioActivo == null) {
      this.singleton.setInicioSesion(false);
    } else this.singleton.setInicioSesion(true);

    this.inicioSesion = this.singleton.getInicioSesion();
  }

  checkPage(url) {
    this.estadoBuscador = this.singleton.paginaActual(url);
    this.singleton.setEstado(this.estadoBuscador);
  }

  navInicioSesion() {
    window.location.assign("/login");
  }

  @ViewChild('myDropdown', { static: false }) myDropdown: DropdownDirective;
  @ViewChild('notDropdown', { static: false }) notDropdown: DropdownDirective;

  openNow() {
    this.checkStatus();
    if (this.estadoDropdown == false) {
      this.estadoDropdown = true;
    } else {
      this.estadoDropdown = false;
    }
  }

  checkStatus() {
    if (this.subscriptionIniciada == false) {
      this.subscriptionIniciada = true;
      this.myDropdown.statusChange()
        .subscribe((status: TOGGLE_STATUS) => {
          if (status === TOGGLE_STATUS.OPEN) {
          } else if (status === TOGGLE_STATUS.CLOSE) {
            this.estadoDropdown = false;
          }
        });
    }
  }

  openNotificacionesNow() {
    this.checkNotStatus();
    if (this.estadoNotDropdown == false) {
      this.estadoNotDropdown = true;
    } else {
      this.estadoNotDropdown = false;
    }
  }

  checkNotStatus() {
    if (this.subscriptionNotIniciada == false) {
      this.subscriptionNotIniciada = true;
      this.notDropdown.statusChange()
        .subscribe((status: TOGGLE_STATUS) => {
          if (status === TOGGLE_STATUS.OPEN) {
          } else if (status === TOGGLE_STATUS.CLOSE) {
            this.estadoNotDropdown = false;
          }
        });
    }
  }


  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  obtenerNombreLogueado() {
    let email = localStorage.getItem("email");
    if (email != undefined || email != null) {
      this.suscripcion = this._auth.user_data(email).subscribe(
        res => {
          this.usuarioIniciado = res;
          this.usuarioLogueado = res;
          if (res.admin != undefined) {
            if (res.admin == true) this.esAdmin = true;
            else this.esAdmin = false;
          }
          if (res.tipo == "google") {
            if (String(res.removablefile).includes("http")) {
              this.esImagenGoogle = true;
              this.esImagenOneUse = false;
              this.esImagenFacebook = false;
              this.urlImagenGoogle = res.removablefile
            }
          } else {
            if (res.tipo == "facebook") {
              this.esImagenFacebook = true;
              this.esImagenGoogle = false;
              this.esImagenOneUse = false;
              this.urlImagenFacebook = res.removablefile;
            } else {
              this.esImagenOneUse = true;
              this.esImagenFacebook = false;
              this.esImagenGoogle = false;
            }
          }
          this.get_notificaciones_todas();
          if (res.nombre != undefined) {
            this.tieneNombre = true;
          }
          if (res.removablefile != undefined) {
            this.mostrarImagen = true;
          }
          this.singleton.setIdLogueado(res._id);
          this._id = this.singleton.getIdLogueado();
        },
        err => {
          //console.log(err);
        }
      )
    }

  }

  redirigirCategoria(categoria) {
    window.location.assign("/busqueda/c/" + categoria)
  }

  redirigirSubcategoria(categoria, subcategoria) {
    window.location.assign("/busqueda/c/" + categoria + "?s=" + subcategoria)
  }

  verificarUsuario() {
    this.suscripcion = this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        if (this.checkUsuarioCompleto(res)) {
          window.location.assign("/register-publicacion")
        } else {
          this.openSnackBar("Debes completar todos tus datos personales en la sección 'Mi perfil'", "Aceptar")
        }
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
  }

  checkUsuarioCompleto(user): boolean {
    if (user.name == undefined || user.name == '' || user.name == null) {
      return false;
    }
    if (user.email == undefined || user.email == '' || user.email == null) {
      return false;
    }
    if (user.apellido == undefined || user.apellido == '' || user.apellido == null) {
      return false;
    }
    if (user.ciudad == undefined || user.ciudad == '' || user.ciudad == null) {
      return false;
    }
    if (user.nombre == undefined || user.nombre == '' || user.nombre == null) {
      return false;
    }
    if (user.provincia == undefined || user.provincia == '' || user.provincia == null) {
      return false;
    }
    if (user.telefono == undefined || user.telefono == '' || user.telefono == null) {
      return false;
    }
    if (user.removablefile == undefined || user.removablefile == '' || user.removablefile == null) {
      return false;
    }
    if (user.calle == undefined || user.calle == '' || user.calle == null) {
      return false;
    }
    if (user.codigoPostal == undefined || user.codigoPostal == '' || user.codigoPostal == null) {
      return false;
    }
    if (user.departamento == undefined || user.departamento == '' || user.departamento == null) {
      return false;
    }
    if (user.numero == undefined || user.numero == '' || user.numero == null) {
      return false;
    }
    if (user.piso == undefined || user.piso == '' || user.piso == null) {
      return false;
    }
    if (user.codArea == undefined || user.codArea == '' || user.codArea == null) {
      return false;
    }
    if (user.barrio == undefined || user.barrio == '' || user.barrio == null) {
      return false;
    }
    return true;
  }

  /* NOTIFICACIONES */
  get_notificaciones_todas() {
    this.notificaciones = [];
    this.notificaciones_nuevas = [];
    this.suscripcion = this._auth.notificaciones_todas().subscribe(
      res => {
        if (res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            const element = res[i]
            if (this.usuarioLogueado.name == element.name_destino) {
              this.notificaciones.push(element)
            }

            if (this.usuarioLogueado.name == element.name_destino && element.visto == false) {
              this.notificaciones_nuevas.push(element);
            }
          }

          if (this.notificaciones.length == 0) {
            this.noHayNotificaciones = true;
          } else {
            this.noHayNotificaciones = false;
          }

          if (this.notificaciones_nuevas.length > 0) {
            this.noHayNotificacionesNuevas = false;
          } else {
            this.noHayNotificacionesNuevas = true;
          }

          this.notificaciones.reverse();
        } else {
          this.noHayNotificaciones = true;
        }
      }
    )
  }

  desactivarBadge() {
    this.noHayNotificacionesNuevas = true;
    this._auth.notificacion_vista(this.notificaciones_nuevas).subscribe(
      res => {

      }
    );

  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  /* Esto es para verificar en cuanto tiempo va a devolver o está tardando en devolver un objeto un usuario al usuario logueado */
  checkCaducidadesAlquilerPropietario() {
    this.suscripcion = this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        var usuario = res;
        if (usuario == null || usuario == undefined) return;
        this._auth.getAlquilerPublicaciones(usuario.name).subscribe(
          res2 => {
            var alquiler = res2.alquiler;
            for (let i = 0; i < alquiler.length; i++) {
              if (alquiler[i].fechaCaducidadDevolucion != undefined) {
                var fechaActual = new Date();
                var fechaAlquiler = new Date(alquiler[i].fechaCaducidadEntrega);
                //MANDAR TODO POR JSON EN EL BODY SINO TIRA ERROR
                this._auth.notificacion_caducidadEntregaPropietario(fechaActual, fechaAlquiler, alquiler[i].imagen, alquiler[i].id_publicacion, usuario.name, alquiler[i].name_usuarioLocatario, alquiler[i]._id).subscribe(
                  res3 => {
                    //console.log(res3);
                  }
                )
              }
            }
          }
        )
      }
    )
  }

  checkCaducidadesAlquilerPropios() {
    this.suscripcion = this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        var usuario = res;
        if (usuario == null || usuario == undefined) return;
        this._auth.getAlquilerPublicaciones(usuario.name).subscribe(
          res2 => {
            var alquiler = res2.alquiler;
            for (let i = 0; i < alquiler.length; i++) {
              if (alquiler[i].fechaCaducidadDevolucion != undefined) {
                var fechaActual = new Date();
                var fechaAlquiler = new Date(alquiler[i].fechaCaducidadEntrega);
                //MANDAR TODO POR JSON EN EL BODY SINO TIRA ERROR
                this._auth.notificacion_caducidadEntregaLocatario(fechaActual, fechaAlquiler, alquiler[i].imagen, alquiler[i].id_publicacion, usuario.name, alquiler[i].name_usuarioLocatario, alquiler[i]._id).subscribe(
                  res3 => {
                    //console.log(res3);
                  }
                )
              }
            }
          }
        )
      }
    )
  }

  /* PARA EL BUSCADOR DE PALABRAS */
  buscarPalabra(inputPalabra) {
    let encode = encodeURI(inputPalabra);
    window.location.assign('/busqueda/p/' + encode)
  }

  actualizarTokenFacebook() {
    if (this.esImagenFacebook) {
      this.http.get<any>('https://graph.facebook.com/oauth/access_token?client_id=235541454927521&client_secret=a0e02d20919f1bdefeff77e3a13f1f71&grant_type=client_credentials').subscribe(
        res => {
          this.urlImagenFacebook = String(this.urlImagenFacebook).slice(0, String(this.urlImagenFacebook).indexOf("=")) + "=" + res.access_token + "&width=150&heigth=150";
          let objeto = {
            email: this.usuarioLogueado.email,
            removablefile: this.urlImagenFacebook
          }
          this._auth.updateImgFacebook(objeto).subscribe(
            res => {
              console.log('OK');
            }
          )
        }
      )
    }
  }

  ir(url) {
    window.location.assign(String(window.location.href).slice(0, 23) + url)
  }

}
