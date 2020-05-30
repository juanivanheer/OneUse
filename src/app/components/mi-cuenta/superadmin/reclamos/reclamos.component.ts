import { Component, OnInit } from '@angular/core';
import { SingletonService } from 'src/app/components/singleton.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.css']
})
export class ReclamosComponent implements OnInit {

  constructor(private singleton: SingletonService) { }

  ngOnInit() {
  }

}
