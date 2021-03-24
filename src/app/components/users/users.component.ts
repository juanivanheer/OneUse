import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  id;
  hayUsuario: boolean = false;
  mostrar: boolean = false;
  alquileresTotal;
  alquileresUsuario = [];
  arrayPuntuacionesComentariosLocatarios = [];
  arrayPuntuacionesComentariosPropietarios = []
  usuario;
  imagen;
  tiempo;
  cantidad_alquilada = 0;
  titulo_cantidad;

  seleccion1_propietario: boolean = false;
  seleccion2_propietario: boolean = false;
  seleccion3_propietario: boolean = false;
  seleccion4_propietario: boolean = false;
  seleccion5_propietario: boolean = false;

  seleccion1_locatario: boolean = false;
  seleccion2_locatario: boolean = false;
  seleccion3_locatario: boolean = false;
  seleccion4_locatario: boolean = false;
  seleccion5_locatario: boolean = false;

  sumatoria_opiniones_locatarios = 0;
  sumatoria_buena_locatarios = 0;
  sumatoria_regular_locatarios = 0;
  sumatoria_mala_locatarios = 0;

  sumatoria_opiniones_propietarios = 0;
  sumatoria_buena_propietarios = 0;
  sumatoria_regular_propietarios = 0;
  sumatoria_mala_propietarios = 0;

  progress = 0;
  progress_buena_locatario = 0;
  progress_regular_locatario = 0;
  progress_mala_locatario = 0;

  progress_buena_propietario = 0;
  progress_regular_propietario = 0;
  progress_mala_propietario = 0;

  timer;
  timer1;
  timer2;
  timer3;
  timer4;
  timer5;
  timer6;

  ngOnInit() {
    this.id = String(window.location.href).slice(29)
    var obsA = this._auth.user_id(this.id);
    var obsB = this._auth.get_all_alquileres();
    const obsvArray = [obsA, obsB];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.hayUsuario = true;
        this.usuario = res[0];
        this.alquileresTotal = res[1];
        this.calcularTiempoUsuario();
        this.obtenerAlquileresUsuario();
        this.calcularCantidadAlquileres();
        this.calcularPuntuacionesPropietario();
        this.calcularPuntuacionesLocatario();
        this.llenarPuntuaciones();
        this.obtenerComentariosPuntuacionesLocatarios();
        this.obtenerComentariosPuntuacionesPropietarios();
        //Colocarlo al final, cuando se termine de traer todo
        this.mostrar = true;
      }
    );
  }

  calcularTiempoUsuario() {
    let fecha_creacion = new Date(this.usuario.createdAt);
    let fecha = new MyDate();
    let daysBetween: Date[] = fecha.getDates(fecha_creacion, new Date());
    let cantidad_de_anios = Math.floor(daysBetween.length / 365)
    if (cantidad_de_anios <= 0) {
      let meses = Math.floor(daysBetween.length / 29)
      if (meses == 0) {
        this.tiempo = "Nuevo usuario en OneUse"
      } else {
        if (meses == 1) {
          this.tiempo = meses + " mes realizando alquileres en OneUse"
        } else {
          this.tiempo = meses + " meses realizando alquileres en OneUse"
        }
      }
    } else {
      if (cantidad_de_anios == 1) {
        this.tiempo = "1 año realizando alquileres en OneUse"
      } else {
        this.tiempo = cantidad_de_anios + " años realizando alquileres en OneUse"
      }
    }
  }

  obtenerAlquileresUsuario() {
    for (let i = 0; i < this.alquileresTotal.length; i++) {
      const element = this.alquileresTotal[i];
      if ((element.name_usuarioLocatario == this.usuario.name || element.name_usuarioPropietario == this.usuario.name) && element.estado == "Finalizado") {
        this.alquileresUsuario.push(element);
      }
    }
  }

  calcularCantidadAlquileres() {
    for (let i = 0; i < this.alquileresUsuario.length; i++) {
      const element = this.alquileresUsuario[i];
      let fecha_creacion = new Date(element.createdAt);
      let fecha_limite_superior = new Date();
      let fecha_limite_inferior = new Date();
      fecha_limite_inferior.setMonth(fecha_limite_inferior.getMonth() - 3);
      if (fecha_creacion > fecha_limite_inferior && fecha_creacion < fecha_limite_superior) {
        this.cantidad_alquilada++;
      }
    }
    if (this.cantidad_alquilada == 1) {
      this.titulo_cantidad = "1 alquiler realizado en los últimos 90 días."
    } else {
      this.titulo_cantidad = this.cantidad_alquilada + " alquileres realizados en los últimos 90 días."
    }
  }

  calcularPuntuacionesPropietario() {
    let cantidad = 0, sumatoria = 0, promedio = 0;
    for (let i = 0; i < this.alquileresUsuario.length; i++) {
      const element = this.alquileresUsuario[i];
      if (element.puntuacion_locatario_al_propietario_ingresada && element.name_usuarioPropietario == this.usuario.name) {
        this.sumatoria_opiniones_locatarios++;
        sumatoria += element.puntuacion_locatario_al_propietario;
        cantidad++;
        if (element.puntuacion_locatario_al_propietario > 3) {
          this.sumatoria_buena_locatarios++;
        } else {
          if (element.puntuacion_locatario_al_propietario == 3) {
            this.sumatoria_regular_locatarios++;
          } else {
            if (element.puntuacion_locatario_al_propietario < 3) {
              this.sumatoria_mala_locatarios++;
            }
          }
        }
      }
    }
    promedio = Math.floor(sumatoria / cantidad);
    if (promedio == 1) {
      this.seleccion1_propietario = true;
      this.seleccion2_propietario = false;
      this.seleccion3_propietario = false;
      this.seleccion4_propietario = false;
      this.seleccion5_propietario = false;
    }
    if (promedio == 2) {
      this.seleccion1_propietario = true;
      this.seleccion2_propietario = true;
      this.seleccion3_propietario = false;
      this.seleccion4_propietario = false;
      this.seleccion5_propietario = false;
    }
    if (promedio == 3) {
      this.seleccion1_propietario = true;
      this.seleccion2_propietario = true;
      this.seleccion3_propietario = true;
      this.seleccion4_propietario = false;
      this.seleccion5_propietario = false;
    }
    if (promedio == 4) {
      this.seleccion1_propietario = true;
      this.seleccion2_propietario = true;
      this.seleccion3_propietario = true;
      this.seleccion4_propietario = true;
      this.seleccion5_propietario = false;
    }
    if (promedio == 5) {
      this.seleccion1_propietario = true;
      this.seleccion2_propietario = true;
      this.seleccion3_propietario = true;
      this.seleccion4_propietario = true;
      this.seleccion5_propietario = true;
    }
  }

  calcularPuntuacionesLocatario() {
    let cantidad = 0, sumatoria = 0, promedio = 0;
    for (let i = 0; i < this.alquileresUsuario.length; i++) {
      const element = this.alquileresUsuario[i];
      if (element.puntuacion_propietario_al_locatario_ingresada && element.name_usuarioLocatario == this.usuario.name) {
        this.sumatoria_opiniones_propietarios++;
        sumatoria += element.puntuacion_propietario_al_locatario;
        cantidad++;
        if (element.puntuacion_propietario_al_locatario > 3) {
          this.sumatoria_buena_propietarios++;
        } else {
          if (element.puntuacion_propietario_al_locatario == 3) {
            this.sumatoria_regular_propietarios++;
          } else {
            if (element.puntuacion_propietario_al_locatario < 3) {
              this.sumatoria_mala_propietarios++;
            }
          }
        }
      }
    }
    promedio = Math.floor(sumatoria / cantidad);
    if (promedio == 1) {
      this.seleccion1_locatario = true;
      this.seleccion2_locatario = false;
      this.seleccion3_locatario = false;
      this.seleccion4_locatario = false;
      this.seleccion5_locatario = false;
    }
    if (promedio == 2) {
      this.seleccion1_locatario = true;
      this.seleccion2_locatario = true;
      this.seleccion3_locatario = false;
      this.seleccion4_locatario = false;
      this.seleccion5_locatario = false;
    }
    if (promedio == 3) {
      this.seleccion1_locatario = true;
      this.seleccion2_locatario = true;
      this.seleccion3_locatario = true;
      this.seleccion4_locatario = false;
      this.seleccion5_locatario = false;
    }
    if (promedio == 4) {
      this.seleccion1_locatario = true;
      this.seleccion2_locatario = true;
      this.seleccion3_locatario = true;
      this.seleccion4_locatario = true;
      this.seleccion5_locatario = false;
    }
    if (promedio == 5) {
      this.seleccion1_locatario = true;
      this.seleccion2_locatario = true;
      this.seleccion3_locatario = true;
      this.seleccion4_locatario = true;
      this.seleccion5_locatario = true;
    }
  }

  llenarPuntuaciones() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 100;

      if (this.progress == 100) {

        clearInterval(this.timer);

        /* BARRA Puntuación buena locatarios */
        this.timer1 = setInterval(() => {
          if (this.sumatoria_buena_locatarios == 0) clearInterval(this.timer1);
          this.progress_buena_locatario = this.progress_buena_locatario + 1;
          if (this.progress_buena_locatario >= Math.floor(this.sumatoria_buena_locatarios * 100 / this.sumatoria_opiniones_locatarios)) {
            clearInterval(this.timer1);
          }
        }, 10)

        /* BARRA Puntuación regular locatarios */
        this.timer2 = setInterval(() => {
          if (this.sumatoria_regular_locatarios == 0) clearInterval(this.timer2);
          this.progress_regular_locatario = this.progress_regular_locatario + 1;
          if (this.progress_regular_locatario >= Math.floor(this.sumatoria_regular_locatarios * 100 / this.sumatoria_opiniones_locatarios)) {
            clearInterval(this.timer2);
          }
        }, 10)

        /* BARRA Puntuación mala locatarios */
        this.timer3 = setInterval(() => {
          if (this.sumatoria_mala_locatarios == 0) clearInterval(this.timer3);
          this.progress_mala_locatario = this.progress_mala_locatario + 1;
          if (this.progress_mala_locatario >= Math.floor(this.sumatoria_mala_locatarios * 100 / this.sumatoria_opiniones_locatarios)) {
            clearInterval(this.timer3);
          }
        }, 10)

        /* 4° BARRA Responsabilidad Social */
        this.timer4 = setInterval(() => {
          if (this.sumatoria_buena_propietarios == 0) clearInterval(this.timer4);
          this.progress_buena_propietario = this.progress_buena_propietario + 0.5;
          if (this.progress_buena_propietario >= Math.floor(this.sumatoria_buena_propietarios * 100 / this.sumatoria_opiniones_propietarios)) {
            clearInterval(this.timer4);
          }
        }, 10)

        /* 5° BARRA Excelencia */
        this.timer5 = setInterval(() => {
          if (this.sumatoria_regular_propietarios == 0) clearInterval(this.timer5);
          this.progress_regular_propietario = this.progress_regular_propietario + 0.5;
          if (this.progress_regular_propietario >= Math.floor(this.sumatoria_regular_propietarios * 100 / this.sumatoria_opiniones_propietarios)) {
            clearInterval(this.timer5);
          }
        }, 10)

        /* 6° BARRA Pasión */
        this.timer6 = setInterval(() => {
          if (this.sumatoria_mala_propietarios == 0) clearInterval(this.timer6);
          this.progress_mala_propietario = this.progress_mala_propietario + 0.5;
          if (this.progress_mala_propietario >= Math.floor(this.sumatoria_mala_propietarios * 100 / this.sumatoria_opiniones_propietarios)) {
            clearInterval(this.timer6);
          }
        }, 10)
      }
    }, 500)
  }

  inicio() {
    window.location.assign("/home");
  }

  obtenerComentariosPuntuacionesLocatarios() {
    if (this.alquileresUsuario.length > 0) {
      for (let i = 0; i < this.alquileresUsuario.length; i++) {
        const element = this.alquileresUsuario[i];
        if (element.puntuacion_locatario_al_propietario_ingresada && element.name_usuarioLocatario != this.usuario.name) {
          let puntuacion = element.puntuacion_locatario_al_propietario;
          let comentario = element.comentario_locatario_al_propietario;
          let usuario = element.name_usuarioLocatario;
          let fecha = new Date(element.updatedAt);
          let fecha_completa = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear()
          this.arrayPuntuacionesComentariosLocatarios.push(this.obtenerObjetoEstrellas(puntuacion, comentario, usuario, fecha_completa));
        }
      }
    }
  }

  obtenerComentariosPuntuacionesPropietarios() {
    if (this.alquileresUsuario.length > 0) {
      for (let i = 0; i < this.alquileresUsuario.length; i++) {
        const element = this.alquileresUsuario[i];
        if (element.puntuacion_propietario_al_locatario_ingresada && element.name_usuarioPropietario != this.usuario.name) {
          let puntuacion = element.puntuacion_propietario_al_locatario;
          let comentario = element.comentario_propietario_al_locatario;
          let usuario = element.name_usuarioPropietario;
          let fecha = new Date(element.updatedAt);
          let fecha_completa = fecha.getDate() + "/" + fecha.getMonth() + "/" + fecha.getFullYear()
          this.arrayPuntuacionesComentariosPropietarios.push(this.obtenerObjetoEstrellas(puntuacion, comentario, usuario, fecha_completa));
        }
      }
    }
  }

  obtenerObjetoEstrellas(estrella, comentario, usuario, fecha) {
    if (estrella == 1) {
      return { seleccion1: true, seleccion2: false, seleccion3: false, seleccion4: false, seleccion5: false, comentario: comentario, usuario: usuario, fecha: fecha }
    }
    if (estrella == 2) {
      return { seleccion1: true, seleccion2: true, seleccion3: false, seleccion4: false, seleccion5: false, comentario: comentario, usuario: usuario, fecha: fecha }
    }
    if (estrella == 3) {
      return { seleccion1: true, seleccion2: true, seleccion3: true, seleccion4: false, seleccion5: false, comentario: comentario, usuario: usuario, fecha: fecha }
    }
    if (estrella == 4) {
      return { seleccion1: true, seleccion2: true, seleccion3: true, seleccion4: true, seleccion5: false, comentario: comentario, usuario: usuario, fecha: fecha }
    }
    if (estrella == 5) {
      return { seleccion1: true, seleccion2: true, seleccion3: true, seleccion4: true, seleccion5: true, comentario: comentario, usuario: usuario, fecha: fecha }
    }
  }

  public config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 3,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: true,
    preventClicks: false,
    allowTouchMove: false
  };

}

class MyDate {
  dates: Date[];
  constructor() {
    this.dates = [];
  }

  private addDays(currentDate) {
    let date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    return date;
  }

  getDates(startDate: Date, endDate: Date) {
    let currentDate: Date = startDate;
    while (currentDate <= endDate) {
      this.dates.push(currentDate);
      currentDate = this.addDays(currentDate);
    }

    return this.dates;
  }
}