import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../singleton.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  error: string;

  constructor(private singleton: SingletonService) { }

  ngOnInit() {
  }

  inicio(){
    window.location.assign("/");
  }



}
