import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../singleton.service';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacionemail.component.html',
  styleUrls: ['./confirmacionemail.component.css']
})
export class ConfirmacionEmailComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router, private route: ActivatedRoute, private singleton: SingletonService) { }

  private token: string;

  ngOnInit() {
    if (!this.singleton.verificarToken()) {
      this._router.navigate(['/*']);
    } else this.token = this.route.snapshot.params['token'];
  }

  confirmar() {
    this._auth.confirmar(this.token).subscribe(
      res => {
        localStorage.removeItem("token");
        this._router.navigate(['/home'])
      },
      err => console.log(err)
    )
  }

}
