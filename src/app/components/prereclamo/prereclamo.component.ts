import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-prereclamo',
  templateUrl: './prereclamo.component.html',
  styleUrls: ['./prereclamo.component.css']
})
export class PrereclamoComponent implements OnInit {
datosAlquiler:any;
  constructor(private _router: Router, private route: ActivatedRoute, private singleton: SingletonService,private _auth: AuthService,) { }

  ngOnInit() {
  }

  cancelacion() {
        this._router.navigate(['/reclamar-alquiler'])
      }
      
   

}
