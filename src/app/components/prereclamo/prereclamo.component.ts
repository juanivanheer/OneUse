import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../singleton.service';

@Component({
  selector: 'app-prereclamo',
  templateUrl: './prereclamo.component.html',
  styleUrls: ['./prereclamo.component.css']
})
export class PrereclamoComponent implements OnInit {

  constructor(private _router: Router, private route: ActivatedRoute, private singleton: SingletonService) { }

  ngOnInit() {
  }

  cancelacion() {
    
      
        this._router.navigate(['/reclamar-alquiler'])

      }
      
   

}
