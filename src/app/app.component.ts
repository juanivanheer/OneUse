import { Component, OnInit } from '@angular/core';
import "rxjs/add/observable/zip";
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Front-End';

  constructor( private _auth: AuthService){}

  ngOnInit(): void {
    this.registrarIP()
  }

  registrarIP() {
    var obsA = this._auth.get_all_visitas_IP();
    var obsB = this._auth.get_direccion_ip();
    var obsC = this._auth.get_all_users();
    const obsvArray = [obsA, obsB, obsC];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        let visitas = res[0];
        let direccion_ip = res[1];
        let usuarios = res[2];

        if (visitas.length == 0 && localStorage.getItem("email") != undefined) {
          let usuario, email = localStorage.getItem("email");
          for (let j = 0; j < usuarios.length; j++) {
            const element2 = usuarios[j];
            if (element2.email == email) {
              usuario = element2;
              break;
            }
          }

          this._auth.get_info_IP(direccion_ip).subscribe(
            res => {
              let objeto = {
                ip: res.ip,
                user: usuario,
                continent_name: res.continent_name,
                country_name: res.country_name,
                region_name: res.region_name,
                city: res.city,
                zip: res.zip,
                latitude: res.latitude,
                longitude: res.longitude
              }
              this._auth.registrar_visita_IP(objeto).subscribe(
                res => {
                  console.log(res)
                })
            }
          )
        }

        if (visitas.length > 0 && localStorage.getItem("email") != undefined) {
          let email = localStorage.getItem("email");
          for (let i = 0; i < visitas.length; i++) {
            const element1 = visitas[i];
            if (element1.user.email == email) {
              break;
            }

            if (i == visitas.length--) {
              let usuario;
              for (let j = 0; j < usuarios.length; j++) {
                const element2 = usuarios[j];
                if (element2.email == email) {
                  usuario = element2;
                  break;
                }
              }

              this._auth.get_info_IP(direccion_ip).subscribe(
                res => {
                  let objeto = {
                    ip: res.ip,
                    user: usuario,
                    continent_name: res.continent_name,
                    country_name: res.country_name,
                    region_name: res.region_name,
                    city: res.city,
                    zip: res.zip,
                    latitude: res.latitude,
                    longitude: res.longitude
                  }
                  this._auth.registrar_visita_IP(objeto).subscribe(
                    res => {
                      console.log(res)
                    })
                }
              )
            }
          }
        }
      }
    )
  }
  
}

