import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  progress = 0;
  progress1 = 0;
  progress2 = 0;
  progress3 = 0;
  progress4 = 0;
  progress5 = 0;
  progress6 = 0;
  progress7 = 0;
  progress8 = 0;

  timer;
  timer1;
  timer2;
  timer3;
  timer4;
  timer5;
  timer6;
  timer7;
  timer8;

  ngOnInit() {

    this.timer = setInterval(() => {
      this.progress = this.progress + 100;

      if (this.progress == 100) {

        clearInterval(this.timer);

        /* 1° BARRA Creatividad */
        this.timer1 = setInterval(() => {
          this.progress1 = this.progress1 + 0.8;
          if (this.progress1 >= 100) {
            clearInterval(this.timer1);
          }
        }, 10)

        /* 2° BARRA Transparencia */
        this.timer2 = setInterval(() => {
          this.progress2 = this.progress2 + 0.8;
          if (this.progress2 >= 100) {
            clearInterval(this.timer2);
          }
        }, 10)

        /* 3° BARRA Honestidad */
        this.timer3 = setInterval(() => {
          this.progress3 = this.progress3 + 0.8;
          if (this.progress3 >= 100) {
            clearInterval(this.timer3);
          }
        }, 10)

        /* 4° BARRA Responsabilidad Social */
        this.timer4 = setInterval(() => {
          this.progress4 = this.progress4 + 0.8;
          if (this.progress4 >= 100) {
            clearInterval(this.timer4);
          }
        }, 10)

        /* 5° BARRA Excelencia */
        this.timer5 = setInterval(() => {
          this.progress5 = this.progress5 + 0.8;
          if (this.progress5 >= 100) {
            clearInterval(this.timer5);
          }
        }, 10)

        /* 6° BARRA Pasión */
        this.timer6 = setInterval(() => {
          this.progress6 = this.progress6 + 0.8;
          if (this.progress6 >= 100) {
            clearInterval(this.timer6);
          }
        }, 10)

        /* 7° BARRA Seguridad */
        this.timer7 = setInterval(() => {
          this.progress7 = this.progress7 + 0.8;
          if (this.progress7 >= 100) {
            clearInterval(this.timer7);
          }
        }, 10)

        /* 8° BARRA Respeto */
        this.timer8 = setInterval(() => {
          this.progress8 = this.progress8 + 0.8;
          if (this.progress8 >= 100) {
            clearInterval(this.timer8);
          }
        }, 10)
      }
    }, 500)
  }

}
