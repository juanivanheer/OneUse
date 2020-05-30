import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SingletonService } from '../../singleton.service';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeshabilitarDialogComponent } from './deshabilitar-dialog/dehsabilitar-dialog'
import { EliminarDialogComponent } from './eliminar-dialog/eliminar-dialog.component'


@Component({
  selector: 'app-mis-publicaciones',
  templateUrl: './mis-publicaciones.component.html',
  styleUrls: ['./mis-publicaciones.component.css']
})
export class MisPublicacionesComponent implements OnInit {

  constructor(private _auth: AuthService, private singleton: SingletonService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  publicaciones = [];
  titulo: string;
  hayPublicaciones: boolean;
  imagen;
  imagenJSON;
  arrayJSON = [];
  arrayImagen = [];

  ngOnInit() {

    /* PARA OBTENER FECHAS EN FORMATO AR
        this.date = new Date();
        this.date.setDate(this.date.getDate() + 30);
        this.newDate = this.date.toLocaleString()
        this.newDate = this.newDate.slice(0,10)
     */
    this._auth.get_publicacion(localStorage.getItem("email")).subscribe(
      err => {
        this.hayPublicaciones = true;
        this.publicaciones = err.publicaciones;
        for (let i = 0; i < this.publicaciones.length; i++) {
          this.imagen = this.publicaciones[i].multiplefile;
          this.imagenJSON = JSON.parse(this.imagen); //CREA JSON CONVERTIDO DE STRING
          for (let j in this.imagenJSON) {
            this.arrayJSON.push(this.imagenJSON[j]);
          }
          this.publicaciones[i].multiplefile = this.arrayJSON;
          this.arrayJSON = [];
        }

      },
      res => {
        //console.log(res);
        this.titulo = "No hay publicaciones para mostrar"
        this.hayPublicaciones = false;
      }
    )

  }
  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  deshabilitarPublicacion(publicacion) {
    publicacion.estado = 'INACTIVA';

    this._auth.update_publicacion(publicacion._id, publicacion).subscribe(
      err => {
        this.ngOnInit();
      },
      res => {
        this.ngOnInit();
      }
    )
  }

  habilitarPublicacion(publicacion) {
    publicacion.estado = 'ACTIVA';

    this._auth.update_publicacion(publicacion._id, publicacion).subscribe(
      err => {
        this.ngOnInit();
      },
      res => {
        this.ngOnInit();
      }
    )
  }

  eliminarPublicacion(publicacion) {
    this._auth.delete_publicacion(publicacion._id).subscribe(
      err => {
        this.ngOnInit();
      },
      res => {
        this.ngOnInit();
      }
    )
  }

  cambioTab(evento) {
    this.ngOnInit();
  }

  verificarUsuario() {
    this._auth.user_data(localStorage.getItem("email")).subscribe(
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



  /* Métodos y atributos para el Dialog */

  deshabilitarDialogRef: MatDialogRef<DeshabilitarDialogComponent>;
  eliminarDialogRef: MatDialogRef<EliminarDialogComponent>;

  openDialogDeshabilitar(publicacion): void {
    this.deshabilitarDialogRef = this.dialog.open(DeshabilitarDialogComponent,
      {
        data: {
          publicacion: publicacion
        }
      });
    this.deshabilitarDialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

  openDialogEliminar(publicacion): void {
    this.eliminarDialogRef = this.dialog.open(EliminarDialogComponent,
      {
        data: {
          publicacion: publicacion
        }
      });
    this.eliminarDialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }



}
