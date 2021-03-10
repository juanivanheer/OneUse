import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableBusquedaPalabra } from './data-table-bp-datasource';
import { StarRatingColor } from './star-rating.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-busqueda-publicaciones',
  templateUrl: './busqueda-publicaciones.component.html',
  styleUrls: ['./busqueda-publicaciones.component.css']
})
export class BusquedaPublicacionesComponent implements OnInit, OnDestroy {

  constructor(private _auth: AuthService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: DataTableBusquedaPalabra;
  displayedColumns = ['id']; /* ,'name', 'amount' */
  suscription: Subscription;

  palabra: string;
  publicaciones = []
  hayPublicaciones = true;
  filtroPrecioDia = false;
  filtroCategoria = false;
  filtroSubcategoria = false;
  filtroEstrellas = false;
  arraySubcategoriasTotal = [];
  arraySubcategorias = [];
  arrayCategorias = [];
  arrayFiltrosSeleccionados = [];
  objectSubcategoriaSeleccionada = {};
  removable = true;
  selectable = true;
  urlActual : String;


  url = new URL(window.location.href);
  params = new URLSearchParams(this.url.search.slice(1));

  ngOnInit() {
    this.clearURL();
    this.urlActual = document.location.href;
    let parametro = this.urlActual.slice(34);

    this.palabra = decodeURI(parametro);

    this.suscription = this._auth.search_palabra(this.palabra, '').subscribe(
      res => {
        if (res != undefined) {
          this.hayPublicaciones = true;
          this.publicaciones = res.publicaciones;

          //Categorías de las publicaciones con respecto a la palabra buscada
          for (let i = 0; i < this.publicaciones.length; i++) {
            if (i == 0) {
              this.arrayCategorias.push(this.publicaciones[i].categoria);
            } else {
              if (!this.arrayCategorias.includes(this.publicaciones[i].categoria)) {
                this.arrayCategorias.push(this.publicaciones[i].categoria)
              }
            }
          }
          this.arrayCategorias.sort();

          //Subcategorías obtenidas de las categorías de las publicaciones  
          for (let i = 0; i < this.arrayCategorias.length; i++) {
            let objeto = { 'categoria': this.arrayCategorias[i], 'valor': this.obtenerSubcategoria(this.arrayCategorias[i]) }
            this.arraySubcategoriasTotal.push(objeto);
          }
          this.arraySubcategoriasTotal.sort();

          this.dataSource = new DataTableBusquedaPalabra(this.paginator, this.sort, this.publicaciones);

        } else {
          this.hayPublicaciones = false;
        }
      }
    )
  }

  formatoSlider(value) {
    if (value >= 1000) {
      return '$' + Math.round(value / 1000) + 'k';
    }
    return '$' + value;
  }

  /* Métodos para filtrar por estrellas */
  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  onRatingChanged(rating) {
    this.rating = rating;
    this.filtroSeleccionado('star', rating);
  }


  /* Método para armar la URL dependiendo de qué filtro se seleccione */
  filtroSeleccionado(nombreParametro, valorParametro) {
    this.params.append(nombreParametro, valorParametro);
    window.history.replaceState({}, '', location.pathname + '?' + this.params);
    if (nombreParametro == 'c') {
      this.filtroCategoria = true;
      this.arraySubcategorias = this.obtenerArraySubcategoria(valorParametro);
      this.agregarFiltroChip("Categoría", valorParametro);
    }
    if (nombreParametro == 'sc') {
      this.filtroSubcategoria = true;
      this.agregarFiltroChip("Subcategoría", valorParametro)
    }
    if (nombreParametro == 'precio') {
      this.filtroPrecioDia = true;
      this.agregarFiltroChip("Precio", valorParametro)
    }
    if (nombreParametro == 'star') {
      this.filtroEstrellas = true;
      this.agregarFiltroChip("Estrellas", valorParametro);
    }

    this.suscription = this._auth.search_palabra(this.palabra, this.params).subscribe(
      res => {
        this.publicaciones = res.publicaciones;
        this.dataSource = new DataTableBusquedaPalabra(this.paginator, this.sort, this.publicaciones);
      }
    );
  }

  obtenerArraySubcategoria(valor) {
    for (let i = 0; i < this.arraySubcategoriasTotal.length; i++) {
      if (this.arraySubcategoriasTotal[i].categoria == valor) {
        return this.arraySubcategoriasTotal[i].valor
      }
    }
  }

  eliminarFiltro(filtro) {
    if (filtro.nombre == 'Categoría') {
      this.eliminarFiltroChip(filtro)
      this.params.delete('c');
      this.params.delete('sc');
      window.history.replaceState({}, '', location.pathname + '?' + this.params);
    }
    if (filtro.nombre == 'Subcategoría') {
      this.eliminarFiltroChip(filtro)
      this.params.delete('sc');
      window.history.replaceState({}, '', location.pathname + '?' + this.params);
    }
    if (filtro.nombre == 'Precio') {
      this.eliminarFiltroChip(filtro)
      this.params.delete('precio');
      window.history.replaceState({}, '', location.pathname + '?' + this.params);
    }
    if (filtro.nombre == 'Estrellas') {
      this.eliminarFiltroChip(filtro)
      this.params.delete('star');
      window.history.replaceState({}, '', location.pathname + '?' + this.params);
    }

    this.suscription = this._auth.search_palabra(this.palabra, this.params).subscribe(
      res => {
        console.log(res);
        this.publicaciones = res.publicaciones;
        this.dataSource = new DataTableBusquedaPalabra(this.paginator, this.sort, this.publicaciones);
      }
    );
  }

  clearURL() {
    window.history.replaceState({}, '', location.pathname);
    this.params.delete('star');
    this.params.delete('precio');
    this.params.delete('c');
    this.params.delete('sc');
    this.filtroCategoria = false;
    this.filtroSubcategoria = false;
    this.filtroPrecioDia = false;
    this.filtroEstrellas = false;
  }

  agregarFiltroChip(filtro, valor) {
    if (filtro == 'Precio') {
      this.arrayFiltrosSeleccionados.push({ 'nombre': filtro, 'valor': '$' + valor });
    } else {
      this.arrayFiltrosSeleccionados.push({ 'nombre': filtro, 'valor': valor });
      if (filtro == "Subcategoría") {
        this.objectSubcategoriaSeleccionada = { 'nombre': filtro, 'valor': valor };
      }
    }
  }

  eliminarFiltroChip(filtro) {
    var index = this.arrayFiltrosSeleccionados.indexOf(filtro);

    if (index => 0) {
      this.arrayFiltrosSeleccionados.splice(index, 1);
      if (filtro.nombre == "Categoría") {
        this.filtroCategoria = false;
        this.filtroSubcategoria = false;
        let index2;
        for (let i = 0; i < this.arrayFiltrosSeleccionados.length; i++) {
          if (this.arrayFiltrosSeleccionados[i].nombre == "Subcategoría") {
            index2 = i;
          }
        }
        if (index2 > -1) {
          this.arrayFiltrosSeleccionados.splice(index2, 1);
        }

      }
      if (filtro.nombre == "Subcategoría") {
        this.filtroSubcategoria = false;
      }
      if (filtro.nombre == "Precio") {
        this.filtroPrecioDia = false;
      }
      if (filtro.nombre == "Estrellas") {
        this.filtroEstrellas = false;
      }
    }

  }

  obtenerSubcategoria(nombre) {
    if (nombre == "Tecnologia") {
      return this.electronicaArray;
    }
    if (nombre == "Hogar") {
      return this.hogarArray;
    }
    if (nombre == "Deporte") {
      return this.deportesArray;
    }
    if (nombre == "Musica") {
      return this.musicaArray;
    }
    if (nombre == "Belleza") {
      return this.bellezaArray;
    }
    if (nombre == "Bebes") {
      return this.bebesArray;
    }
    if (nombre == "Mascotas") {
      return this.animalesArray;
    }
    if (nombre == "Herramientas") {
      return this.herramientasArray;
    }
    if (nombre == "Libros") {
      return this.librosArray;
    }
    if (nombre == "Otros") {
      return this.otrosArray;
    }
  }

  electronicaArray: string[] = ['TV - Audio - Video', 'Celulares - Tablets', 'Computadoras', 'Notebooks', 'Videojuegos', 'Consolas', 'Cámaras y accesorios']
  hogarArray: string[] = ['Accesorios (Hogar)', 'Decoración', 'Electrodomésticos', 'Muebles', 'Jardin']
  deportesArray: string[] = ['Aerobics y fitness', 'Bicicletas y ciclismo', 'Camping y pesca', 'Deportes acuaticos', 'Futbol', 'Otros deportes']
  musicaArray: string[] = ['Arte y antiguedades', 'CDs - DVDs', 'Instrumentos musicales', 'Libros y revistas']
  bellezaArray: string[] = ['Relojes - joyas - accesorios', 'Ropa y calzado', 'Salud y belleza']
  bebesArray: string[] = ['Cunas - Accesorios', 'Juegos - juguetes', 'Ropa bebés y niños']
  animalesArray: string[] = ['Accesorios para perros', 'Accesorios para gatos', 'Otros (mascotas)']
  librosArray: string[] = ['Novela', 'Gótico', 'Ciencia Ficción', 'Cuento de hadas', 'Acción', 'Drama', 'Suspenso', 'Terror', 'Fantástica']
  herramientasArray: string[] = ['Industria', 'Herramientas', 'Muebles para negocios - oficinas']
  otrosArray: string[] = ['Otra categoria']

  ngOnDestroy() {
    this.suscription.unsubscribe();
  }
}
