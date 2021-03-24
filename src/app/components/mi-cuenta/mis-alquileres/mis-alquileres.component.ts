import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { SingletonService } from '../../singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DatosPropietarioDialogComponent } from './datos-propietario-dialog/datos-propietario-dialog.component';
import { DatosLocatarioDialogComponent } from './datos-locatario-dialog/datos-locatario-dialog.component';
import { CodigoPropietarioDialogComponent } from './codigo-propietario-dialog/codigo-propietario-dialog.component';
import { CodigoLocatarioDialogComponent } from './codigo-locatario-dialog/codigo-locatario-dialog.component';
import { CodigoDevolucionLocatarioDialogComponent } from './codigo-devolucion-locatario-dialog/codigo-devolucion-locatario-dialog.component';
import { CodigoDevolucionPropietarioDialogComponent } from './codigo-devolucion-propietario-dialog/codigo-devolucion-propietario-dialog.component';
import { PuntuacionComponent } from './puntuacion-dialog/puntuacion-dialog.component'
import { CancelarDialogComponent } from './cancelar-dialog/cancelar-dialog.component'
import { Subscription } from 'rxjs';
import { BarraLateralComponent } from '../barra-lateral/barra-lateral.component'
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PuntuacionObtenidaDialogComponent } from './puntuacion-obtenida-dialog/puntuacion-obtenida-dialog.component';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-alquileres',
  templateUrl: './mis-alquileres.component.html',
  styleUrls: ['./mis-alquileres.component.css']
})
export class MisAlquileresComponent implements OnInit, OnDestroy, AfterViewInit {

  private subscription: Subscription;

  usuarioLogueado = {};
  arrayAlquilerPropietario = [];
  arrayDatosPropietario = [];
  arrayAlquilerPropios = [];
  arrayPublicacionesAlquileresPropios = [];
  arrayPublicacionesAlquileresPropietarios = []
  arrayDatosPropios = [];
  hayAlquileresPropietario = false;
  hayAlquileresPropios = false;
  reclamado = false;
  arrayEstados = [];
  arrayDevolucionLocatario = [];
  arrayDevolucionPropietario = [];
  mostrar: boolean = false;
  array_estados = [];
  arrayTitulosPublicacionesPropios = [];
  arrayTitulosPublicacionesPropietario = []

  array_propietario_lleno: boolean = false;
  array_propio_lleno: boolean = false;

  constructor(private _auth: AuthService, private singleton: SingletonService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _router: Router) { }

  @ViewChild("stepper", { static: false }) stepper: MatStepper;

