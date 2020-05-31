import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingletonService } from '../singleton.service';
import { CategoriasComponent } from '../../components/categorias/categorias.component';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AuthService } from 'src/app/services/auth.service';
declare var Mercadopago: any;
// "src/assets/js/web-tokenize-checkout.js"

@NgModule({
  imports: [CategoriasComponent]
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  inicioSesion: boolean;
  urlActual: string;
  urlRecortada: string;
  usuarioActivo;
  usuario;
  publicacionesDestacadas;
  arrayRandoms = [];
  cantidad;
  rnd;
  imagen;
  arrayJSON = [];
  imagenJSON;

  constructor(private singleton: SingletonService, private _auth: AuthService) { }


  ngOnInit() {
    this._auth.get_publicaciones_destacadas().subscribe(
      res => {
        this.publicacionesDestacadas = res.publicaciones; //ARRAY DE PUBLICACIONES DESTACADAS

        for (let i = 0; i < this.publicacionesDestacadas.length; i++) {
          this.imagen = this.publicacionesDestacadas[i].multiplefile;
          this.imagenJSON = JSON.parse(this.imagen); //CREA JSON CONVERTIDO DE STRING
          for (let j in this.imagenJSON) {
            this.arrayJSON.push(this.imagenJSON[j]);
          }
          this.publicacionesDestacadas[i].multiplefile = this.arrayJSON;
          this.arrayJSON = [];
        }

        if (this.publicacionesDestacadas.length > 8) this.cantidad = 100;
        if (this.publicacionesDestacadas.length > 100) this.cantidad = 1000;


        for (let i = 0; i < this.publicacionesDestacadas.length; i++) {
          for (let j = 0; j < this.cantidad; j++) {
            if (this.arrayRandoms.length < 8) {
              this.rnd = Math.round(Math.random() * this.cantidad)
              if (this.arrayRandoms.includes(this.rnd)) {
                continue;
              } else {
                if (this.rnd <= this.publicacionesDestacadas.length - 1) {
                  this.arrayRandoms.push(this.rnd);
                }
              }

            }
          }
        }
      }
    )
  }

  checkPagina() {
    if (this.singleton.getInicioSesion()) {
      this._auth.user_data(localStorage.getItem("email")).subscribe(
        res => {
          this.usuario = res;
          if (this.checkUsuarioCompleto(this.usuario)) {
            this.singleton.paginaActual("/register-publicacion");
            window.location.assign("/register-publicacion");
          } else {
            window.location.assign("/mi-cuenta/perfil");
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      window.location.assign("/login");
    }
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
    pagination: false,
    autoplay: { delay: 28000 },
    preventClicks: false
  };

  //SWIPER
  public config2: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    autoplay: { delay: 5500 },
  };

  scroll(element: HTMLElement){
    element.scrollIntoView();
  }


}
