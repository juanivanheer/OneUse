import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatSnackBar } from '@angular/material';
declare const nsfwjs: any;
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register-publicacion ',
  templateUrl: './register-publicacion.component.html',
  styleUrls: ['./register-publicacion.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }, UploadService]
})
export class RegisterPublicacionComponent implements OnInit {

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  categoriaFormGroup: FormGroup;
  datosProductosGroup: FormGroup;
  fotoProductoGroup: FormGroup;
  destacionProductoGroup: FormGroup;
  tipoAlquilerGroup: FormGroup;
  image;
  joinGroup;
  categoria: string;
  subcategoria: string;
  titulo: string;
  descripcion: string;
  preciodia: number;
  preciosemana: number;
  preciomes: number;
  destacar: String = 'NO';
  seDestaca: Boolean = false;
  tipoAlquiler: String;
  cantDias: number;
  cantidadDisponible: number;


  _id;


  /* Visualización de imagenes */
  public imagePath;
  imgURL: any;
  public message: string;
  public filesToUpload: Array<File>;
  hayImagen: boolean = false;
  arrayImagenes = null;
  predicciones = [];


  constructor(private _formBuilder: FormBuilder, private _auth: AuthService, private _uploadService: UploadService, private _snackBar: MatSnackBar, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.categoriaFormGroup = this._formBuilder.group({
      categoria: [''],
      subcategoria: ['', Validators.required]
    });

    this.datosProductosGroup = this._formBuilder.group({
      titulo: [{ value: '' }, Validators.required],
      descripcion: [{ value: '' }, Validators.required],
      preciodia: [{ value: '' }, Validators.required],
      preciosemana: [{ value: '', disabled: true }],
      preciomes: [{ value: '', disabled: true }],
      cantDias: [{ value: '' }, Validators.required],
      cantidadDisponible: [{ value: '' }, Validators.required]
    });

    this.fotoProductoGroup = this._formBuilder.group({
      multiplefile: [{ value: '' }, Validators.required]
    });
    this.destacionProductoGroup = this._formBuilder.group({
      destacar: [{ value: "" }]

    });
    this.tipoAlquilerGroup = this._formBuilder.group({
      tipoAlquiler: [{ value: '' }, Validators.required]
    });

    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value,
      ...this.destacionProductoGroup.value,
      ...this.tipoAlquilerGroup.value
    };
  }

  obtenerSubCategoria(evento) {
    this.subcategoria = evento.value;
  }

  obtenerCategoria(evento) {
    this.categoria = evento._element.nativeElement.title;
  }

  obtenerDestacacion(evento) {
    this.destacar = evento.value;
    if (this.destacar == 'SI') {
      this.seDestaca = true;
    } else {
      this.seDestaca = false;
    }
  }

  obtenerTipoAlquiler(evento) {
    this.tipoAlquiler = evento.value;
  }

  habilitarSemana(dias) {
    if (dias >= 7) this.datosProductosGroup.get("preciosemana").enable()
    else this.datosProductosGroup.get("preciosemana").disable()
  }

  habilitarMes(dias) {
    if (dias >= 28) this.datosProductosGroup.get("preciomes").enable()
    else this.datosProductosGroup.get("preciomes").disable()
  }

  async onFilesAdded(files: File[]) {
    this.spinner.show();
    this.predicciones = [];
    this.image = [];
    this.arrayImagenes = [];
    if (files.length > 5) {
      this._snackBar.open("No se pueden ingresar más de 5 imágenes", "Aceptar")
      this.image = [];
      this.arrayImagenes = [];
      this.fotoProductoGroup.patchValue({
        multiplefile: [{ value: "" }, Validators.required]
      })
    }
    else {
      this.image = files;
      this.arrayImagenes = [];
      this.arrayImagenes.length = 0;
      await files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent) => {
          const content = (e.target as FileReader).result;
          this.arrayImagenes.push(content);
          if (this.arrayImagenes.length == files.length) {
            this.detectarImagenes(this.arrayImagenes)
          }
        };
        reader.readAsDataURL(file);
      });

    }
  }

  /* Solo va a servir si se quieren agregar más imágenes al cuadrado, además de la que ya están
   pasoImagen() {
    if (this.arrayImagenes.length = 0) {
      this.fotoProductoGroup.patchValue({
        multiplefile: [{ value: "" }, Validators.required]
      })
    } else {
      this.fotoProductoGroup.patchValue({
        multiplefile: [{ value: this.arrayImagenes }, Validators.required]
      })
    }
  } */


  actualizarDatos() {

    if (this.preciomes == undefined || this.preciomes == null) {
      this.preciomes = 0;
    }

    if (this.preciosemana == undefined || this.preciosemana == null) {
      this.preciosemana = 0;
    }

    this.categoriaFormGroup.patchValue({
      categoria: this.categoria,
      subcategoria: this.subcategoria
    })

    this.datosProductosGroup.patchValue({
      titulo: this.titulo,
      descripcion: this.descripcion,
      preciodia: this.preciodia,
      preciosemana: this.preciosemana,
      preciomes: this.preciomes,
      cantDias: this.cantDias,
      cantidadDisponible: this.cantidadDisponible
    })

    this.fotoProductoGroup.patchValue({
      multiplefile: this.image
    })

    this.tipoAlquilerGroup.patchValue({
      tipoAlquiler: this.tipoAlquiler
    })

    this.destacionProductoGroup.patchValue({
      destacar: this.destacar
    })


    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value,
      ...this.destacionProductoGroup.value,
      ...this.tipoAlquilerGroup.value
    };

  }

  resetearDatos() {
    this.categoriaFormGroup.reset()

    this.datosProductosGroup.reset()

    this.fotoProductoGroup.reset()

    this.tipoAlquilerGroup.reset()

    this.destacionProductoGroup.reset()

    this.categoria = '';
    this.subcategoria = '';
    this.titulo = '';
    this.descripcion = '';
    this.preciodia = null;
    this.preciosemana = null;
    this.preciomes = null;
    this.image = '';
    this.tipoAlquiler = ''
    this.destacar = 'NO';
    this.cantidadDisponible = null;
    this.cantDias = null;

    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value,
      ...this.destacionProductoGroup.value,
      ...this.tipoAlquilerGroup.value
    };
  }

  onSubmit() {
    let email = localStorage.getItem("email");
    this.categoria = this.joinGroup.categoria;
    this.titulo = this.joinGroup.titulo;

    this._auth.registrarPublicacion(email, this.joinGroup).subscribe(
      response => {
        this._uploadService.makeFileRequest("http://localhost:4201/api/upload-publicacion-img/" + email + "/" + this.titulo + "/" + this.categoria, [], this.image, 'multiplefile')
          .then((result: any) => {
            if (this.seDestaca) {
              window.location.assign("/destacacion-publicacion/" + response._id);
            } else {
              window.location.assign("/publicacion-exito");
            }
          });
      },
      err => {
        /* this._uploadService.makeFileRequest("https://oneuse-backend.herokuapp.com/api/upload-publicacion-img/" + email + "/" + this.titulo + "/" + this.categoria, [], this.image, 'multiplefile')
        .then((result: any) => {
          console.log(result);
          if (this.seDestaca) {
            window.location.assign("/destacacion-publicacion");
          } else {
            window.location.assign("/publicacion-exito");
          } 

        });*/
      }
    )
  }




  /* ---------------- CARGA DE ARRAYS --------------------- */
  electronicaArray: string[] = ['TV - Audio - Video', 'Celulares - Tablets', 'Computadoras', 'Notebooks', 'Videojuegos', 'Consolas', 'Cámaras y accesorios']
  hogarArray: string[] = ['Accesorios (Hogar)', 'Decoración', 'Electrodomésticos', 'Muebles', 'Jardin']
  deportesArray: string[] = ['Aerobics y fitness', 'Bicicletas y ciclismo', 'Camping y pesca', 'Deportes acuaticos', 'Futbol', 'Otros deportes']
  musicaArray: string[] = ['Arte y antiguedades', 'CDs - DVDs', 'Instrumentos musicales', 'Libros y revistas']
  bellezaArray: string[] = ['Relojes - joyas - accesorios', 'Ropa y calzado', 'Salud y belleza']
  bebesArray: string[] = ['Cunas - Accesorios', 'Juegos - juguetes', 'Ropa bebés y niños']
  animalesArray: string[] = ['Accesorios para perros', 'Accesorios para gatos', 'Otros (mascotas)']
  herramientasArray: string[] = ['Industria', 'Repuestos', 'Muebles para negocios - oficinas']
  librosArray: string[] = ['Novela', 'Gótico', 'Ciencia Ficción', 'Cuento de hadas', 'Acción', 'Drama', 'Suspenso', 'Terror', 'Fantástica']
  otrosArray: string[] = ['Otra categoria']


  //SWIPER
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 5
  };

  //Snackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['color-snackbar']
    });
  }



  async detectarImagenes(array) {
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      var img = document.createElement("img");
      img.setAttribute("src", element);
      const model = await nsfwjs.load('../../../assets/js/model_nsfwjs/', { size: 299 })
      const predictions = await model.classify(img)
      console.log(predictions)
      this.predicciones.push(predictions)
    }
    this.procesarPredicciones();
  }

  procesarPredicciones() {
    for (let i = 0; i < this.predicciones.length; i++) {
      const imagen = this.predicciones[i];
      for (let j = 0; j < imagen.length; j++) {
        const prediccion = imagen[j];
        if ((prediccion.className == "Porn" && prediccion.probability > 0.30) || (prediccion.className == "Hentai" && prediccion.probability > 0.30) || (prediccion.className == "Sexy" && prediccion.probability > 0.30)) {
          this._snackBar.open("Una o varias de las imágenes cargadas no aceptan nuestros términos y condiciones", "Aceptar")
          this.spinner.hide();
          this.image = undefined;
          this.fotoProductoGroup.patchValue({
            multiplefile: [{ value: '' }, Validators.required]
          })
          this.actualizarDatos()
          return;
        } else {
          continue;
        }
      }
    }
    this.fotoProductoGroup.patchValue({
      multiplefile: [{ value: this.arrayImagenes }, Validators.required]
    })
    this.spinner.hide();
  }

}