  ngOnInit() {
    this.arrayAlquilerPropietario = []
    this.arrayAlquilerPropios = []

    this.subscription = this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        this.usuarioLogueado = res;
        var username = res.name
        //Suscripción que obtiene los alquileres realizados por otras personas de las publicaciones que realizó un usuario
        this._auth.getAlquilerPublicaciones(username).subscribe(
          res1 => {
            this.arrayAlquilerPropietario = res1.alquiler;
            if (this.arrayAlquilerPropietario.length > 0) {
              for (let i = 0; i < this.arrayAlquilerPropietario.length; i++) {
                var date = new Date(res1.alquiler[i].createdAt).toLocaleDateString();
                this.arrayAlquilerPropietario[i].createdAt = date;
                if (this.arrayAlquilerPropietario[i].estado != "Cancelado" && this.arrayAlquilerPropietario[i].estado != "En proceso de reclamo" ) {
                  this.arrayDatosPropietario.push(this.arrayAlquilerPropietario[i])
                }
              }
              this.hayAlquileresPropietario = true;
            } else this.hayAlquileresPropietario = false; this.array_propietario_lleno = true;
          })

        //Suscripción que obtiene los alquileres realizados por el usuario logueado a publicaciones de otros usuarios
        this._auth.getAlquilerPropios(username).subscribe(
          res1 => {
            var fechaActual = new Date();
            this.arrayAlquilerPropios = res1.alquiler;

            if (res1.alquiler.length > 0) {
              for (let i = 0; i < this.arrayAlquilerPropios.length; i++) {
                this._auth.get_publicacion_id(res1.alquiler[i].id_publicacion).subscribe(
                  res2 => {
                    let fechaCaducidad = new Date(res1.alquiler[i].fechaCaducidadEntrega);
                    let fechaCaducidadDev = new Date(res1.alquiler[i].fechaCaducidadDevolucion);

                    // Ayuda a que se muestren los botones de "Reclamar"
                    if ((res1.alquiler[i].estado == "En proceso de entrega" && res2.tipoAlquiler == "AlquilerConIntervencion") ||
                      (res1.alquiler[i].estado == "En proceso de devolución" && res2.tipoAlquiler == "AlquilerConIntervencion")) {
                      if (fechaActual > fechaCaducidad || fechaActual > fechaCaducidadDev) {
                        this.arrayEstados.push(true);
                      } else {
                        this.arrayEstados.push(false);
                      }
                    } else {
                      this.arrayEstados.push(false);
                    }
                    this.hayAlquileresPropios = true;
                  })

                var date = new Date(res1.alquiler[i].createdAt).toLocaleDateString();
                this.arrayAlquilerPropios[i].createdAt = date;
                if (this.arrayAlquilerPropios[i].estado != "Cancelado" && this.arrayAlquilerPropios[i].estado != "En proceso de reclamo" ) this.arrayDatosPropios.push(this.arrayAlquilerPropios[i])
              }
            } else this.hayAlquileresPropios = false; this.array_propio_lleno = true;
          })
      });

    setInterval(() => {
      if (this.array_propio_lleno != false && this.array_propietario_lleno != false) {
        this.mostrar = true;
      } else this.mostrar = false;
    }, 500)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      for (let i = 0; i < this.arrayAlquilerPropietario.length; i++) {
        const element = this.arrayAlquilerPropietario[i];
        if (element.estado == "En proceso de puntuación") {
          this._auth.verificar_finalizacion(element._id).subscribe(
            res => {
              console.log(res);
            }
          );
        }
      }

      for (let i = 0; i < this.arrayAlquilerPropios.length; i++) {
        const element = this.arrayAlquilerPropios[i];
        if (element.estado == "En proceso de puntuación") {
          this._auth.verificar_finalizacion(element._id).subscribe(
            res => {
              console.log(res);
            }
          );
        }
      }
    }, 2000);
  }

  estaCompleto(alquiler, n_step, stepper) {
    if (alquiler.estado == "En proceso de pago") {
      if (stepper != undefined) {
        stepper.selectedIndex = 0;
      }
      if (n_step == 0) return true;
      if (n_step == 1) return false;
      if (n_step == 2) return false;
      if (n_step == 3) return false;
      if (n_step == 4) return false;
    }
    if (alquiler.estado == "En proceso de entrega") {
      if (stepper != undefined) {
        stepper.selectedIndex = 1;
      }
      if (n_step == 0) return true;
      if (n_step == 1) return true;
      if (n_step == 2) return false;
      if (n_step == 3) return false;
      if (n_step == 4) return false;
    }
    if (alquiler.estado == "En proceso de devolución") {
      if (stepper != undefined) {
        stepper.selectedIndex = 2;
      }
      if (n_step == 0) return true;
      if (n_step == 1) return true;
      if (n_step == 2) return true;
      if (n_step == 3) return false;
      if (n_step == 4) return false;
    }
    if (alquiler.estado == "En proceso de puntuación") {
      if (stepper != undefined) {
        stepper.selectedIndex = 3;
      }
      if (n_step == 0) return true;
      if (n_step == 1) return true;
      if (n_step == 2) return true;
      if (n_step == 3) return true;
      if (n_step == 4) return false;
    }
    if (alquiler.estado == "Finalizado") {
      if (stepper != undefined) {
        stepper.selectedIndex = 4;
      }
      if (n_step == 0) return true;
      if (n_step == 1) return true;
      if (n_step == 2) return true;
      if (n_step == 3) return true;
      if (n_step == 4) return true;
    }
  }

  pre_reclamo(datos) {
    console.log('datos')
    this._auth.registraDatosPreReclamo(datos);
    
    this._router.navigate(['/prereclamo']);

    
  }

  pagar(alquiler) {
    this._auth.registrar_EnProcesoEntrega(alquiler.id_publicacion).subscribe(
      res => {
        this.ngOnInit();
      }
    )
  }

  continuarPago(alquilerPropio) {
    window.location.assign("pos-alquiler/" + alquilerPropio.id_publicacion)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }


  datosPropietarioDialogRef: MatDialogRef<DatosPropietarioDialogComponent>;
  datosLocatarioDialogRef: MatDialogRef<DatosLocatarioDialogComponent>;
  codigoPropietarioDialogRef: MatDialogRef<CodigoPropietarioDialogComponent>;
  codigoLocatarioDialogRef: MatDialogRef<CodigoLocatarioDialogComponent>;
  codigoDevolucionPropietarioDialogRef: MatDialogRef<CodigoDevolucionPropietarioDialogComponent>;
  codigoDevolucionLocatarioDialogRef: MatDialogRef<CodigoDevolucionLocatarioDialogComponent>;
  cancelarDialogRef: MatDialogRef<CancelarDialogComponent>;
  puntuacion: MatDialogRef<PuntuacionComponent>;
  puntuacionObtenida: MatDialogRef<PuntuacionObtenidaDialogComponent>;

  openDialogDatosPropietario(alquiler): void {
    this.datosPropietarioDialogRef = this.dialog.open(DatosPropietarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogDatosLocatario(alquiler): void {
    this.datosLocatarioDialogRef = this.dialog.open(DatosLocatarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogCodigoPropietario(alquiler): void {
    this.codigoPropietarioDialogRef = this.dialog.open(CodigoPropietarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogCodigoLocatario(alquiler): void {
    this.codigoLocatarioDialogRef = this.dialog.open(CodigoLocatarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogCodigoPropietarioDevolucion(alquiler): void {
    this.codigoDevolucionPropietarioDialogRef = this.dialog.open(CodigoDevolucionPropietarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });

    this.codigoDevolucionPropietarioDialogRef.afterClosed().subscribe(() => {
      window.location.assign("/mi-cuenta/mis-alquileres")
    });
  }

  openDialogCodigoLocatarioDevolucion(alquiler): void {
    this.codigoDevolucionLocatarioDialogRef = this.dialog.open(CodigoDevolucionLocatarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogCancelar(alquiler): void {
    localStorage.setItem('alquiler', JSON.stringify(alquiler))
    this.cancelarDialogRef = this.dialog.open(CancelarDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      }); this.cancelarDialogRef.afterClosed().subscribe(result => {

        window.location.reload();

      })

  }

  openDialogPuntuacion(alquiler, tipo): void {
    this.puntuacion = this.dialog.open(PuntuacionComponent, { data: { alquiler: alquiler, tipo: tipo }, });
    this.puntuacion.afterClosed().subscribe(
      res => {
        window.location.assign("mi-cuenta/mis-alquileres")
      }
    )
  }

  openDialogPuntuacionObtenida(alquiler, tipo): void {
    this.puntuacionObtenida = this.dialog.open(PuntuacionObtenidaDialogComponent, { data: { alquiler: alquiler, tipo: tipo }, });
  }

  copiar(val) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar("¡Código copiado al portapapeles!", "OK")
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
  }

  actualizar() {
    this.reiniciarVariables()
    this.ngOnInit();
  }

  reiniciarVariables() {
    this.usuarioLogueado = {};
    this.arrayAlquilerPropietario = [];
    this.arrayDatosPropietario = [];
    this.arrayAlquilerPropios = [];
    this.arrayPublicacionesAlquileresPropios = [];
    this.arrayPublicacionesAlquileresPropietarios = []
    this.arrayDatosPropios = [];
    this.hayAlquileresPropietario = false;
    this.hayAlquileresPropios = false;
    this.reclamado = false;
    this.arrayEstados = [];
    this.arrayDevolucionLocatario = [];
    this.arrayDevolucionPropietario = [];
    this.mostrar = false;
    this.array_estados = [];
    this.arrayTitulosPublicacionesPropios = [];
    this.arrayTitulosPublicacionesPropietario = []
    this.array_propietario_lleno = false;
    this.array_propio_lleno = false;
  }
}


