import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { SingletonService } from 'src/app/components/singleton.service';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/zip";
import { NgxSpinnerService } from "ngx-spinner";
import * as FusionCharts from "fusioncharts";

export interface Estadisticas {
  name: string;
  estadistica: Estadistica[];
}

export interface Estadistica {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-estadisticas",
  templateUrl: "./estadisticas.component.html",
  styleUrls: ["./estadisticas.component.css"],
})
export class EstadisticasComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService, private _auth: AuthService, private singleton: SingletonService) { }

  /* Cantidad de publicaciones según categoría */
  array_completo = []
  arrayPublicacionesCategorias = [];
  arrayAlquileresCategorias = []
  arrayAlquileresPublicaciones = [];
  objetoSubcategorias = {};
  categoriaSeleccionada;
  alquileres = [];
  publicaciones = [];
  usuarios = [];
  visitas = [];
  arrayPeriodo = [];
  nombreEstadisticaSeleccionada;
  none = 1;
  textoSpinner = "Cargando datos"
  periodoSeleccionado;
  periodoRankingMesSeleccionado;
  periodoRankingAnioSeleccionado;

  /* Variables que hablitan/deshabilitan */
  estadisticaGeneralSeleccionada = false;
  alquileresCategoriaSeleccionada = false;
  alquileresSubcategoriaSeleccionada = false;
  publicacionesCategoriasSeleccionada = false;
  publicacionesSubcategoriaSeleccionada = false;
  mostrarGrafico = false;
  deshabilitarPeriodo = true;
  periodoDiaMesAnio = false;
  periodoRankingMesHabilitado = false;
  periodoRankingAnioHabilitado = false;
  noHayDatos = false;
  mostrarPeriodo = true;

  /* Variables UI grafica */
  width = 900;
  height = 700;
  type;
  dataFormat = "json";
  dataSource;
  mostrar: boolean = false;

  //{ value: 'Categorías donde más se hacen preguntas', viewValue: 'Categorías donde más se hacen preguntas' },
  //{ value: 'Cantidad de ingresos monetarios al sitio', viewValue: 'Cantidad de ingresos monetarios al sitio' },
  //{ value: 'Cantidad de visitas según destacación existente', viewValue: 'Cantidad de visitas según destacación existente' },
  //
  estadisticas: Estadisticas[] = [
    {
      name: 'ALQUILERES',
      estadistica: [
        { value: 'Cantidad total de alquileres según categoría', viewValue: 'Cantidad total de alquileres según categoría' },
        { value: 'Cantidad total de alquileres según subcategorías', viewValue: 'Cantidad total de alquileres según subcategorías' }
      ]
    },
    {
      name: 'PUBLICACIONES',
      estadistica: [
        { value: 'Cantidad total de publicaciones según categoría', viewValue: 'Cantidad total de publicaciones según categoría' },
        { value: 'Cantidad total de publicaciones según subcategorías', viewValue: 'Cantidad total de publicaciones según subcategorías' },
      ]
    },
    {
      name: 'USUARIOS',
      estadistica: [
        { value: 'Cantidad de usuarios filtrado por red social', viewValue: 'Cantidad de usuarios filtrados por red social' },
        { value: 'Ranking de quienes más alquilan objetos', viewValue: 'Ranking de quienes más alquilan objetos' },
        { value: 'Ranking de quienes más publican objetos', viewValue: 'Ranking de quienes más publican objetos' },
        { value: 'Ranking de propietarios mejores puntuados del sitio', viewValue: 'Ranking de propietarios mejores puntuados del sitio' },
        { value: 'Ranking de locatarios mejores puntuados del sitio', viewValue: 'Ranking de locatarios mejores puntuados del sitio' },
        { value: 'Ranking de los usuarios más denunciados', viewValue: 'Ranking de los usuarios más denunciados' },
      ]
    },
    {
      name: 'VISITAS',
      estadistica: [
        { value: 'Cantidad de visitantes al sitio', viewValue: 'Cantidad de visitantes al sitio' },
      ]
    },
    {
      name: 'RECLAMOS',
      estadistica: [
        { value: 'Cantidad de reclamos según el tipo de reclamo', viewValue: 'Cantidad de reclamos según el tipo de reclamo' },
      ]
    }
  ];

  subcategorias: string[] = [];

  periodo: string[] = ['Por día', 'Por mes', 'Por año'];
  periodoRanking: string[] = ['Esta semana', 'Por mes', 'Por año']
  periodoRankingMes = []
  periodoRankingAnio = [];

  ngOnInit() {
    //this.usuariosMasivos();
    this.deshabilitarTodo();
    var obsA = this._auth.get_all_alquileres();
    var obsB = this._auth.get_all_publicaciones();
    var obsC = this._auth.get_all_users();
    var obsD = this._auth.get_all_visitas_IP();
    const obsvArray = [obsA, obsB, obsC, obsD];
    const zip = Observable.zip(...obsvArray)
    zip.subscribe(
      res => {
        this.alquileres = res[0];
        this.publicaciones = res[1].publicaciones;
        this.usuarios = res[2];
        this.visitas = res[3];
        this.mostrar = true;
        //this.alquileresMasivos()
      }
    )
  }

  deshabilitarTodo() {
    this.alquileresCategoriaSeleccionada = false;
    this.alquileresSubcategoriaSeleccionada = false;
    this.publicacionesCategoriasSeleccionada = false;
    this.publicacionesSubcategoriaSeleccionada = false
    this.deshabilitarPeriodo = true;
    this.periodoDiaMesAnio = false;
    this.periodoRankingMesHabilitado = false;
    this.periodoRankingAnioHabilitado = false;
    this.estadisticaGeneralSeleccionada = false;
    this.noHayDatos = false;
    this.mostrarPeriodo = true;

    this.mostrarGrafico = false;
    this.subcategorias = []
    this.array_completo = [];
    this.arrayPeriodo = [];

    this.periodoSeleccionado = 'none';
    this.nombreEstadisticaSeleccionada = 'none';
    this.categoriaSeleccionada = 'none';
    this.periodoRankingMesSeleccionado = 'none'
    this.periodoRankingAnioSeleccionado = 'none'
  }

  estadisticaSeleccionada(estadistica) {
    this.textoSpinner = "Armando estadística"
    this.deshabilitarTodo();
    this.nombreEstadisticaSeleccionada = estadistica;
    /* ALQUILERES */
    if (estadistica == "Cantidad total de alquileres según categoría") {
      this.spinner.show();
      this.alquileresPorCategoria();
      this.alquileresCategoriaSeleccionada = true;
    }

    if (estadistica == "Cantidad total de alquileres según subcategorías") {
      this.spinner.show();
      this.alquileresPorCategoria();
      this.alquileresSubcategoriaSeleccionada = true;
      this.subcategorias = ["Tecnologia", "Hogar", "Deportes", "Musica", "Belleza", "Bebes", "Mascotas", "Herramientas", "Libros", "Otros"]
    }


    /* PUBLICACIONES */
    if (estadistica == "Cantidad total de publicaciones según categoría") {
      this.spinner.show();
      this.seleccionadoPublicacionesCategorias();
      this.publicacionesCategoriasSeleccionada = true;
    }

    if (estadistica == 'Cantidad total de publicaciones según subcategorías') {
      this.spinner.show();
      this.array_completo = this.calcularArrayPublicacionesCategorias(this.publicaciones);
      this.publicacionesSubcategoriaSeleccionada = true;
      this.subcategorias = ["Tecnologia", "Hogar", "Deportes", "Musica", "Belleza", "Bebes", "Mascotas", "Herramientas", "Libros", "Otros"]
    }


    /* USUARIOS */
    if (estadistica == "Cantidad de usuarios filtrados por red social") {
      this.spinner.show();
      let facebook = 0, google = 0, oneuse = 0, array = [];
      for (let i = 0; i < this.usuarios.length; i++) {
        const element = this.usuarios[i];
        if (element.tipo == "gmail") {
          google++;
        } else {
          if (element.tipo == "facebook") {
            facebook++;
          } else {
            oneuse++;
          }
        }
      }
      array.push({ label: 'Facebook', value: facebook, color: "#3b5998" }, { label: 'Google', value: google, color: "#DB4437" }, { label: 'OneUse', value: oneuse, color: "#fdbb30" })
      this.type = "doughnut3d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          caption: "Cantidad total de usuarios",
          subcaption: "Según red social registrada",
          plottooltext: "<b>$value</b> usuarios se registraron con $label",
          numbersuffix: " usuarios",
          usedataplotcolorforlabels: "1",
          showlabels: "1",
          enablesmartlabels: "1",
          theme: "fusion"
        },
        data: array
      };
      this.mostrarGrafico = true;
      this.spinner.hide();
    }

    if (estadistica == "Ranking de quienes más alquilan objetos") {
      this.spinner.show();
      var array_usuarios = [], array_calculo = [], array_resultado = [];

      for (let i = 0; i < this.alquileres.length; i++) {
        const element2 = this.alquileres[i];
        array_usuarios.push(element2.name_usuarioLocatario)
      }

      if (array_usuarios.length > 0) {
        for (let i = 0; i < array_usuarios.length; i++) {
          const element1 = array_usuarios[i];
          if (array_calculo.length == 0) {
            array_calculo.push([element1, 1])
          } else {
            let indice = -1;
            for (let j = 0; j < array_calculo.length; j++) {
              const element2 = array_calculo[j];
              if (element2[0] == element1) {
                indice = j;
                break;
              } else continue;
            }
            if (indice < 0) {
              array_calculo.push([element1, 1])
            } else {
              array_calculo[indice][1]++;
            }
          }
        }

        if (array_calculo.length > 5) {
          array_calculo.splice(5)
        }

        array_calculo.sort(function (a, b) {
          return b[1] - a[1];
        });

        for (let i = 0; i < array_calculo.length; i++) {
          const element = array_calculo[i];
          array_resultado.push({ label: element[0], value: element[1] })
        }
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de quienes más alquilan objetos",
          subcaption: "Histórico total",
          plottooltext: "<b>$label</b> realizó $value alquileres",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de alquileres",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    if (estadistica == "Ranking de quienes más publican objetos") {
      this.spinner.show();
      var array_usuarios = [], array_calculo = [], array_resultado = [];

      for (let i = 0; i < this.publicaciones.length; i++) {
        const element1 = this.publicaciones[i];
        for (let j = 0; j < this.usuarios.length; j++) {
          const element2 = this.usuarios[j];
          if (element2.email == element1.email) {
            array_usuarios.push(element2.name)
          }
        }
      }

      if (array_usuarios.length > 0) {
        for (let i = 0; i < array_usuarios.length; i++) {
          const element1 = array_usuarios[i];
          if (array_calculo.length == 0) {
            array_calculo.push([element1, 1])
          } else {
            let indice = -1;
            for (let j = 0; j < array_calculo.length; j++) {
              const element2 = array_calculo[j];
              if (element2[0] == element1) {
                indice = j;
                break;
              } else continue;
            }
            if (indice < 0) {
              array_calculo.push([element1, 1])
            } else {
              array_calculo[indice][1]++;
            }
          }
        }

        if (array_calculo.length > 5) {
          array_calculo.splice(5)
        }

        array_calculo.sort(function (a, b) {
          return b[1] - a[1];
        });

        for (let i = 0; i < array_calculo.length; i++) {
          const element = array_calculo[i];
          array_resultado.push({ label: element[0], value: element[1] })
        }
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de quienes más publican objetos",
          subcaption: "Histórico total",
          plottooltext: "<b>$label</b> realizó $value publicaciones",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de publicaciones",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    if (estadistica == 'Ranking de propietarios mejores puntuados del sitio') {
      let array_sumatorias = [], array_resultado = []
      for (let i = 0; i < this.alquileres.length; i++) {
        const element1 = this.alquileres[i];
        let existe = false;
        if (element1.puntuacion_locatario_al_propietario_ingresada == true) {
          if (array_sumatorias.length == 0) {
            array_sumatorias.push([element1.name_usuarioPropietario, 1, element1.puntuacion_locatario_al_propietario])
          } else {
            for (let j = 0; j < array_sumatorias.length; j++) {
              const element2 = array_sumatorias[j];
              if (element2.includes(element1.name_usuarioPropietario)) {
                element2[1]++;
                element2[2] += element1.puntuacion_locatario_al_propietario;
                existe = true;
                break;
              }
            }
            if (!existe) {
              array_sumatorias.push([element1.name_usuarioPropietario, 1, element1.puntuacion_locatario_al_propietario])
            }
          }
        }
      }

      if (array_sumatorias.length > 5) {
        array_sumatorias.splice(5)
      }

      array_resultado.sort(function (a, b) {
        return b[2] - a[2];
      })

      for (let i = 0; i < array_sumatorias.length; i++) {
        const element = array_sumatorias[i];
        let promedio = Math.floor(element[2] / element[1]);
        array_resultado.push({ label: element[0], value: promedio })
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de propietarios mejores puntuados del sitio",
          subcaption: "Histórico total",
          plottooltext: "<b>$label</b> tuvo una puntuación promedio de $value estrellas",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de estrellas",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    if (estadistica == 'Ranking de locatarios mejores puntuados del sitio') {
      let array_sumatorias = [], array_resultado = []
      for (let i = 0; i < this.alquileres.length; i++) {
        const element1 = this.alquileres[i];
        let existe = false;
        if (element1.puntuacion_propietario_al_locatario_ingresada == true) {
          if (array_sumatorias.length == 0) {
            array_sumatorias.push([element1.name_usuarioLocatario, 1, element1.puntuacion_propietario_al_locatario])
          } else {
            for (let j = 0; j < array_sumatorias.length; j++) {
              const element2 = array_sumatorias[j];
              if (element2.includes(element1.name_usuarioLocatario)) {
                element2[1]++;
                element2[2] += element1.puntuacion_propietario_al_locatario;
                existe = true;
                break;
              }
            }
            if (!existe) {
              array_sumatorias.push([element1.name_usuarioLocatario, 1, element1.puntuacion_propietario_al_locatario])
            }
          }
        }
      }

      if (array_sumatorias.length > 5) {
        array_sumatorias.splice(5)
      }

      array_resultado.sort(function (a, b) {
        return b[2] - a[2];
      })

      for (let i = 0; i < array_sumatorias.length; i++) {
        const element = array_sumatorias[i];
        let promedio = Math.floor(element[2] / element[1]);
        array_resultado.push({ label: element[0], value: promedio })
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de locatarios mejores puntuados del sitio",
          subcaption: "Histórico total",
          plottooltext: "<b>$label</b> tuvo una puntuación promedio de $value estrellas",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de estrellas",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    /*
        01	BA	Buenos Aires
        02	CT	Catamarca
        03	CC	Chaco
        04	CH	Chubut
        06	CN	Corrientes
        05	CB	Córdoba
        07	DF	Distrito Federal
        08	ER	Entre Rios
        09	FM	Formosa
        10	JY	Jujuy
        11	LP	La Pampa
        12	LR	La Rioja
        13	MZ	Mendoza
        14	MN	Misiones
        15	NQ	Neuquén
        16	RN	Rio Negro
        17	SA	Salta
        18	SJ	San Juan
        19	SL	San Luis
        20	SC	Santa Cruz
        21	SF	Santa Fe
        22	SE	Santiago del Estero
        23	TF	Tierra del Feugo
        24	TM	Tucumán
    */

    /* VISITANTES */
    if (estadistica == 'Cantidad de visitantes al sitio') {
      this.spinner.show();
      let array_provincias = [], array_resultado = []

      for (let i = 0; i < 25; i++) {
        array_provincias.push(0);
      }

      for (let i = 0; i < this.visitas.length; i++) {
        const element = this.visitas[i];
        if (String(element.region_name).includes('Aires')) array_provincias[1]++;
        if (String(element.region_name).includes('Catamarca')) array_provincias[2]++;
        if (String(element.region_name).includes('Chaco')) array_provincias[3]++;
        if (String(element.region_name).includes('Chubut')) array_provincias[4]++;
        if (String(element.region_name).includes('Córdoba')) array_provincias[5]++;
        if (String(element.region_name).includes('Corrientes')) array_provincias[6]++;
        if (String(element.region_name) == 'Ciudad De Buenos Aires') array_provincias[7]++;
        if (String(element.region_name).includes('Entre Rios')) array_provincias[8]++;
        if (String(element.region_name).includes('Formosa')) array_provincias[9]++;
        if (String(element.region_name).includes('Jujuy')) array_provincias[10]++;
        if (String(element.region_name).includes('La Pampa')) array_provincias[11]++;
        if (String(element.region_name).includes('La Rioja')) array_provincias[12]++;
        if (String(element.region_name).includes('Mendoza')) array_provincias[13]++;
        if (String(element.region_name).includes('Misiones')) array_provincias[14]++;
        if (String(element.region_name).includes('Neuquén')) array_provincias[15]++;
        if (String(element.region_name).includes('Rio Negro')) array_provincias[16]++;
        if (String(element.region_name).includes('Salta')) array_provincias[17]++;
        if (String(element.region_name).includes('San Juan')) array_provincias[18]++;
        if (String(element.region_name).includes('San Luis')) array_provincias[19]++;
        if (String(element.region_name).includes('Santa Cruz')) array_provincias[20]++;
        if (String(element.region_name).includes('Santa Fe')) array_provincias[21]++;
        if (String(element.region_name).includes('Santiago del Estero')) array_provincias[22]++;
        if (String(element.region_name).includes('Tierra del Fuego')) array_provincias[23]++;
        if (String(element.region_name).includes('Tucumán')) array_provincias[24]++;
      }

      for (let i = 1; i < array_provincias.length; i++) {
        let objeto = {
          id: i.toLocaleString('es-ES', {
            minimumIntegerDigits: 2,
            useGrouping: false
          }),
          value: array_provincias[i],
          showLabel: 1
        }
        array_resultado.push(objeto);
      }

      this.type = 'maps/argentina';
      this.dataSource = {
        "chart": {
          "caption": "Cantidad de visitas al sitio",
          "subcaption": "Según la localización del usuario",
          "includevalueinlabels": "1",
          "labelsepchar": ": ",
          "entityFillHoverColor": "#FFF9C4",
          "theme": "fusion"
        },
        "colorrange": {
          "minvalue": "1",
          "code": "#5D62B5",
          "gradient": "0",
          "color": [
            {
              "maxvalue": "30",
              "displayvalue": "1 - 50",
              "code": "#FFFAFA"
            },
            {
              "maxvalue": "150",
              "displayvalue": "50 - 150",
              "code": "#F4C2C2"
            },
            {
              "maxvalue": "400",
              "displayvalue": "150 - 400",
              "code": "#FF6961"
            }
          ]
        },
        "data": array_resultado
      }

      this.spinner.hide()
      this.mostrarGrafico = true;

    }
    this.mostrarGrafico = true;
  }

  alquileresPorCategoria() {
    this.arrayAlquileresPublicaciones = []
    this.arrayAlquileresCategorias = [];
    for (let i = 0; i < this.alquileres.length; i++) {
      const alq = this.alquileres[i];
      for (let j = 0; j < this.publicaciones.length; j++) {
        const pub = this.publicaciones[j];
        if (alq.id_publicacion == pub._id) {
          let objeto = {
            titulo: pub.titulo,
            categoria: pub.categoria,
            subcategoria: pub.subcategoria,
            fecha_alquiler: alq.createdAt,
          }
          this.arrayAlquileresPublicaciones.push(objeto);
        } else {
          continue;
        }
      }
    }

    this.array_completo = this.calcularArrayPublicacionesCategorias(this.arrayAlquileresPublicaciones);

    for (let index = 0; index < this.array_completo.length; index++) {
      const element = this.array_completo[index];
      this.arrayAlquileresCategorias.push({ label: element.categoria, value: element.value })
    }

    //CONFIGURACIÓN DE LA ENCUESTA
    this.type = "doughnut2d";

    this.dataSource = {
      chart: {
        bgColor: "#fafafa",
        caption: "Cantidad de alquileres según categoría",
        subcaption: "Sin tener en cuenta las subcategorías",
        showpercentvalues: "1",
        defaultcenterlabel: this.alquileres.length + " alquileres en total",
        aligncaptionwithcanvas: "0",
        captionpadding: "0",
        decimals: "1",
        plottooltext:
          "<b>$percentValue</b> de los alquileres son de la categoría <b>$label</b>",
        centerlabel: "$value alquileres",
        theme: "fusion"
      },
      data: this.arrayAlquileresCategorias
    };
    this.spinner.hide();
    this.mostrarGrafico = true;
  }

  calcularArrayPublicacionesCategorias(res) {
    let hogar = 0, deporte = 0, musica = 0, tecnologia = 0, mascotas = 0, libros = 0, belleza = 0, bebes = 0, herramientas = 0, otros = 0, tv_audio_video = 0, celulares_tablets = 0, computadoras = 0, notebooks = 0, videojuegos = 0, consolas = 0, camaras_y_accesorios = 0
    let accesorios_hogar = 0, decoracion = 0, electrodomesticos = 0, muebles = 0, jardin = 0, aerobics_y_fitness = 0, bicicletas_y_ciclismo = 0, camping_y_pesca = 0, deportes_acuaticos = 0, futbol = 0, otros_deportes = 0
    let arte_y_antiguedades = 0, cds_dvds = 0, instrumentos_musicales = 0, libros_y_revistas = 0
    let relojes_joyas_accesorios = 0, ropa_y_calzado = 0, salud_y_belleza = 0
    let cunas_accesorios = 0, juegos_juguetes = 0, ropa_bebés_y_niños = 0
    let accesorios_para_perros = 0, accesorios_para_gatos = 0, otros_mascotas = 0
    let industria = 0, repuestos = 0, muebles_para_negocios_oficinas = 0
    let novela = 0, gotico = 0, ciencia_ficcion = 0, cuento_de_hadas = 0, accion = 0, drama = 0, suspenso = 0, terror = 0, fantastica = 0
    let otra_categoria = 0

    for (let index = 0; index < res.length; index++) {
      const p = res[index];
      if (p.categoria == "Tecnologia") {
        tecnologia++;
        if (p.subcategoria == "TV - Audio - Video") {
          tv_audio_video++;
        }
        if (p.subcategoria == "Celulares - Tablets") {
          celulares_tablets++;
        }
        if (p.subcategoria == "Computadoras") {
          computadoras++;
        }
        if (p.subcategoria == "Notebooks") {
          notebooks++;
        }
        if (p.subcategoria == "Videojuegos") {
          videojuegos++;
        }
        if (p.subcategoria == "Consolas") {
          consolas++;
        }
        if (p.subcategoria == "Cámaras y accesorios") {
          camaras_y_accesorios++;
        }
      }

      if (p.categoria == "Hogar") {
        hogar++;
        if (p.subcategoria == "Accesorios (Hogar)") {
          accesorios_hogar++;
        }
        if (p.subcategoria == "Decoración") {
          decoracion++;
        }
        if (p.subcategoria == "Electrodomésticos") {
          electrodomesticos++;
        }
        if (p.subcategoria == "Muebles") {
          muebles++;
        }
        if (p.subcategoria == "Jardin") {
          jardin++;
        }
      }

      if (p.categoria == "Deporte") {
        deporte++;
        if (p.subcategoria == "Aerobics y fitness") {
          aerobics_y_fitness++;
        }
        if (p.subcategoria == "Bicicletas y ciclismo") {
          bicicletas_y_ciclismo++;
        }
        if (p.subcategoria == "Camping y pesca") {
          camping_y_pesca++;
        }
        if (p.subcategoria == "Deportes acuaticos") {
          deportes_acuaticos++;
        }
        if (p.subcategoria == "Futbol") {
          futbol++;
        }
        if (p.subcategoria == "Otros deportes") {
          otros_deportes++;
        }
      }

      if (p.categoria == "Musica") {
        musica++;
        if (p.subcategoria == "Arte y antiguedades") {
          arte_y_antiguedades++;
        }
        if (p.subcategoria == "CDs - DVDs") {
          cds_dvds++;
        }
        if (p.subcategoria == "Instrumentos musicales") {
          instrumentos_musicales++;
        }
        if (p.subcategoria == "Libros y revistas") {
          libros_y_revistas++;
        }
      }

      if (p.categoria == "Belleza") {
        belleza++;
        if (p.subcategoria == "Relojes - joyas - accesorios") {
          relojes_joyas_accesorios++;
        }
        if (p.subcategoria == "Ropa y calzado") {
          ropa_y_calzado++;
        }
        if (p.subcategoria == "Salud y belleza") {
          salud_y_belleza++;
        }
      }


      if (p.categoria == "Bebes") {
        bebes++;
        if (p.subcategoria == "Cunas - Accesorios") {
          cunas_accesorios++;
        }
        if (p.subcategoria == "Juegos - juguetes") {
          juegos_juguetes++;
        }
        if (p.subcategoria == "Ropa bebés y niños") {
          ropa_bebés_y_niños++;
        }
      }

      if (p.categoria == "Mascotas") {
        mascotas++;
        if (p.subcategoria == "Accesorios para perros") {
          accesorios_para_perros++;
        }
        if (p.subcategoria == "Accesorios para gatos") {
          accesorios_para_gatos++;
        }
        if (p.subcategoria == "Otros (mascotas)") {
          otros_mascotas++;
        }
      }

      if (p.categoria == "Herramientas") {
        herramientas++;
        if (p.subcategoria == "Industria") {
          industria++;
        }
        if (p.subcategoria == "Repuestos") {
          repuestos++;
        }
        if (p.subcategoria == "Muebles para negocios - oficinas") {
          muebles_para_negocios_oficinas++;
        }
      }

      if (p.categoria == "Libros") {
        libros++;
        if (p.subcategoria == "Novela") {
          novela++;
        }
        if (p.subcategoria == "Gótico") {
          gotico++;
        }
        if (p.subcategoria == "Ciencia Ficción") {
          ciencia_ficcion++;
        }
        if (p.subcategoria == "Cuento de hadas") {
          cuento_de_hadas++;
        }
        if (p.subcategoria == "Acción") {
          accion++;
        }
        if (p.subcategoria == "Drama") {
          drama++;
        }
        if (p.subcategoria == "Suspenso") {
          suspenso++;
        }
        if (p.subcategoria == "Terror") {
          terror++;
        }
        if (p.subcategoria == "Fantástica") {
          fantastica++;
        }
      }

      if (p.categoria == "Otros") {
        otros++;
        if (p.subcategoria == "Otra categoria") {
          otra_categoria++;
        }
      }
    }

    this.spinner.hide();

    return [
      {
        categoria: 'Tecnologia', value: tecnologia, subcategorias: [
          { label: 'TV - Audio - Video', value: tv_audio_video },
          { label: 'Celulares - Tablets', value: celulares_tablets },
          { label: 'Computadoras', value: computadoras },
          { label: 'Notebooks', value: notebooks },
          { label: 'Videojuegos', value: videojuegos },
          { label: 'Consolas', value: consolas },
          { label: 'Cámaras y accesorios', value: camaras_y_accesorios }
        ]
      },
      {
        categoria: 'Hogar', value: hogar, subcategorias: [
          { label: 'Accesorios (Hogar)', value: accesorios_hogar },
          { label: 'Decoración', value: decoracion },
          { label: 'Electrodomésticos', value: electrodomesticos },
          { label: 'Muebles', value: muebles },
          { label: 'Jardin', value: jardin },
        ]
      },
      {
        categoria: 'Deportes', value: deporte, subcategorias: [
          { label: 'Aerobics y fitness', value: aerobics_y_fitness },
          { label: 'Bicicletas y ciclismo', value: bicicletas_y_ciclismo },
          { label: 'Camping y pesca', value: camping_y_pesca },
          { label: 'Deportes acuaticos', value: deportes_acuaticos },
          { label: 'Futbol', value: futbol },
          { label: 'Otros deportes', value: otros_deportes }
        ]
      },
      {
        categoria: 'Musica', value: musica, subcategorias: [
          { label: 'Arte y antiguedades', value: arte_y_antiguedades },
          { label: 'CDs - DVDs', value: cds_dvds },
          { label: 'Instrumentos musicales', value: instrumentos_musicales },
          { label: 'Libros y revistas', value: libros_y_revistas },
        ]
      },
      {
        categoria: 'Belleza', value: belleza, subcategorias: [
          { label: 'Relojes - joyas - accesorios', value: relojes_joyas_accesorios },
          { label: 'Ropa y calzado', value: ropa_y_calzado },
          { label: 'Salud y belleza', value: salud_y_belleza }
        ]
      },
      {
        categoria: 'Bebes', value: bebes, subcategorias: [
          { label: 'Cunas - Accesorios', value: cunas_accesorios },
          { label: 'Juegos - juguetes', value: juegos_juguetes },
          { label: 'Ropa bebés y niños', value: ropa_bebés_y_niños }
        ]
      },
      {
        categoria: 'Mascotas', value: mascotas, subcategorias: [
          { label: 'Accesorios para perros', value: accesorios_para_perros },
          { label: 'Accesorios para gatos', value: accesorios_para_gatos },
          { label: 'Otros (mascotas)', value: otros_mascotas }
        ]
      },
      {
        categoria: 'Herramientas', value: herramientas, subcategorias: [
          { label: 'Industria', value: industria },
          { label: 'Repuestos', value: repuestos },
          { label: 'Muebles para negocios - oficinas', value: muebles_para_negocios_oficinas }
        ]
      },
      {
        categoria: 'Libros', value: libros, subcategorias: [
          { label: 'Novela', value: novela },
          { label: 'Gótico', value: gotico },
          { label: 'Ciencia Ficción', value: ciencia_ficcion },
          { label: 'Cuento de hadas', value: cuento_de_hadas },
          { label: 'Acción', value: accion },
          { label: 'Drama', value: drama },
          { label: 'Suspenso', value: suspenso },
          { label: 'Terror', value: terror },
          { label: 'Fantástica', value: fantastica },
        ]
      },
      {
        categoria: 'Otros', value: otros, subcategorias: [
          { label: 'Otra categoria', value: otra_categoria },
        ]
      },
    ]
  }

  subcategoriaSeleccionada(tipo, categoria) {
    this.categoriaSeleccionada = categoria;

    if (this.categoriaSeleccionada != undefined) {
      this.spinner.show();
      this.type = "bar2d";
      this.objetoSubcategorias = {}

      if (this.categoriaSeleccionada == "Tecnologia") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Tecnologia") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Hogar") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Hogar") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Deportes") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Deportes") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Musica") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Musica") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Belleza") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Belleza") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Bebes") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Bebes") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Mascotas") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Mascotas") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Belleza") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Belleza") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Herramientas") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Herramientas") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Libros") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Libros") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      if (this.categoriaSeleccionada == "Otros") {
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          if (element.categoria == "Otros") {
            this.objetoSubcategorias = element.subcategorias
          }
        }
      }

      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Cantidad de " + tipo + " según la categoría " + this.categoriaSeleccionada,
          yaxisname: "Cantidad de " + tipo,
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> " + tipo,
          theme: "fusion"
        },
        data: this.objetoSubcategorias
      }
      this.spinner.hide();
      this.mostrarGrafico = true;
    }

  }

  seleccionadoPublicacionesCategorias() {
    this.arrayPublicacionesCategorias = [];
    this.array_completo = [];
    this._auth.get_all_publicaciones().subscribe(
      res => {
        this.array_completo = this.calcularArrayPublicacionesCategorias(res.publicaciones);
        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          this.arrayPublicacionesCategorias.push({ label: element.categoria, value: element.value })
        }

        //CONFIGURACIÓN DE LA ENCUESTA
        this.type = "doughnut2d";

        this.dataSource = {
          chart: {
            bgColor: "#fafafa",
            caption: "Cantidad de publicaciones según categoría",
            subcaption: "Sin tener en cuenta las subcategorías",
            showpercentvalues: "1",
            defaultcenterlabel: res.publicaciones.length + " publicaciones en total",
            aligncaptionwithcanvas: "0",
            captionpadding: "0",
            decimals: "1",
            plottooltext:
              "<b>$percentValue</b> de las publicaciones son de la categoría <b>$label</b>",
            centerlabel: "$value publicaciones",
            theme: "fusion"
          },
          data: this.arrayPublicacionesCategorias
        };
        this.mostrarGrafico = true;
        this.spinner.hide();
      }
    )
  }

  calcularPorPeriodo(periodo) {
    this.spinner.show();
    let array_general = [], array_parcial = [], array_fechas = [], objeto = {};

    /* Cantidad total de alquileres según categoría */
    if (periodo == "Por día" && this.nombreEstadisticaSeleccionada == "Cantidad total de alquileres según categoría") {
      let schema2 = [
        {
          "name": "Tiempo",
          "type": "date",
          "format": "%d-%b-%y"
        },
        {
          "name": "Categoria",
          "type": "string"
        },
        {
          "name": "Cantidad",
          "type": "number"
        }
      ]
      /* Arma array con las categorias que salen en una determinada fecha */
      for (let i = 0; i < this.arrayAlquileresPublicaciones.length; i++) {
        const element = this.arrayAlquileresPublicaciones[i];
        let fecha = new Date(element.fecha_alquiler);
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2)
        let formato_elemento = fecha.getUTCDate() + "-" + mes + "-" + año;
        objeto = {
          tiempo: formato_elemento,
          categoria: this.arrayAlquileresPublicaciones[i].categoria
        }
        array_parcial.push(objeto);
      }

      /* Arma array con las fechas de los alquileres creados */
      for (let i = 0; i < this.alquileres.length; i++) {
        const element1 = this.alquileres[i];
        let fecha = new Date(element1.createdAt);
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2)
        let formato_elemento = fecha.getUTCDate() + "-" + mes + "-" + año;
        if (array_fechas.length == 0) {
          array_fechas.push(formato_elemento);
        } else {
          if (!array_fechas.includes(formato_elemento)) {
            array_fechas.push(formato_elemento)
          }
        }
      }

      /* Arma array para el grafico */
      for (let i = 0; i < array_fechas.length; i++) {
        objeto = {};
        const element1 = array_fechas[i];
        let tecnologia = 0, hogar = 0, deporte = 0, musica = 0, belleza = 0, bebes = 0, mascotas = 0, herramientas = 0, libros = 0, otros = 0;
        for (let j = 0; j < array_parcial.length; j++) {
          const element2 = array_parcial[j];
          if (element1 == element2.tiempo) {
            if (element2.categoria == "Tecnologia") tecnologia++;
            if (element2.categoria == "Hogar") hogar++;
            if (element2.categoria == "Deporte") deporte++;
            if (element2.categoria == "Musica") musica++;
            if (element2.categoria == "Belleza") belleza++;
            if (element2.categoria == "Bebes") bebes++;
            if (element2.categoria == "Mascotas") mascotas++;
            if (element2.categoria == "Herramientas") herramientas++;
            if (element2.categoria == "Libros") libros++;
            if (element2.categoria == "Otros") otros++;
          }
        }

        array_general.push([element1, "Tecnologia", tecnologia])
        array_general.push([element1, "Hogar", hogar])
        array_general.push([element1, "Deporte", deporte])
        array_general.push([element1, "Musica", musica])
        array_general.push([element1, "Belleza", belleza])
        array_general.push([element1, "Bebes", bebes])
        array_general.push([element1, "Mascotas", mascotas])
        array_general.push([element1, "Herramientas", herramientas])
        array_general.push([element1, "Libros", libros])
        array_general.push([element1, "Otros", otros])
      }

      const fusionDataStore = new FusionCharts.DataStore();
      const fusionTable = fusionDataStore.createDataTable(array_general, schema2);
      this.type = "timeseries"
      this.dataSource = {
        chart: { theme: "fusion", bgColor: "#fafafa", },
        caption: {
          text: "Cantidad de alquileres según categoría"
        },
        subcaption: {
          text: "Ordenados por día"
        },
        series: "Categoria",
        yaxis: [
          {
            plot: "cantidad",
            title: "Cantidad",
            plottype: "smooth-line",
          }
        ]
      };
      this.dataSource.data = fusionTable;
      this.mostrarGrafico = true;
      this.spinner.hide();
    }

    if (periodo == "Por mes" && this.nombreEstadisticaSeleccionada == "Cantidad total de alquileres según categoría") {
      let array_meses = [], array_labels = [], array_categorias = [], array_total_mes = [];
      let belleza = 0, deporte = 0, bebes = 0, herramientas = 0, tecnologia = 0, hogar = 0, mascotas = 0, libros = 0, musica = 0, otros = 0;
      let array_belleza = [], array_deporte = [], array_bebes = [], array_herramientas = [], array_tecnologia = [], array_hogar = [];
      let array_mascotas = [], array_libros = [], array_musica = [], array_otros = [];

      /* Armar array con meses existentes en el array total + armar array con labels para el grafico + armar array con nombres de categorias*/
      for (let i = 0; i < this.arrayAlquileresPublicaciones.length; i++) {
        const element = this.arrayAlquileresPublicaciones[i];
        let fecha = new Date(element.fecha_alquiler)
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2, 4);
        let fecha_formateada = mes + " " + año
        if (array_meses.length == 0) {
          array_meses.push(fecha_formateada);
        } else {
          if (!array_meses.includes(fecha_formateada)) {
            array_meses.push(fecha_formateada);
          }
        }

        let categoria = element.categoria;
        if (array_categorias.length == 0) {
          array_categorias.push(categoria);
        } else {
          if (!array_categorias.includes(categoria)) {
            array_categorias.push(categoria)
          }
        }
      }

      /*Armar array con totales por mes */
      for (let i = 0; i < array_meses.length; i++) {
        const element1 = array_meses[i];
        belleza = 0, deporte = 0, bebes = 0, herramientas = 0, tecnologia = 0, hogar = 0, mascotas = 0, libros = 0, musica = 0, otros = 0;
        for (let j = 0; j < this.arrayAlquileresPublicaciones.length; j++) {
          const element2 = this.arrayAlquileresPublicaciones[j];
          let fecha = new Date(element2.fecha_alquiler)
          let mes = this.obtenerMes(fecha);
          let año = String(fecha.getFullYear()).slice(2, 4);
          let fecha_formateada = mes + " " + año;
          if (fecha_formateada == element1) {
            if (element2.categoria == "Tecnologia") tecnologia++;
            if (element2.categoria == "Hogar") hogar++;
            if (element2.categoria == "Deporte") deporte++;
            if (element2.categoria == "Musica") musica++;
            if (element2.categoria == "Belleza") belleza++;
            if (element2.categoria == "Bebes") bebes++;
            if (element2.categoria == "Mascotas") mascotas++;
            if (element2.categoria == "Herramientas") herramientas++;
            if (element2.categoria == "Libros") libros++;
            if (element2.categoria == "Otros") otros++;
          }
        }
        array_total_mes.push([element1, "Tecnologia", tecnologia])
        array_total_mes.push([element1, "Hogar", hogar])
        array_total_mes.push([element1, "Deporte", deporte])
        array_total_mes.push([element1, "Musica", musica])
        array_total_mes.push([element1, "Belleza", belleza])
        array_total_mes.push([element1, "Bebes", bebes])
        array_total_mes.push([element1, "Mascotas", mascotas])
        array_total_mes.push([element1, "Herramientas", herramientas])
        array_total_mes.push([element1, "Libros", libros])
        array_total_mes.push([element1, "Otros", otros])

      }

      /* Ordena y crea los arreglos para después mostrar el gráfico */
      var monthNames = {
        "Jan 20": 1, "Feb 20": 2, "Mar 20": 3, "Apr 20": 4, "May 20": 5, "Jun 20": 6, "Jul 20": 7, "Aug 20": 8, "Sep 20": 9, "Oct 20": 10, "Nov 20": 11, "Dec 20": 12,
        "Jan 21": 13, "Feb 21": 14, "Mar 21": 15, "Apr 21": 16, "May 21": 17, "Jun 21": 18, "Jul 21": 19, "Aug 21": 20, "Sep 21": 21, "Oct 21": 22, "Nov 21": 23, "Dec 21": 24
      };

      array_total_mes.sort(function (a, b) {
        return monthNames[a[0]] - monthNames[b[0]];
      });

      array_meses.sort(function (a, b) {
        return monthNames[a] - monthNames[b];
      })

      for (let i = 0; i < array_total_mes.length; i++) {
        const element = array_total_mes[i];
        if (element[1] == "Tecnologia") array_tecnologia.push({ value: element[2] });
        if (element[1] == "Hogar") array_hogar.push({ value: element[2] });
        if (element[1] == "Deporte") array_deporte.push({ value: element[2] });
        if (element[1] == "Musica") array_musica.push({ value: element[2] });
        if (element[1] == "Belleza") array_belleza.push({ value: element[2] });
        if (element[1] == "Bebes") array_bebes.push({ value: element[2] });
        if (element[1] == "Mascotas") array_mascotas.push({ value: element[2] });
        if (element[1] == "Herramientas") array_herramientas.push({ value: element[2] });
        if (element[1] == "Libros") array_libros.push({ value: element[2] });
        if (element[1] == "Otros") array_otros.push({ value: element[2] });
      }

      for (let i = 0; i < array_meses.length; i++) {
        const element = array_meses[i];
        array_labels.push({ label: element })
      }

      this.type = "msspline";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          caption: "Cantidad de aquileres según categoría",
          bgColor: "#fafafa",
          xaxisname: "Meses",
          yaxisname: "Cantidad",
          subcaption: "Ordenados por mes",
          numdivlines: "3",
          showvalues: "1",
          legenditemfontsize: "11",
          legenditemfontbold: "1",
          theme: "fusion"
        },
        categories: [
          {
            category: array_labels
          }
        ],
        dataset: [
          {
            seriesname: "Tecnologia",
            data: array_tecnologia
          },
          {
            seriesname: "Hogar",
            data: array_hogar
          },
          {
            seriesname: "Deporte",
            data: array_deporte
          },
          {
            seriesname: "Musica",
            data: array_musica
          },
          {
            seriesname: "Belleza",
            data: array_belleza
          },
          {
            seriesname: "Bebes",
            data: array_bebes
          },
          {
            seriesname: "Herramientas",
            data: array_herramientas
          },
          {
            seriesname: "Libros",
            data: array_libros
          },
          {
            seriesname: "Otros",
            data: array_otros
          },
          {
            seriesname: "Mascotas",
            data: array_mascotas
          }
        ]
      }
      this.mostrarGrafico = true;
      this.spinner.hide();
    }

    if (periodo == "Por año" && this.nombreEstadisticaSeleccionada == "Cantidad total de alquileres según categoría") {
      let array_año = [], array_categorias = [], array_total_año = [], array_labels = [];
      let array_belleza = [], array_deporte = [], array_bebes = [], array_herramientas = [], array_tecnologia = [], array_hogar = [];
      let array_mascotas = [], array_libros = [], array_musica = [], array_otros = [];

      for (let i = 0; i < this.arrayAlquileresPublicaciones.length; i++) {
        const element = this.arrayAlquileresPublicaciones[i];
        let fecha = new Date(element.fecha_alquiler)
        let año = fecha.getFullYear()
        if (array_año.length == 0) {
          array_año.push(año);
        } else {
          if (!array_año.includes(año)) {
            array_año.push(año);
          }
        }

        let categoria = element.categoria;
        if (array_categorias.length == 0) {
          array_categorias.push(categoria);
        } else {
          if (!array_categorias.includes(categoria)) {
            array_categorias.push(categoria)
          }
        }
      }

      for (let i = 0; i < array_año.length; i++) {
        const element1 = array_año[i];
        let belleza = 0, deporte = 0, bebes = 0, herramientas = 0, tecnologia = 0, hogar = 0, mascotas = 0, libros = 0, musica = 0, otros = 0;
        for (let j = 0; j < this.arrayAlquileresPublicaciones.length; j++) {
          const element2 = this.arrayAlquileresPublicaciones[j];
          let fecha = new Date(element2.fecha_alquiler)
          let año = fecha.getFullYear()
          if (año == element1) {
            if (element2.categoria == "Tecnologia") tecnologia++;
            if (element2.categoria == "Hogar") hogar++;
            if (element2.categoria == "Deporte") deporte++;
            if (element2.categoria == "Musica") musica++;
            if (element2.categoria == "Belleza") belleza++;
            if (element2.categoria == "Bebes") bebes++;
            if (element2.categoria == "Mascotas") mascotas++;
            if (element2.categoria == "Herramientas") herramientas++;
            if (element2.categoria == "Libros") libros++;
            if (element2.categoria == "Otros") otros++;
          }
        }
        array_total_año.push([element1, "Tecnologia", tecnologia])
        array_total_año.push([element1, "Hogar", hogar])
        array_total_año.push([element1, "Deporte", deporte])
        array_total_año.push([element1, "Musica", musica])
        array_total_año.push([element1, "Belleza", belleza])
        array_total_año.push([element1, "Bebes", bebes])
        array_total_año.push([element1, "Mascotas", mascotas])
        array_total_año.push([element1, "Herramientas", herramientas])
        array_total_año.push([element1, "Libros", libros])
        array_total_año.push([element1, "Otros", otros])
      }

      var years = { "2020": 1, "2021": 2 };
      array_año.sort();
      array_total_año.sort(function (a, b) {
        return years[a[0]] - years[b[0]];
      });

      for (let i = 0; i < array_total_año.length; i++) {
        const element = array_total_año[i];
        if (element[1] == "Tecnologia") array_tecnologia.push({ value: element[2] });
        if (element[1] == "Hogar") array_hogar.push({ value: element[2] });
        if (element[1] == "Deporte") array_deporte.push({ value: element[2] });
        if (element[1] == "Musica") array_musica.push({ value: element[2] });
        if (element[1] == "Belleza") array_belleza.push({ value: element[2] });
        if (element[1] == "Bebes") array_bebes.push({ value: element[2] });
        if (element[1] == "Mascotas") array_mascotas.push({ value: element[2] });
        if (element[1] == "Herramientas") array_herramientas.push({ value: element[2] });
        if (element[1] == "Libros") array_libros.push({ value: element[2] });
        if (element[1] == "Otros") array_otros.push({ value: element[2] });
      }

      for (let i = 0; i < array_año.length; i++) {
        const element = array_año[i];
        array_labels.push({ label: element })
      }

      this.type = "mscolumn3d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          caption: "Cantidad de aquileres según categoría",
          subcaption: "Ordenados por año",
          bgColor: "#fafafa",
          xaxisname: "Años",
          yaxisname: "Cantidad",
          formatnumberscale: "1",
          theme: "fusion",
          showvalues: "1"
        },
        categories: [
          {
            category: [{ label: "2020" }, { label: "2021" }]
          }
        ],
        dataset: [
          {
            seriesname: "Tecnologia",
            data: array_tecnologia
          },
          {
            seriesname: "Hogar",
            data: array_hogar
          },
          {
            seriesname: "Deporte",
            data: array_deporte
          },
          {
            seriesname: "Musica",
            data: array_musica
          },
          {
            seriesname: "Belleza",
            data: array_belleza
          },
          {
            seriesname: "Bebes",
            data: array_bebes
          },
          {
            seriesname: "Herramientas",
            data: array_herramientas
          },
          {
            seriesname: "Libros",
            data: array_libros
          },
          {
            seriesname: "Otros",
            data: array_otros
          },
          {
            seriesname: "Mascotas",
            data: array_mascotas
          }
        ]
      }
      this.mostrarGrafico = true;
      this.spinner.hide();

    }



    /* Cantidad total de alquileres según subcategoría */

    if (periodo == "Por día" && this.nombreEstadisticaSeleccionada == "Cantidad total de alquileres según subcategorías") {
      let schema2 = [
        {
          "name": "Tiempo",
          "type": "date",
          "format": "%d-%b-%y"
        },
        {
          "name": "Subcategoria",
          "type": "string"
        },
        {
          "name": "Cantidad",
          "type": "number"
        }
      ]
      /* Arma array con las categorias que salen en una determinada fecha */
      for (let i = 0; i < this.arrayAlquileresPublicaciones.length; i++) {
        const element = this.arrayAlquileresPublicaciones[i];
        let fecha = new Date(element.fecha_alquiler);
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2)
        let formato_elemento = fecha.getUTCDate() + "-" + mes + "-" + año;
        objeto = {
          tiempo: formato_elemento,
          categoria: this.arrayAlquileresPublicaciones[i].categoria,
          subcategoria: this.arrayAlquileresPublicaciones[i].subcategoria
        }
        array_parcial.push(objeto);
      }

      /* Arma array con las fechas de los alquileres creados */
      for (let i = 0; i < this.alquileres.length; i++) {
        const element1 = this.alquileres[i];
        let fecha = new Date(element1.createdAt);
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2)
        let formato_elemento = fecha.getUTCDate() + "-" + mes + "-" + año;
        if (array_fechas.length == 0) {
          array_fechas.push(formato_elemento);
        } else {
          if (!array_fechas.includes(formato_elemento)) {
            array_fechas.push(formato_elemento)
          }
        }
      }

      /* Arma array para el grafico */
      for (let i = 0; i < array_fechas.length; i++) {
        objeto = {};
        const element1 = array_fechas[i];

        //ELECTRONICA
        let tv_audio_video = 0, celulares_tablets = 0, computadoras = 0, notebooks = 0, videojuegos = 0, consolas = 0, camaras_y_accesorios = 0;

        //HOGAR
        let accesorios_hogar = 0, decoracion = 0, electrodomesticos = 0, muebles = 0, jardin = 0;

        //DEPORTES
        let aerobics_y_fitness = 0, bicicletas_y_ciclismo = 0, camping_y_pesca = 0, deportes_acuaticos = 0, futbol = 0, otros_deportes = 0;

        //MUSICA
        let arte_y_antiguedades = 0, cds_dvds = 0, instrumentos_musicales = 0, libros_y_revistas = 0;

        //BELLEZA
        let relojes_joyas_accesorios = 0, ropa_y_calzado = 0, salud_y_belleza = 0;

        //BEBES
        let cunas_accesorios = 0, juegos_juguetes = 0, ropa_bebés_y_niños = 0;

        //ANIMALES
        let accesorios_para_perros = 0, accesorios_para_gatos = 0, otros_mascotas = 0;

        //HERRAMIENTAS
        let industria = 0, repuestos = 0, muebles_para_negocios_oficinas = 0;

        //LIBROS
        let novela = 0, gotico = 0, ciencia_ficcion = 0, cuento_de_hadas = 0, accion = 0, drama = 0, suspenso = 0, terror = 0, fantastica = 0;

        //OTROS
        let otra_categoria = 0

        for (let j = 0; j < array_parcial.length; j++) {
          const element2 = array_parcial[j];
          if (element1 == element2.tiempo) {
            if (element2.categoria == "Tecnologia") {
              if (element2.subcategoria == 'TV - Audio - Video') tv_audio_video++;
              if (element2.subcategoria == 'Celulares - Tablets') celulares_tablets++;
              if (element2.subcategoria == 'Computadoras') computadoras++;
              if (element2.subcategoria == 'Notebooks') notebooks++;
              if (element2.subcategoria == 'Videojuegos') videojuegos++;
              if (element2.subcategoria == 'Consolas') consolas++;
              if (element2.subcategoria == 'Cámaras y accesorios') camaras_y_accesorios++;
            }

            if (element2.categoria == "Hogar") {
              if (element2.subcategoria == 'Accesorios (Hogar)') accesorios_hogar++;
              if (element2.subcategoria == 'Decoración') decoracion++;
              if (element2.subcategoria == 'Electrodomésticos') electrodomesticos++;
              if (element2.subcategoria == 'Muebles') muebles++;
              if (element2.subcategoria == 'Jardin') jardin++;
            }

            if (element2.categoria == "Deporte") {
              if (element2.subcategoria == 'Aerobics y fitness') aerobics_y_fitness++;
              if (element2.subcategoria == 'Bicicletas y ciclismo') bicicletas_y_ciclismo++;
              if (element2.subcategoria == 'Camping y pesca') camping_y_pesca++;
              if (element2.subcategoria == 'Deportes acuaticos') deportes_acuaticos++;
              if (element2.subcategoria == 'Futbol') futbol++;
              if (element2.subcategoria == 'Otros deportes') otros_deportes++;
            }

            if (element2.categoria == "Musica") {
              if (element2.subcategoria == 'Arte y antiguedades') arte_y_antiguedades++;
              if (element2.subcategoria == 'CDs - DVDs') cds_dvds++;
              if (element2.subcategoria == 'Instrumentos musicales') instrumentos_musicales++;
              if (element2.subcategoria == 'Libros y revistas') libros_y_revistas++;
            }

            if (element2.categoria == "Belleza") {
              if (element2.subcategoria == 'Relojes - joyas - accesorios') relojes_joyas_accesorios++;
              if (element2.subcategoria == 'Ropa y calzado') ropa_y_calzado++;
              if (element2.subcategoria == 'Salud y belleza') salud_y_belleza++;
            }

            if (element2.categoria == "Bebes") {
              if (element2.subcategoria == 'Cunas - Accesorios') cunas_accesorios++;
              if (element2.subcategoria == 'Juegos - juguetes') juegos_juguetes++;
              if (element2.subcategoria == 'Ropa bebés y niños') ropa_bebés_y_niños++;
            }

            if (element2.categoria == "Mascotas") {
              if (element2.subcategoria == 'Accesorios para perros') accesorios_para_perros++;
              if (element2.subcategoria == 'Accesorios para gatos') accesorios_para_gatos++;
              if (element2.subcategoria == 'Otros (mascotas)') otros_mascotas++;
            }

            if (element2.categoria == "Herramientas") {
              if (element2.subcategoria == 'Industria') industria++;
              if (element2.subcategoria == 'Repuestos') repuestos++;
              if (element2.subcategoria == 'Muebles para negocios - oficinas') muebles_para_negocios_oficinas++;
            }

            if (element2.categoria == "Libros") {
              if (element2.subcategoria == 'Novela') novela++;
              if (element2.subcategoria == 'Gótico') gotico++;
              if (element2.subcategoria == 'Ciencia Ficción') ciencia_ficcion++;
              if (element2.subcategoria == 'Cuento de hadas') cuento_de_hadas++;
              if (element2.subcategoria == 'Acción') accion++;
              if (element2.subcategoria == 'Drama') drama++;
              if (element2.subcategoria == 'Suspenso') suspenso++;
              if (element2.subcategoria == 'Terror') terror++;
              if (element2.subcategoria == 'Fantástica') fantastica++;
            }

            if (element2.categoria == "Otros") {
              if (element2.subcategoria == 'Otra categoria') otra_categoria++;
            }
          }
        }

        if (this.categoriaSeleccionada == "Tecnologia") {
          array_general.push([element1, "TV - Audio - Video", tv_audio_video]);
          array_general.push([element1, "Celulares - Tablets", celulares_tablets]);
          array_general.push([element1, "Computadoras", computadoras]);
          array_general.push([element1, "Notebooks", notebooks]);
          array_general.push([element1, "Videojuegos", videojuegos]);
          array_general.push([element1, "Consolas", consolas]);
          array_general.push([element1, "Cámaras y accesorios", camaras_y_accesorios]);
        }

        if (this.categoriaSeleccionada == "Hogar") {
          array_general.push([element1, "Accesorios (Hogar)", accesorios_hogar]);
          array_general.push([element1, "Decoración", decoracion]);
          array_general.push([element1, "Electrodomésticos", electrodomesticos]);
          array_general.push([element1, "Muebles", muebles]);
          array_general.push([element1, "Jardin", jardin]);
        }

        if (this.categoriaSeleccionada == "Deportes") {
          array_general.push([element1, "Aerobics y fitness", aerobics_y_fitness]);
          array_general.push([element1, "Bicicletas y ciclismo", bicicletas_y_ciclismo]);
          array_general.push([element1, "Camping y pesca", camping_y_pesca]);
          array_general.push([element1, "Deportes acuaticos", deportes_acuaticos]);
          array_general.push([element1, "Futbol", futbol]);
          array_general.push([element1, "Otros deportes", otros_deportes]);
        }

        if (this.categoriaSeleccionada == "Musica") {
          array_general.push([element1, "Arte y antiguedades", arte_y_antiguedades]);
          array_general.push([element1, "CDs - DVDs", cds_dvds]);
          array_general.push([element1, "Instrumentos musicales", instrumentos_musicales]);
          array_general.push([element1, "Libros y revistas", libros_y_revistas]);
        }

        if (this.categoriaSeleccionada == "Belleza") {
          array_general.push([element1, "Relojes - joyas - accesorios", relojes_joyas_accesorios]);
          array_general.push([element1, "Ropa y calzado", ropa_y_calzado]);
          array_general.push([element1, "Salud y belleza", salud_y_belleza]);
        }

        if (this.categoriaSeleccionada == "Bebes") {
          array_general.push([element1, "Cunas - Accesorios", cunas_accesorios]);
          array_general.push([element1, "Juegos - juguetes", juegos_juguetes]);
          array_general.push([element1, "Ropa bebés y niños", ropa_bebés_y_niños]);
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          array_general.push([element1, "Accesorios para perros", accesorios_para_perros]);
          array_general.push([element1, "Accesorios para gatos", accesorios_para_gatos]);
          array_general.push([element1, "Otros (mascotas)", otros_mascotas]);
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          array_general.push([element1, "Industria", industria]);
          array_general.push([element1, "Repuestos", repuestos]);
          array_general.push([element1, "Muebles para negocios - oficinas", muebles_para_negocios_oficinas]);
        }

        if (this.categoriaSeleccionada == "Libros") {
          array_general.push([element1, "Novela", novela]);
          array_general.push([element1, "Gótico", gotico]);
          array_general.push([element1, "Ciencia Ficción", ciencia_ficcion]);
          array_general.push([element1, "Cuento de hadas", cuento_de_hadas]);
          array_general.push([element1, "Acción", accion]);
          array_general.push([element1, "Drama", drama]);
          array_general.push([element1, "Suspenso", suspenso]);
          array_general.push([element1, "Terror", terror]);
          array_general.push([element1, "Fantástica", fantastica]);
        }

        if (this.categoriaSeleccionada == "Otros") {
          array_general.push([element1, "Otra categoria", otra_categoria]);
        }
      }

      const fusionDataStore = new FusionCharts.DataStore();
      const fusionTable = fusionDataStore.createDataTable(array_general, schema2);
      this.type = "timeseries"
      this.dataSource = {
        chart: { theme: "fusion", bgColor: "#fafafa", xaxisname: "Días", },
        caption: {
          text: "Alquileres creados por día"
        },
        subcaption: {
          text: "Filtrados por subcategoría"
        },
        series: "Subcategoria",
        yaxis: [
          {
            plot: "cantidad",
            title: "Cantidad",
            plottype: "smooth-line",
          }
        ]
      };
      this.dataSource.data = fusionTable;
      this.mostrarGrafico = true;
      this.spinner.hide();
    }

    if (periodo == "Por mes" && this.nombreEstadisticaSeleccionada == "Cantidad total de alquileres según subcategorías") {
      let array_meses = [], array_labels = [], array_categorias = [], array_total_mes = [];

      //ELECTRONICA
      let array_tv_audio_video = [], array_celulares_tablets = [], array_computadoras = [], array_notebooks = [], array_videojuegos = [], array_consolas = [], array_camaras_y_accesorios = [];
      //HOGAR
      let array_accesorios_hogar = [], array_decoracion = [], array_electrodomesticos = [], array_muebles = [], array_jardin = [];
      //DEPORTES
      let array_aerobics_y_fitness = [], array_bicicletas_y_ciclismo = [], array_camping_y_pesca = [], array_deportes_acuaticos = [], array_futbol = [], array_otros_deportes = [];
      //MUSICA
      let array_arte_y_antiguedades = [], array_cds_dvds = [], array_instrumentos_musicales = [], array_libros_y_revistas = [];
      //BELLEZA
      let array_relojes_joyas_accesorios = [], array_ropa_y_calzado = [], array_salud_y_belleza = [];
      //BEBES
      let array_cunas_accesorios = [], array_juegos_juguetes = [], array_ropa_bebés_y_niños = []
      //ANIMALES
      let array_accesorios_para_perros = [], array_accesorios_para_gatos = [], array_otros_mascotas = [];
      //HERRAMIENTAS
      let array_industria = [], array_repuestos = [], array_muebles_para_negocios_oficinas = [];
      //LIBROS
      let array_novela = [], array_gotico = [], array_ciencia_ficcion = [], array_cuento_de_hadas = [], array_accion = [], array_drama = [], array_suspenso = [], array_terror = [], array_fantastica = [];
      //OTROS
      let array_otra_categoria = []

      /* Armar array con meses existentes en el array total + armar array con labels para el grafico + armar array con nombres de categorias*/
      for (let i = 0; i < this.arrayAlquileresPublicaciones.length; i++) {
        const element = this.arrayAlquileresPublicaciones[i];
        let fecha = new Date(element.fecha_alquiler)
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2, 4);
        let fecha_formateada = mes + " " + año
        if (array_meses.length == 0) {
          array_meses.push(fecha_formateada);
        } else {
          if (!array_meses.includes(fecha_formateada)) {
            array_meses.push(fecha_formateada);
          }
        }

        let categoria = element.categoria;
        if (array_categorias.length == 0) {
          array_categorias.push(categoria);
        } else {
          if (!array_categorias.includes(categoria)) {
            array_categorias.push(categoria)
          }
        }
      }

      /*Armar array con totales por mes */
      for (let i = 0; i < array_meses.length; i++) {
        const element1 = array_meses[i];
        //ELECTRONICA
        let tv_audio_video = 0, celulares_tablets = 0, computadoras = 0, notebooks = 0, videojuegos = 0, consolas = 0, camaras_y_accesorios = 0;

        //HOGAR
        let accesorios_hogar = 0, decoracion = 0, electrodomesticos = 0, muebles = 0, jardin = 0;

        //DEPORTES
        let aerobics_y_fitness = 0, bicicletas_y_ciclismo = 0, camping_y_pesca = 0, deportes_acuaticos = 0, futbol = 0, otros_deportes = 0;

        //MUSICA
        let arte_y_antiguedades = 0, cds_dvds = 0, instrumentos_musicales = 0, libros_y_revistas = 0;

        //BELLEZA
        let relojes_joyas_accesorios = 0, ropa_y_calzado = 0, salud_y_belleza = 0;

        //BEBES
        let cunas_accesorios = 0, juegos_juguetes = 0, ropa_bebés_y_niños = 0;

        //ANIMALES
        let accesorios_para_perros = 0, accesorios_para_gatos = 0, otros_mascotas = 0;

        //HERRAMIENTAS
        let industria = 0, repuestos = 0, muebles_para_negocios_oficinas = 0;

        //LIBROS
        let novela = 0, gotico = 0, ciencia_ficcion = 0, cuento_de_hadas = 0, accion = 0, drama = 0, suspenso = 0, terror = 0, fantastica = 0;

        //OTROS
        let otra_categoria = 0


        for (let j = 0; j < this.arrayAlquileresPublicaciones.length; j++) {
          const element2 = this.arrayAlquileresPublicaciones[j];
          let fecha = new Date(element2.fecha_alquiler)
          let mes = this.obtenerMes(fecha);
          let año = String(fecha.getFullYear()).slice(2, 4);
          let fecha_formateada = mes + " " + año;
          if (fecha_formateada == element1) {
            if (element2.categoria == "Tecnologia") {
              if (element2.subcategoria == 'TV - Audio - Video') tv_audio_video++;
              if (element2.subcategoria == 'Celulares - Tablets') celulares_tablets++;
              if (element2.subcategoria == 'Computadoras') computadoras++;
              if (element2.subcategoria == 'Notebooks') notebooks++;
              if (element2.subcategoria == 'Videojuegos') videojuegos++;
              if (element2.subcategoria == 'Consolas') consolas++;
              if (element2.subcategoria == 'Cámaras y accesorios') camaras_y_accesorios++;
            }

            if (element2.categoria == "Hogar") {
              if (element2.subcategoria == 'Accesorios (Hogar)') accesorios_hogar++;
              if (element2.subcategoria == 'Decoración') decoracion++;
              if (element2.subcategoria == 'Electrodomésticos') electrodomesticos++;
              if (element2.subcategoria == 'Muebles') muebles++;
              if (element2.subcategoria == 'Jardin') jardin++;
            }

            if (element2.categoria == "Deporte") {
              if (element2.subcategoria == 'Aerobics y fitness') aerobics_y_fitness++;
              if (element2.subcategoria == 'Bicicletas y ciclismo') bicicletas_y_ciclismo++;
              if (element2.subcategoria == 'Camping y pesca') camping_y_pesca++;
              if (element2.subcategoria == 'Deportes acuaticos') deportes_acuaticos++;
              if (element2.subcategoria == 'Futbol') futbol++;
              if (element2.subcategoria == 'Otros deportes') otros_deportes++;
            }

            if (element2.categoria == "Musica") {
              if (element2.subcategoria == 'Arte y antiguedades') arte_y_antiguedades++;
              if (element2.subcategoria == 'CDs - DVDs') cds_dvds++;
              if (element2.subcategoria == 'Instrumentos musicales') instrumentos_musicales++;
              if (element2.subcategoria == 'Libros y revistas') libros_y_revistas++;
            }

            if (element2.categoria == "Belleza") {
              if (element2.subcategoria == 'Relojes - joyas - accesorios') relojes_joyas_accesorios++;
              if (element2.subcategoria == 'Ropa y calzado') ropa_y_calzado++;
              if (element2.subcategoria == 'Salud y belleza') salud_y_belleza++;
            }

            if (element2.categoria == "Bebes") {
              if (element2.subcategoria == 'Cunas - Accesorios') cunas_accesorios++;
              if (element2.subcategoria == 'Juegos - juguetes') juegos_juguetes++;
              if (element2.subcategoria == 'Ropa bebés y niños') ropa_bebés_y_niños++;
            }

            if (element2.categoria == "Mascotas") {
              if (element2.subcategoria == 'Accesorios para perros') accesorios_para_perros++;
              if (element2.subcategoria == 'Accesorios para gatos') accesorios_para_gatos++;
              if (element2.subcategoria == 'Otros (mascotas)') otros_mascotas++;
            }

            if (element2.categoria == "Herramientas") {
              if (element2.subcategoria == 'Industria') industria++;
              if (element2.subcategoria == 'Repuestos') repuestos++;
              if (element2.subcategoria == 'Muebles para negocios - oficinas') muebles_para_negocios_oficinas++;
            }

            if (element2.categoria == "Libros") {
              if (element2.subcategoria == 'Novela') novela++;
              if (element2.subcategoria == 'Gótico') gotico++;
              if (element2.subcategoria == 'Ciencia Ficción') ciencia_ficcion++;
              if (element2.subcategoria == 'Cuento de hadas') cuento_de_hadas++;
              if (element2.subcategoria == 'Acción') accion++;
              if (element2.subcategoria == 'Drama') drama++;
              if (element2.subcategoria == 'Suspenso') suspenso++;
              if (element2.subcategoria == 'Terror') terror++;
              if (element2.subcategoria == 'Fantástica') fantastica++;
            }

            if (element2.categoria == "Otros") {
              if (element2.subcategoria == 'Otra categoria') otra_categoria++;
            }
          }
        }
        if (this.categoriaSeleccionada == "Tecnologia") {
          array_total_mes.push([element1, "TV - Audio - Video", tv_audio_video]);
          array_total_mes.push([element1, "Celulares - Tablets", celulares_tablets]);
          array_total_mes.push([element1, "Computadoras", computadoras]);
          array_total_mes.push([element1, "Notebooks", notebooks]);
          array_total_mes.push([element1, "Videojuegos", videojuegos]);
          array_total_mes.push([element1, "Consolas", consolas]);
          array_total_mes.push([element1, "Cámaras y accesorios", camaras_y_accesorios]);
        }

        if (this.categoriaSeleccionada == "Hogar") {
          array_total_mes.push([element1, "Accesorios (Hogar)", accesorios_hogar]);
          array_total_mes.push([element1, "Decoración", decoracion]);
          array_total_mes.push([element1, "Electrodomésticos", electrodomesticos]);
          array_total_mes.push([element1, "Muebles", muebles]);
          array_total_mes.push([element1, "Jardin", jardin]);
        }

        if (this.categoriaSeleccionada == "Deportes") {
          array_total_mes.push([element1, "Aerobics y fitness", aerobics_y_fitness]);
          array_total_mes.push([element1, "Bicicletas y ciclismo", bicicletas_y_ciclismo]);
          array_total_mes.push([element1, "Camping y pesca", camping_y_pesca]);
          array_total_mes.push([element1, "Deportes acuaticos", deportes_acuaticos]);
          array_total_mes.push([element1, "Futbol", futbol]);
          array_total_mes.push([element1, "Otros deportes", otros_deportes]);
        }

        if (this.categoriaSeleccionada == "Musica") {
          array_total_mes.push([element1, "Arte y antiguedades", arte_y_antiguedades]);
          array_total_mes.push([element1, "CDs - DVDs", cds_dvds]);
          array_total_mes.push([element1, "Instrumentos musicales", instrumentos_musicales]);
          array_total_mes.push([element1, "Libros y revistas", libros_y_revistas]);
        }

        if (this.categoriaSeleccionada == "Belleza") {
          array_total_mes.push([element1, "Relojes - joyas - accesorios", relojes_joyas_accesorios]);
          array_total_mes.push([element1, "Ropa y calzado", ropa_y_calzado]);
          array_total_mes.push([element1, "Salud y belleza", salud_y_belleza]);
        }

        if (this.categoriaSeleccionada == "Bebes") {
          array_total_mes.push([element1, "Cunas - Accesorios", cunas_accesorios]);
          array_total_mes.push([element1, "Juegos - juguetes", juegos_juguetes]);
          array_total_mes.push([element1, "Ropa bebés y niños", ropa_bebés_y_niños]);
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          array_total_mes.push([element1, "Accesorios para perros", accesorios_para_perros]);
          array_total_mes.push([element1, "Accesorios para gatos", accesorios_para_gatos]);
          array_total_mes.push([element1, "Otros (mascotas)", otros_mascotas]);
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          array_total_mes.push([element1, "Industria", industria]);
          array_total_mes.push([element1, "Repuestos", repuestos]);
          array_total_mes.push([element1, "Muebles para negocios - oficinas", muebles_para_negocios_oficinas]);
        }

        if (this.categoriaSeleccionada == "Libros") {
          array_total_mes.push([element1, "Novela", novela]);
          array_total_mes.push([element1, "Gótico", gotico]);
          array_total_mes.push([element1, "Ciencia Ficción", ciencia_ficcion]);
          array_total_mes.push([element1, "Cuento de hadas", cuento_de_hadas]);
          array_total_mes.push([element1, "Acción", accion]);
          array_total_mes.push([element1, "Drama", drama]);
          array_total_mes.push([element1, "Suspenso", suspenso]);
          array_total_mes.push([element1, "Terror", terror]);
          array_total_mes.push([element1, "Fantástica", fantastica]);
        }

        if (this.categoriaSeleccionada == "Otros") {
          array_total_mes.push([element1, "Otra categoria", otra_categoria]);
        }

      }

      /* Ordena y crea los arreglos para después mostrar el gráfico */
      var monthNames = {
        "Jan 20": 1, "Feb 20": 2, "Mar 20": 3, "Apr 20": 4, "May 20": 5, "Jun 20": 6, "Jul 20": 7, "Aug 20": 8, "Sep 20": 9, "Oct 20": 10, "Nov 20": 11, "Dec 20": 12,
        "Jan 21": 13, "Feb 21": 14, "Mar 21": 15, "Apr 21": 16, "May 21": 17, "Jun 21": 18, "Jul 21": 19, "Aug 21": 20, "Sep 21": 21, "Oct 21": 22, "Nov 21": 23, "Dec 21": 24
      };

      array_total_mes.sort(function (a, b) {
        return monthNames[a[0]] - monthNames[b[0]];
      });

      array_meses.sort(function (a, b) {
        return monthNames[a] - monthNames[b];
      })

      let dataset = [];
      for (let i = 0; i < array_total_mes.length; i++) {
        const element = array_total_mes[i];
        if (this.categoriaSeleccionada == "Tecnologia") {
          if (element[1] == "TV - Audio - Video") array_tv_audio_video.push({ value: element[2] });
          if (element[1] == "Celulares - Tablets") array_celulares_tablets.push({ value: element[2] });
          if (element[1] == "Computadoras") array_computadoras.push({ value: element[2] });
          if (element[1] == "Notebooks") array_notebooks.push({ value: element[2] });
          if (element[1] == "Videojuegos") array_videojuegos.push({ value: element[2] });
          if (element[1] == "Consolas") array_consolas.push({ value: element[2] });
          if (element[1] == "Cámaras y accesorios") array_camaras_y_accesorios.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_tv_audio_video, array_meses) != 0) {
              dataset.push({ seriesname: "TV - Audio - Video", data: array_tv_audio_video })
            }
            if (this.evitarLog(array_celulares_tablets, array_meses) != 0) {
              dataset.push({ seriesname: "Celulares - Tablets", data: array_celulares_tablets })
            }
            if (this.evitarLog(array_computadoras, array_meses) != 0) {
              dataset.push({ seriesname: "Computadoras", data: array_computadoras })
            }
            if (this.evitarLog(array_notebooks, array_meses) != 0) {
              dataset.push({ seriesname: "Notebooks", data: array_notebooks })
            }
            if (this.evitarLog(array_videojuegos, array_meses) != 0) {
              dataset.push({ seriesname: "Videojuegos", data: array_videojuegos })
            }
            if (this.evitarLog(array_consolas, array_meses) != 0) {
              dataset.push({ seriesname: "Consolas", data: array_consolas })
            }
            if (this.evitarLog(array_camaras_y_accesorios, array_meses) != 0) {
              dataset.push({ seriesname: "Cámaras y accesorios", data: array_camaras_y_accesorios })
            }
          }
        }

        if (this.categoriaSeleccionada == "Hogar") {
          if (element[1] == "Accesorios (Hogar)") array_accesorios_hogar.push({ value: element[2] });
          if (element[1] == "Decoración") array_decoracion.push({ value: element[2] });
          if (element[1] == "Electrodomésticos") array_electrodomesticos.push({ value: element[2] });
          if (element[1] == "Muebles") array_muebles.push({ value: element[2] });
          if (element[1] == "Jardin") array_jardin.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_accesorios_hogar, array_meses) != 0) {
              dataset.push({ seriesname: "Accesorios (Hogar)", data: array_accesorios_hogar })
            }
            if (this.evitarLog(array_decoracion, array_meses) != 0) {
              dataset.push({ seriesname: "Decoración", data: array_decoracion })
            }
            if (this.evitarLog(array_electrodomesticos, array_meses) != 0) {
              dataset.push({ seriesname: "Electrodomésticos", data: array_electrodomesticos })
            }
            if (this.evitarLog(array_muebles, array_meses) != 0) {
              dataset.push({ seriesname: "Muebles", data: array_muebles })
            }
            if (this.evitarLog(array_jardin, array_meses) != 0) {
              dataset.push({ seriesname: "Jardin", data: array_jardin })
            }
          }
        }

        if (this.categoriaSeleccionada == "Deportes") {
          if (element[1] == "Aerobics y fitness") array_aerobics_y_fitness.push({ value: element[2] });
          if (element[1] == "Bicicletas y ciclismo") array_bicicletas_y_ciclismo.push({ value: element[2] });
          if (element[1] == "Camping y pesca") array_camping_y_pesca.push({ value: element[2] });
          if (element[1] == "Deportes acuaticos") array_deportes_acuaticos.push({ value: element[2] });
          if (element[1] == "Futbol") array_futbol.push({ value: element[2] });
          if (element[1] == "Otros deportes") array_otros_deportes.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_aerobics_y_fitness, array_meses) != 0) {
              dataset.push({ seriesname: "Aerobics y fitness", data: array_aerobics_y_fitness })
            }
            if (this.evitarLog(array_bicicletas_y_ciclismo, array_meses) != 0) {
              dataset.push({ seriesname: "Bicicletas y ciclismo", data: array_bicicletas_y_ciclismo })
            }
            if (this.evitarLog(array_camping_y_pesca, array_meses) != 0) {
              dataset.push({ seriesname: "Camping y pesca", data: array_camping_y_pesca })
            }
            if (this.evitarLog(array_deportes_acuaticos, array_meses) != 0) {
              dataset.push({ seriesname: "Deportes acuaticos", data: array_deportes_acuaticos })
            }
            if (this.evitarLog(array_futbol, array_meses) != 0) {
              dataset.push({ seriesname: "Futbol", data: array_futbol })
            }
            if (this.evitarLog(array_otros_deportes, array_meses) != 0) {
              dataset.push({ seriesname: "Otros deportes", data: array_otros_deportes })
            }
          }
        }

        if (this.categoriaSeleccionada == "Musica") {
          if (element[1] == "Arte y antiguedades") array_arte_y_antiguedades.push({ value: element[2] });
          if (element[1] == "CDs - DVDs") array_cds_dvds.push({ value: element[2] });
          if (element[1] == "Instrumentos musicales") array_instrumentos_musicales.push({ value: element[2] });
          if (element[1] == "Libros y revistas") array_libros_y_revistas.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_arte_y_antiguedades, array_meses) != 0) {
              dataset.push({ seriesname: "Arte y antiguedades", data: array_arte_y_antiguedades })
            }
            if (this.evitarLog(array_cds_dvds, array_meses) != 0) {
              dataset.push({ seriesname: "CDs - DVDs", data: array_cds_dvds })
            }
            if (this.evitarLog(array_instrumentos_musicales, array_meses) != 0) {
              dataset.push({ seriesname: "Instrumentos musicales", data: array_instrumentos_musicales })
            }
            if (this.evitarLog(array_libros_y_revistas, array_meses) != 0) {
              dataset.push({ seriesname: "Libros y revistas", data: array_libros_y_revistas })
            }
          }
        }

        if (this.categoriaSeleccionada == "Belleza") {
          if (element[1] == "Relojes - joyas - accesorios") array_relojes_joyas_accesorios.push({ value: element[2] });
          if (element[1] == "Ropa y calzado") array_ropa_y_calzado.push({ value: element[2] });
          if (element[1] == "Salud y belleza") array_salud_y_belleza.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_relojes_joyas_accesorios, array_meses) != 0) {
              dataset.push({ seriesname: "Relojes - joyas - accesorios", data: array_relojes_joyas_accesorios })
            }
            if (this.evitarLog(array_ropa_y_calzado, array_meses) != 0) {
              dataset.push({ seriesname: "Ropa y calzado", data: array_ropa_y_calzado })
            }
            if (this.evitarLog(array_salud_y_belleza, array_meses) != 0) {
              dataset.push({ seriesname: "Salud y belleza", data: array_salud_y_belleza })
            }
          }
        }

        if (this.categoriaSeleccionada == "Bebes") {
          if (element[1] == "Cunas - Accesorios") array_cunas_accesorios.push({ value: element[2] });
          if (element[1] == "Juegos - juguetes") array_juegos_juguetes.push({ value: element[2] });
          if (element[1] == "Ropa bebés y niños") array_ropa_bebés_y_niños.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_cunas_accesorios, array_meses) != 0) {
              dataset.push({ seriesname: "Cunas - Accesorios", data: array_cunas_accesorios })
            }
            if (this.evitarLog(array_juegos_juguetes, array_meses) != 0) {
              dataset.push({ seriesname: "Juegos - juguetes", data: array_juegos_juguetes })
            }
            if (this.evitarLog(array_ropa_bebés_y_niños, array_meses) != 0) {
              dataset.push({ seriesname: "Ropa bebés y niños", data: array_ropa_bebés_y_niños })
            }
          }
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          if (element[1] == "Accesorios para perros") array_accesorios_para_perros.push({ value: element[2] });
          if (element[1] == "Accesorios para gatos") array_accesorios_para_gatos.push({ value: element[2] });
          if (element[1] == "Otros (mascotas)") array_otros_mascotas.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_accesorios_para_perros, array_meses) != 0) {
              dataset.push({ seriesname: "Accesorios para perros", data: array_accesorios_para_perros })
            }
            if (this.evitarLog(array_accesorios_para_gatos, array_meses) != 0) {
              dataset.push({ seriesname: "Accesorios para gatos", data: array_accesorios_para_gatos })
            }
            if (this.evitarLog(array_otros_mascotas, array_meses) != 0) {
              dataset.push({ seriesname: "Otros (mascotas)", data: array_otros_mascotas })
            }
          }
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          if (element[1] == "Industria") array_industria.push({ value: element[2] });
          if (element[1] == "Repuestos") array_repuestos.push({ value: element[2] });
          if (element[1] == "Muebles para negocios - oficinas") array_muebles_para_negocios_oficinas.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_industria, array_meses) != 0) {
              dataset.push({ seriesname: "Industria", data: array_industria })
            }
            if (this.evitarLog(array_repuestos, array_meses) != 0) {
              dataset.push({ seriesname: "Repuestos", data: array_repuestos })
            }
            if (this.evitarLog(array_muebles_para_negocios_oficinas, array_meses) != 0) {
              dataset.push({ seriesname: "Muebles para negocios - oficinas", data: array_muebles_para_negocios_oficinas })
            }
          }
        }

        if (this.categoriaSeleccionada == "Libros") {
          if (element[1] == "Novela") array_novela.push({ value: element[2] });
          if (element[1] == "Gótico") array_gotico.push({ value: element[2] });
          if (element[1] == "Ciencia Ficción") array_ciencia_ficcion.push({ value: element[2] });
          if (element[1] == "Cuento de hadas") array_cuento_de_hadas.push({ value: element[2] });
          if (element[1] == "Acción") array_accion.push({ value: element[2] });
          if (element[1] == "Drama") array_drama.push({ value: element[2] });
          if (element[1] == "Suspenso") array_suspenso.push({ value: element[2] });
          if (element[1] == "Terror") array_terror.push({ value: element[2] });
          if (element[1] == "Fantástica") array_fantastica.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_novela, array_meses) != 0) {
              dataset.push({ seriesname: "Novela", data: array_novela })
            }
            if (this.evitarLog(array_gotico, array_meses) != 0) {
              dataset.push({ seriesname: "Gótico", data: array_gotico })
            }
            if (this.evitarLog(array_ciencia_ficcion, array_meses) != 0) {
              dataset.push({ seriesname: "Ciencia Ficción", data: array_ciencia_ficcion })
            }
            if (this.evitarLog(array_cuento_de_hadas, array_meses) != 0) {
              dataset.push({ seriesname: "Cuento de hadas", data: array_cuento_de_hadas })
            }
            if (this.evitarLog(array_accion, array_meses) != 0) {
              dataset.push({ seriesname: "Acción", data: array_accion })
            }
            if (this.evitarLog(array_drama, array_meses) != 0) {
              dataset.push({ seriesname: "Drama", data: array_drama })
            }
            if (this.evitarLog(array_suspenso, array_meses) != 0) {
              dataset.push({ seriesname: "Suspenso", data: array_suspenso })
            }
            if (this.evitarLog(array_terror, array_meses) != 0) {
              dataset.push({ seriesname: "Terror", data: array_terror })
            }
            if (this.evitarLog(array_fantastica, array_meses) != 0) {
              dataset.push({ seriesname: "Fantástica", data: array_fantastica })
            }
          }
        }

        if (this.categoriaSeleccionada == "Otros") {
          if (element[1] == "Otra categoria") array_otra_categoria.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_otra_categoria, array_meses) != 0) {
              dataset.push({ seriesname: "Otra categoria", data: array_otra_categoria })
            }
          }
        }

      }

      for (let i = 0; i < array_meses.length; i++) {
        const element = array_meses[i];
        array_labels.push({ label: element })
      }

      /* Armado de los distintos dataset */
      this.type = "msspline";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          yAxisMinValue: "0",
          caption: "Cantidad de aquileres según subcategoría",
          xaxisname: "Meses",
          yaxisname: "Cantidad",
          subcaption: "Ordenados por mes",
          numdivlines: "1",
          showvalues: "1",
          legenditemfontsize: "11",
          legenditemfontbold: "1",

          theme: "fusion"
        },
        categories: [
          {
            category: array_labels
          }
        ],
        dataset: dataset
      }

      this.mostrarGrafico = true;
      this.spinner.hide();

    }

    if (periodo == "Por año" && this.nombreEstadisticaSeleccionada == "Cantidad total de alquileres según subcategorías") {
      let array_año = [], array_categorias = [], array_total_año = [], array_labels = [];
      //ELECTRONICA
      let array_tv_audio_video = [], array_celulares_tablets = [], array_computadoras = [], array_notebooks = [], array_videojuegos = [], array_consolas = [], array_camaras_y_accesorios = [];
      //HOGAR
      let array_accesorios_hogar = [], array_decoracion = [], array_electrodomesticos = [], array_muebles = [], array_jardin = [];
      //DEPORTES
      let array_aerobics_y_fitness = [], array_bicicletas_y_ciclismo = [], array_camping_y_pesca = [], array_deportes_acuaticos = [], array_futbol = [], array_otros_deportes = [];
      //MUSICA
      let array_arte_y_antiguedades = [], array_cds_dvds = [], array_instrumentos_musicales = [], array_libros_y_revistas = [];
      //BELLEZA
      let array_relojes_joyas_accesorios = [], array_ropa_y_calzado = [], array_salud_y_belleza = [];
      //BEBES
      let array_cunas_accesorios = [], array_juegos_juguetes = [], array_ropa_bebés_y_niños = []
      //ANIMALES
      let array_accesorios_para_perros = [], array_accesorios_para_gatos = [], array_otros_mascotas = [];
      //HERRAMIENTAS
      let array_industria = [], array_repuestos = [], array_muebles_para_negocios_oficinas = [];
      //LIBROS
      let array_novela = [], array_gotico = [], array_ciencia_ficcion = [], array_cuento_de_hadas = [], array_accion = [], array_drama = [], array_suspenso = [], array_terror = [], array_fantastica = [];
      //OTROS
      let array_otra_categoria = []

      for (let i = 0; i < this.arrayAlquileresPublicaciones.length; i++) {
        const element = this.arrayAlquileresPublicaciones[i];
        let fecha = new Date(element.fecha_alquiler)
        let año = fecha.getFullYear()
        if (array_año.length == 0) {
          array_año.push(año);
        } else {
          if (!array_año.includes(año)) {
            array_año.push(año);
          }
        }

        let categoria = element.categoria;
        if (array_categorias.length == 0) {
          array_categorias.push(categoria);
        } else {
          if (!array_categorias.includes(categoria)) {
            array_categorias.push(categoria)
          }
        }
      }

      for (let i = 0; i < array_año.length; i++) {
        const element1 = array_año[i];
        //ELECTRONICA
        let tv_audio_video = 0, celulares_tablets = 0, computadoras = 0, notebooks = 0, videojuegos = 0, consolas = 0, camaras_y_accesorios = 0;

        //HOGAR
        let accesorios_hogar = 0, decoracion = 0, electrodomesticos = 0, muebles = 0, jardin = 0;

        //DEPORTES
        let aerobics_y_fitness = 0, bicicletas_y_ciclismo = 0, camping_y_pesca = 0, deportes_acuaticos = 0, futbol = 0, otros_deportes = 0;

        //MUSICA
        let arte_y_antiguedades = 0, cds_dvds = 0, instrumentos_musicales = 0, libros_y_revistas = 0;

        //BELLEZA
        let relojes_joyas_accesorios = 0, ropa_y_calzado = 0, salud_y_belleza = 0;

        //BEBES
        let cunas_accesorios = 0, juegos_juguetes = 0, ropa_bebés_y_niños = 0;

        //ANIMALES
        let accesorios_para_perros = 0, accesorios_para_gatos = 0, otros_mascotas = 0;

        //HERRAMIENTAS
        let industria = 0, repuestos = 0, muebles_para_negocios_oficinas = 0;

        //LIBROS
        let novela = 0, gotico = 0, ciencia_ficcion = 0, cuento_de_hadas = 0, accion = 0, drama = 0, suspenso = 0, terror = 0, fantastica = 0;

        //OTROS
        let otra_categoria = 0

        for (let j = 0; j < this.arrayAlquileresPublicaciones.length; j++) {
          const element2 = this.arrayAlquileresPublicaciones[j];
          let fecha = new Date(element2.fecha_alquiler)
          let año = fecha.getFullYear()
          if (año == element1) {
            if (element2.categoria == "Tecnologia") {
              if (element2.subcategoria == 'TV - Audio - Video') tv_audio_video++;
              if (element2.subcategoria == 'Celulares - Tablets') celulares_tablets++;
              if (element2.subcategoria == 'Computadoras') computadoras++;
              if (element2.subcategoria == 'Notebooks') notebooks++;
              if (element2.subcategoria == 'Videojuegos') videojuegos++;
              if (element2.subcategoria == 'Consolas') consolas++;
              if (element2.subcategoria == 'Cámaras y accesorios') camaras_y_accesorios++;
            }

            if (element2.categoria == "Hogar") {
              if (element2.subcategoria == 'Accesorios (Hogar)') accesorios_hogar++;
              if (element2.subcategoria == 'Decoración') decoracion++;
              if (element2.subcategoria == 'Electrodomésticos') electrodomesticos++;
              if (element2.subcategoria == 'Muebles') muebles++;
              if (element2.subcategoria == 'Jardin') jardin++;
            }

            if (element2.categoria == "Deporte") {
              if (element2.subcategoria == 'Aerobics y fitness') aerobics_y_fitness++;
              if (element2.subcategoria == 'Bicicletas y ciclismo') bicicletas_y_ciclismo++;
              if (element2.subcategoria == 'Camping y pesca') camping_y_pesca++;
              if (element2.subcategoria == 'Deportes acuaticos') deportes_acuaticos++;
              if (element2.subcategoria == 'Futbol') futbol++;
              if (element2.subcategoria == 'Otros deportes') otros_deportes++;
            }

            if (element2.categoria == "Musica") {
              if (element2.subcategoria == 'Arte y antiguedades') arte_y_antiguedades++;
              if (element2.subcategoria == 'CDs - DVDs') cds_dvds++;
              if (element2.subcategoria == 'Instrumentos musicales') instrumentos_musicales++;
              if (element2.subcategoria == 'Libros y revistas') libros_y_revistas++;
            }

            if (element2.categoria == "Belleza") {
              if (element2.subcategoria == 'Relojes - joyas - accesorios') relojes_joyas_accesorios++;
              if (element2.subcategoria == 'Ropa y calzado') ropa_y_calzado++;
              if (element2.subcategoria == 'Salud y belleza') salud_y_belleza++;
            }

            if (element2.categoria == "Bebes") {
              if (element2.subcategoria == 'Cunas - Accesorios') cunas_accesorios++;
              if (element2.subcategoria == 'Juegos - juguetes') juegos_juguetes++;
              if (element2.subcategoria == 'Ropa bebés y niños') ropa_bebés_y_niños++;
            }

            if (element2.categoria == "Mascotas") {
              if (element2.subcategoria == 'Accesorios para perros') accesorios_para_perros++;
              if (element2.subcategoria == 'Accesorios para gatos') accesorios_para_gatos++;
              if (element2.subcategoria == 'Otros (mascotas)') otros_mascotas++;
            }

            if (element2.categoria == "Herramientas") {
              if (element2.subcategoria == 'Industria') industria++;
              if (element2.subcategoria == 'Repuestos') repuestos++;
              if (element2.subcategoria == 'Muebles para negocios - oficinas') muebles_para_negocios_oficinas++;
            }

            if (element2.categoria == "Libros") {
              if (element2.subcategoria == 'Novela') novela++;
              if (element2.subcategoria == 'Gótico') gotico++;
              if (element2.subcategoria == 'Ciencia Ficción') ciencia_ficcion++;
              if (element2.subcategoria == 'Cuento de hadas') cuento_de_hadas++;
              if (element2.subcategoria == 'Acción') accion++;
              if (element2.subcategoria == 'Drama') drama++;
              if (element2.subcategoria == 'Suspenso') suspenso++;
              if (element2.subcategoria == 'Terror') terror++;
              if (element2.subcategoria == 'Fantástica') fantastica++;
            }

            if (element2.categoria == "Otros") {
              if (element2.subcategoria == 'Otra categoria') otra_categoria++;
            }
          }
        }
        if (this.categoriaSeleccionada == "Tecnologia") {
          array_total_año.push([element1, "TV - Audio - Video", tv_audio_video]);
          array_total_año.push([element1, "Celulares - Tablets", celulares_tablets]);
          array_total_año.push([element1, "Computadoras", computadoras]);
          array_total_año.push([element1, "Notebooks", notebooks]);
          array_total_año.push([element1, "Videojuegos", videojuegos]);
          array_total_año.push([element1, "Consolas", consolas]);
          array_total_año.push([element1, "Cámaras y accesorios", camaras_y_accesorios]);
        }

        if (this.categoriaSeleccionada == "Hogar") {
          array_total_año.push([element1, "Accesorios (Hogar)", accesorios_hogar]);
          array_total_año.push([element1, "Decoración", decoracion]);
          array_total_año.push([element1, "Electrodomésticos", electrodomesticos]);
          array_total_año.push([element1, "Muebles", muebles]);
          array_total_año.push([element1, "Jardin", jardin]);
        }

        if (this.categoriaSeleccionada == "Deportes") {
          array_total_año.push([element1, "Aerobics y fitness", aerobics_y_fitness]);
          array_total_año.push([element1, "Bicicletas y ciclismo", bicicletas_y_ciclismo]);
          array_total_año.push([element1, "Camping y pesca", camping_y_pesca]);
          array_total_año.push([element1, "Deportes acuaticos", deportes_acuaticos]);
          array_total_año.push([element1, "Futbol", futbol]);
          array_total_año.push([element1, "Otros deportes", otros_deportes]);
        }

        if (this.categoriaSeleccionada == "Musica") {
          array_total_año.push([element1, "Arte y antiguedades", arte_y_antiguedades]);
          array_total_año.push([element1, "CDs - DVDs", cds_dvds]);
          array_total_año.push([element1, "Instrumentos musicales", instrumentos_musicales]);
          array_total_año.push([element1, "Libros y revistas", libros_y_revistas]);
        }

        if (this.categoriaSeleccionada == "Belleza") {
          array_total_año.push([element1, "Relojes - joyas - accesorios", relojes_joyas_accesorios]);
          array_total_año.push([element1, "Ropa y calzado", ropa_y_calzado]);
          array_total_año.push([element1, "Salud y belleza", salud_y_belleza]);
        }

        if (this.categoriaSeleccionada == "Bebes") {
          array_total_año.push([element1, "Cunas - Accesorios", cunas_accesorios]);
          array_total_año.push([element1, "Juegos - juguetes", juegos_juguetes]);
          array_total_año.push([element1, "Ropa bebés y niños", ropa_bebés_y_niños]);
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          array_total_año.push([element1, "Accesorios para perros", accesorios_para_perros]);
          array_total_año.push([element1, "Accesorios para gatos", accesorios_para_gatos]);
          array_total_año.push([element1, "Otros (mascotas)", otros_mascotas]);
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          array_total_año.push([element1, "Industria", industria]);
          array_total_año.push([element1, "Repuestos", repuestos]);
          array_total_año.push([element1, "Muebles para negocios - oficinas", muebles_para_negocios_oficinas]);
        }

        if (this.categoriaSeleccionada == "Libros") {
          array_total_año.push([element1, "Novela", novela]);
          array_total_año.push([element1, "Gótico", gotico]);
          array_total_año.push([element1, "Ciencia Ficción", ciencia_ficcion]);
          array_total_año.push([element1, "Cuento de hadas", cuento_de_hadas]);
          array_total_año.push([element1, "Acción", accion]);
          array_total_año.push([element1, "Drama", drama]);
          array_total_año.push([element1, "Suspenso", suspenso]);
          array_total_año.push([element1, "Terror", terror]);
          array_total_año.push([element1, "Fantástica", fantastica]);
        }

        if (this.categoriaSeleccionada == "Otros") {
          array_total_año.push([element1, "Otra categoria", otra_categoria]);
        }
      }

      var years = { "2020": 1, "2021": 2 };
      array_año.sort();
      array_total_año.sort(function (a, b) {
        return years[a[0]] - years[b[0]];
      });

      let dataset = [];
      for (let i = 0; i < array_total_año.length; i++) {
        const element = array_total_año[i];
        if (this.categoriaSeleccionada == "Tecnologia") {
          if (element[1] == "TV - Audio - Video") array_tv_audio_video.push({ value: element[2] });
          if (element[1] == "Celulares - Tablets") array_celulares_tablets.push({ value: element[2] });
          if (element[1] == "Computadoras") array_computadoras.push({ value: element[2] });
          if (element[1] == "Notebooks") array_notebooks.push({ value: element[2] });
          if (element[1] == "Videojuegos") array_videojuegos.push({ value: element[2] });
          if (element[1] == "Consolas") array_consolas.push({ value: element[2] });
          if (element[1] == "Cámaras y accesorios") array_camaras_y_accesorios.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "TV - Audio - Video", data: array_tv_audio_video })
            dataset.push({ seriesname: "Celulares - Tablets", data: array_celulares_tablets })
            dataset.push({ seriesname: "Computadoras", data: array_computadoras })
            dataset.push({ seriesname: "Notebooks", data: array_notebooks })
            dataset.push({ seriesname: "Videojuegos", data: array_videojuegos })
            dataset.push({ seriesname: "Consolas", data: array_consolas })
            dataset.push({ seriesname: "Cámaras y accesorios", data: array_camaras_y_accesorios })
          }
        }

        if (this.categoriaSeleccionada == "Hogar") {
          if (element[1] == "Accesorios (Hogar)") array_accesorios_hogar.push({ value: element[2] });
          if (element[1] == "Decoración") array_decoracion.push({ value: element[2] });
          if (element[1] == "Electrodomésticos") array_electrodomesticos.push({ value: element[2] });
          if (element[1] == "Muebles") array_muebles.push({ value: element[2] });
          if (element[1] == "Jardin") array_jardin.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Accesorios (Hogar)", data: array_accesorios_hogar })
            dataset.push({ seriesname: "Decoración", data: array_decoracion })
            dataset.push({ seriesname: "Electrodomésticos", data: array_electrodomesticos })
            dataset.push({ seriesname: "Muebles", data: array_muebles })
            dataset.push({ seriesname: "Jardin", data: array_jardin })
          }
        }

        if (this.categoriaSeleccionada == "Deportes") {
          if (element[1] == "Aerobics y fitness") array_aerobics_y_fitness.push({ value: element[2] });
          if (element[1] == "Bicicletas y ciclismo") array_bicicletas_y_ciclismo.push({ value: element[2] });
          if (element[1] == "Camping y pesca") array_camping_y_pesca.push({ value: element[2] });
          if (element[1] == "Deportes acuaticos") array_deportes_acuaticos.push({ value: element[2] });
          if (element[1] == "Futbol") array_futbol.push({ value: element[2] });
          if (element[1] == "Otros deportes") array_otros_deportes.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Aerobics y fitness", data: array_aerobics_y_fitness })
            dataset.push({ seriesname: "Bicicletas y ciclismo", data: array_bicicletas_y_ciclismo })
            dataset.push({ seriesname: "Camping y pesca", data: array_camping_y_pesca })
            dataset.push({ seriesname: "Deportes acuaticos", data: array_deportes_acuaticos })
            dataset.push({ seriesname: "Futbol", data: array_futbol })
            dataset.push({ seriesname: "Otros deportes", data: array_otros_deportes })
          }
        }

        if (this.categoriaSeleccionada == "Musica") {
          if (element[1] == "Arte y antiguedades") array_arte_y_antiguedades.push({ value: element[2] });
          if (element[1] == "CDs - DVDs") array_cds_dvds.push({ value: element[2] });
          if (element[1] == "Instrumentos musicales") array_instrumentos_musicales.push({ value: element[2] });
          if (element[1] == "Libros y revistas") array_libros_y_revistas.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Arte y antiguedades", data: array_arte_y_antiguedades })
            dataset.push({ seriesname: "CDs - DVDs", data: array_cds_dvds })
            dataset.push({ seriesname: "Instrumentos musicales", data: array_instrumentos_musicales })
            dataset.push({ seriesname: "Libros y revistas", data: array_libros_y_revistas })
          }
        }

        if (this.categoriaSeleccionada == "Belleza") {
          if (element[1] == "Relojes - joyas - accesorios") array_relojes_joyas_accesorios.push({ value: element[2] });
          if (element[1] == "Ropa y calzado") array_ropa_y_calzado.push({ value: element[2] });
          if (element[1] == "Salud y belleza") array_salud_y_belleza.push({ value: element[2] });
          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Relojes - joyas - accesorios", data: array_relojes_joyas_accesorios })
            dataset.push({ seriesname: "Ropa y calzado", data: array_ropa_y_calzado })
            dataset.push({ seriesname: "Salud y belleza", data: array_salud_y_belleza })
          }
        }

        if (this.categoriaSeleccionada == "Bebes") {
          if (element[1] == "Cunas - Accesorios") array_cunas_accesorios.push({ value: element[2] });
          if (element[1] == "Juegos - juguetes") array_juegos_juguetes.push({ value: element[2] });
          if (element[1] == "Ropa bebés y niños") array_ropa_bebés_y_niños.push({ value: element[2] });
          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Cunas - Accesorios", data: array_cunas_accesorios })
            dataset.push({ seriesname: "Juegos - juguetes", data: array_juegos_juguetes })
            dataset.push({ seriesname: "Ropa bebés y niños", data: array_ropa_bebés_y_niños })
          }
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          if (element[1] == "Accesorios para perros") array_accesorios_para_perros.push({ value: element[2] });
          if (element[1] == "Accesorios para gatos") array_accesorios_para_gatos.push({ value: element[2] });
          if (element[1] == "Otros (mascotas)") array_otros_mascotas.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Accesorios para perros", data: array_accesorios_para_perros })
            dataset.push({ seriesname: "Accesorios para gatos", data: array_accesorios_para_gatos })
            dataset.push({ seriesname: "Otros (mascotas)", data: array_otros_mascotas })
          }
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          if (element[1] == "Industria") array_industria.push({ value: element[2] });
          if (element[1] == "Repuestos") array_repuestos.push({ value: element[2] });
          if (element[1] == "Muebles para negocios - oficinas") array_muebles_para_negocios_oficinas.push({ value: element[2] });
          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Industria", data: array_industria })
            dataset.push({ seriesname: "Repuestos", data: array_repuestos })
            dataset.push({ seriesname: "Muebles para negocios - oficinas", data: array_muebles_para_negocios_oficinas })
          }
        }

        if (this.categoriaSeleccionada == "Libros") {
          if (element[1] == "Novela") array_novela.push({ value: element[2] });
          if (element[1] == "Gótico") array_gotico.push({ value: element[2] });
          if (element[1] == "Ciencia Ficción") array_ciencia_ficcion.push({ value: element[2] });
          if (element[1] == "Cuento de hadas") array_cuento_de_hadas.push({ value: element[2] });
          if (element[1] == "Acción") array_accion.push({ value: element[2] });
          if (element[1] == "Drama") array_drama.push({ value: element[2] });
          if (element[1] == "Suspenso") array_suspenso.push({ value: element[2] });
          if (element[1] == "Terror") array_terror.push({ value: element[2] });
          if (element[1] == "Fantástica") array_fantastica.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Novela", data: array_novela })
            dataset.push({ seriesname: "Gótico", data: array_gotico })
            dataset.push({ seriesname: "Ciencia Ficción", data: array_ciencia_ficcion })
            dataset.push({ seriesname: "Cuento de hadas", data: array_cuento_de_hadas })
            dataset.push({ seriesname: "Acción", data: array_accion })
            dataset.push({ seriesname: "Drama", data: array_drama })
            dataset.push({ seriesname: "Suspenso", data: array_suspenso })
            dataset.push({ seriesname: "Terror", data: array_terror })
            dataset.push({ seriesname: "Fantástica", data: array_fantastica })
          }
        }

        if (this.categoriaSeleccionada == "Otros") {
          if (element[1] == "Otra categoria") array_otra_categoria.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Otra categoria", data: array_otra_categoria })
          }
        }

      }

      for (let i = 0; i < array_año.length; i++) {
        const element = array_año[i];
        array_labels.push({ label: element })
      }

      this.type = "mscolumn3d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          caption: "Cantidad de aquileres según categoría",
          subcaption: "Ordenados por año",
          bgColor: "#fafafa",
          xaxisname: "Años",
          yaxisname: "Cantidad",
          formatnumberscale: "1",
          theme: "fusion",
          showvalues: "1"
        },
        categories: [
          {
            category: [{ label: "2020" }, { label: "2021" }]
          }
        ],
        dataset: dataset
      }
      this.mostrarGrafico = true;
      this.spinner.hide();
    }


    /* Cantidad de publicaciones según categoría */
    if (periodo == "Por día" && this.nombreEstadisticaSeleccionada == "Cantidad total de publicaciones según categoría") {
      let schema2 = [
        {
          "name": "Tiempo",
          "type": "date",
          "format": "%d-%b-%y"
        },
        {
          "name": "Categoria",
          "type": "string"
        },
        {
          "name": "Cantidad",
          "type": "number"
        }
      ]
      /* Arma array con las categorias que salen en una determinada fecha */
      for (let i = 0; i < this.publicaciones.length; i++) {
        const element = this.publicaciones[i];
        let fecha = new Date(element.createdAt);
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2)
        let formato_elemento = fecha.getUTCDate() + "-" + mes + "-" + año;
        objeto = {
          tiempo: formato_elemento,
          categoria: this.publicaciones[i].categoria
        }
        array_parcial.push(objeto);
      }

      /* Arma array con las fechas de los alquileres creados */
      for (let i = 0; i < this.publicaciones.length; i++) {
        const element1 = this.publicaciones[i];
        let fecha = new Date(element1.createdAt);
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2)
        let formato_elemento = fecha.getUTCDate() + "-" + mes + "-" + año;
        if (array_fechas.length == 0) {
          array_fechas.push(formato_elemento);
        } else {
          if (!array_fechas.includes(formato_elemento)) {
            array_fechas.push(formato_elemento)
          }
        }
      }

      /* Arma array para el grafico */
      for (let i = 0; i < array_fechas.length; i++) {
        objeto = {};
        const element1 = array_fechas[i];
        let tecnologia = 0, hogar = 0, deporte = 0, musica = 0, belleza = 0, bebes = 0, mascotas = 0, herramientas = 0, libros = 0, otros = 0;
        for (let j = 0; j < array_parcial.length; j++) {
          const element2 = array_parcial[j];
          if (element1 == element2.tiempo) {
            if (element2.categoria == "Tecnologia") tecnologia++;
            if (element2.categoria == "Hogar") hogar++;
            if (element2.categoria == "Deporte") deporte++;
            if (element2.categoria == "Musica") musica++;
            if (element2.categoria == "Belleza") belleza++;
            if (element2.categoria == "Bebes") bebes++;
            if (element2.categoria == "Mascotas") mascotas++;
            if (element2.categoria == "Herramientas") herramientas++;
            if (element2.categoria == "Libros") libros++;
            if (element2.categoria == "Otros") otros++;
          }
        }

        array_general.push([element1, "Tecnologia", tecnologia])
        array_general.push([element1, "Hogar", hogar])
        array_general.push([element1, "Deporte", deporte])
        array_general.push([element1, "Musica", musica])
        array_general.push([element1, "Belleza", belleza])
        array_general.push([element1, "Bebes", bebes])
        array_general.push([element1, "Mascotas", mascotas])
        array_general.push([element1, "Herramientas", herramientas])
        array_general.push([element1, "Libros", libros])
        array_general.push([element1, "Otros", otros])
      }

      const fusionDataStore = new FusionCharts.DataStore();
      const fusionTable = fusionDataStore.createDataTable(array_general, schema2);
      this.type = "timeseries"
      this.dataSource = {
        chart: { theme: "fusion", bgColor: "#fafafa" },
        caption: {
          text: "Publicaciones creadas por día"
        },
        subcaption: {
          text: "Filtrados por categoría"
        },
        series: "Categoria",
        yaxis: [
          {
            plot: "cantidad",
            title: "Cantidad",
            plottype: "smooth-line",
          }
        ]
      };
      this.dataSource.data = fusionTable;
      this.mostrarGrafico = true;
      this.spinner.hide();
    }

    if (periodo == "Por mes" && this.nombreEstadisticaSeleccionada == "Cantidad total de publicaciones según categoría") {
      let array_meses = [], array_labels = [], array_categorias = [], array_total_mes = [];
      let belleza = 0, deporte = 0, bebes = 0, herramientas = 0, tecnologia = 0, hogar = 0, mascotas = 0, libros = 0, musica = 0, otros = 0;
      let array_belleza = [], array_deporte = [], array_bebes = [], array_herramientas = [], array_tecnologia = [], array_hogar = [];
      let array_mascotas = [], array_libros = [], array_musica = [], array_otros = [];

      /* Armar array con meses existentes en el array total + armar array con labels para el grafico + armar array con nombres de categorias*/
      for (let i = 0; i < this.publicaciones.length; i++) {
        const element = this.publicaciones[i];
        let fecha = new Date(element.createdAt)
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2, 4);
        let fecha_formateada = mes + " " + año
        if (array_meses.length == 0) {
          array_meses.push(fecha_formateada);
        } else {
          if (!array_meses.includes(fecha_formateada)) {
            array_meses.push(fecha_formateada);
          }
        }

        let categoria = element.categoria;
        if (array_categorias.length == 0) {
          array_categorias.push(categoria);
        } else {
          if (!array_categorias.includes(categoria)) {
            array_categorias.push(categoria)
          }
        }
      }

      /*Armar array con totales por mes */
      for (let i = 0; i < array_meses.length; i++) {
        const element1 = array_meses[i];
        belleza = 0, deporte = 0, bebes = 0, herramientas = 0, tecnologia = 0, hogar = 0, mascotas = 0, libros = 0, musica = 0, otros = 0;
        for (let j = 0; j < this.publicaciones.length; j++) {
          const element2 = this.publicaciones[j];
          let fecha = new Date(element2.createdAt)
          let mes = this.obtenerMes(fecha);
          let año = String(fecha.getFullYear()).slice(2, 4);
          let fecha_formateada = mes + " " + año;
          if (fecha_formateada == element1) {
            if (element2.categoria == "Tecnologia") tecnologia++;
            if (element2.categoria == "Hogar") hogar++;
            if (element2.categoria == "Deporte") deporte++;
            if (element2.categoria == "Musica") musica++;
            if (element2.categoria == "Belleza") belleza++;
            if (element2.categoria == "Bebes") bebes++;
            if (element2.categoria == "Mascotas") mascotas++;
            if (element2.categoria == "Herramientas") herramientas++;
            if (element2.categoria == "Libros") libros++;
            if (element2.categoria == "Otros") otros++;
          }
        }
        array_total_mes.push([element1, "Tecnologia", tecnologia])
        array_total_mes.push([element1, "Hogar", hogar])
        array_total_mes.push([element1, "Deporte", deporte])
        array_total_mes.push([element1, "Musica", musica])
        array_total_mes.push([element1, "Belleza", belleza])
        array_total_mes.push([element1, "Bebes", bebes])
        array_total_mes.push([element1, "Mascotas", mascotas])
        array_total_mes.push([element1, "Herramientas", herramientas])
        array_total_mes.push([element1, "Libros", libros])
        array_total_mes.push([element1, "Otros", otros])

      }

      /* Ordena y crea los arreglos para después mostrar el gráfico */
      var monthNames = {
        "Jan 20": 1, "Feb 20": 2, "Mar 20": 3, "Apr 20": 4, "May 20": 5, "Jun 20": 6, "Jul 20": 7, "Aug 20": 8, "Sep 20": 9, "Oct 20": 10, "Nov 20": 11, "Dec 20": 12,
        "Jan 21": 13, "Feb 21": 14, "Mar 21": 15, "Apr 21": 16, "May 21": 17, "Jun 21": 18, "Jul 21": 19, "Aug 21": 20, "Sep 21": 21, "Oct 21": 22, "Nov 21": 23, "Dec 21": 24
      };

      array_total_mes.sort(function (a, b) {
        return monthNames[a[0]] - monthNames[b[0]];
      });

      array_meses.sort(function (a, b) {
        return monthNames[a] - monthNames[b];
      })

      for (let i = 0; i < array_total_mes.length; i++) {
        const element = array_total_mes[i];
        if (element[1] == "Tecnologia") array_tecnologia.push({ value: element[2] });
        if (element[1] == "Hogar") array_hogar.push({ value: element[2] });
        if (element[1] == "Deporte") array_deporte.push({ value: element[2] });
        if (element[1] == "Musica") array_musica.push({ value: element[2] });
        if (element[1] == "Belleza") array_belleza.push({ value: element[2] });
        if (element[1] == "Bebes") array_bebes.push({ value: element[2] });
        if (element[1] == "Mascotas") array_mascotas.push({ value: element[2] });
        if (element[1] == "Herramientas") array_herramientas.push({ value: element[2] });
        if (element[1] == "Libros") array_libros.push({ value: element[2] });
        if (element[1] == "Otros") array_otros.push({ value: element[2] });
      }

      for (let i = 0; i < array_meses.length; i++) {
        const element = array_meses[i];
        array_labels.push({ label: element })
      }

      this.type = "msspline";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          caption: "Cantidad de publicaciones según categoría",
          bgColor: "#fafafa",
          xaxisname: "Meses",
          yaxisname: "Cantidad",
          subcaption: "Ordenados por mes",
          numdivlines: "3",
          showvalues: "1",
          legenditemfontsize: "11",
          legenditemfontbold: "1",
          theme: "fusion"
        },
        categories: [
          {
            category: array_labels
          }
        ],
        dataset: [
          {
            seriesname: "Tecnologia",
            data: array_tecnologia
          },
          {
            seriesname: "Hogar",
            data: array_hogar
          },
          {
            seriesname: "Deporte",
            data: array_deporte
          },
          {
            seriesname: "Musica",
            data: array_musica
          },
          {
            seriesname: "Belleza",
            data: array_belleza
          },
          {
            seriesname: "Bebes",
            data: array_bebes
          },
          {
            seriesname: "Herramientas",
            data: array_herramientas
          },
          {
            seriesname: "Libros",
            data: array_libros
          },
          {
            seriesname: "Otros",
            data: array_otros
          },
          {
            seriesname: "Mascotas",
            data: array_mascotas
          }
        ]
      }
      this.mostrarGrafico = true;
      this.spinner.hide();
    }

    if (periodo == "Por año" && this.nombreEstadisticaSeleccionada == "Cantidad total de publicaciones según categoría") {
      let array_año = [], array_categorias = [], array_total_año = [], array_labels = [];
      let array_belleza = [], array_deporte = [], array_bebes = [], array_herramientas = [], array_tecnologia = [], array_hogar = [];
      let array_mascotas = [], array_libros = [], array_musica = [], array_otros = [];

      for (let i = 0; i < this.publicaciones.length; i++) {
        const element = this.publicaciones[i];
        let fecha = new Date(element.createdAt)
        let año = fecha.getFullYear()
        if (array_año.length == 0) {
          array_año.push(año);
        } else {
          if (!array_año.includes(año)) {
            array_año.push(año);
          }
        }

        let categoria = element.categoria;
        if (array_categorias.length == 0) {
          array_categorias.push(categoria);
        } else {
          if (!array_categorias.includes(categoria)) {
            array_categorias.push(categoria)
          }
        }
      }

      for (let i = 0; i < array_año.length; i++) {
        const element1 = array_año[i];
        let belleza = 0, deporte = 0, bebes = 0, herramientas = 0, tecnologia = 0, hogar = 0, mascotas = 0, libros = 0, musica = 0, otros = 0;
        for (let j = 0; j < this.publicaciones.length; j++) {
          const element2 = this.publicaciones[j];
          let fecha = new Date(element2.createdAt)
          let año = fecha.getFullYear()
          if (año == element1) {
            if (element2.categoria == "Tecnologia") tecnologia++;
            if (element2.categoria == "Hogar") hogar++;
            if (element2.categoria == "Deporte") deporte++;
            if (element2.categoria == "Musica") musica++;
            if (element2.categoria == "Belleza") belleza++;
            if (element2.categoria == "Bebes") bebes++;
            if (element2.categoria == "Mascotas") mascotas++;
            if (element2.categoria == "Herramientas") herramientas++;
            if (element2.categoria == "Libros") libros++;
            if (element2.categoria == "Otros") otros++;
          }
        }
        array_total_año.push([element1, "Tecnologia", tecnologia])
        array_total_año.push([element1, "Hogar", hogar])
        array_total_año.push([element1, "Deporte", deporte])
        array_total_año.push([element1, "Musica", musica])
        array_total_año.push([element1, "Belleza", belleza])
        array_total_año.push([element1, "Bebes", bebes])
        array_total_año.push([element1, "Mascotas", mascotas])
        array_total_año.push([element1, "Herramientas", herramientas])
        array_total_año.push([element1, "Libros", libros])
        array_total_año.push([element1, "Otros", otros])
      }

      let years = { "2019": 1, "2020": 2, "2021": 3 };
      array_año.sort();
      array_total_año.sort(function (a, b) {
        return years[a[0]] - years[b[0]];
      });

      for (let i = 0; i < array_total_año.length; i++) {
        const element = array_total_año[i];
        if (element[1] == "Tecnologia") array_tecnologia.push({ value: element[2] });
        if (element[1] == "Hogar") array_hogar.push({ value: element[2] });
        if (element[1] == "Deporte") array_deporte.push({ value: element[2] });
        if (element[1] == "Musica") array_musica.push({ value: element[2] });
        if (element[1] == "Belleza") array_belleza.push({ value: element[2] });
        if (element[1] == "Bebes") array_bebes.push({ value: element[2] });
        if (element[1] == "Mascotas") array_mascotas.push({ value: element[2] });
        if (element[1] == "Herramientas") array_herramientas.push({ value: element[2] });
        if (element[1] == "Libros") array_libros.push({ value: element[2] });
        if (element[1] == "Otros") array_otros.push({ value: element[2] });
      }

      for (let i = 0; i < array_año.length; i++) {
        const element = array_año[i];
        array_labels.push({ label: element })
      }

      this.type = "mscolumn3d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          caption: "Cantidad de aquileres según categoría",
          subcaption: "Ordenados por año",
          bgColor: "#fafafa",
          xaxisname: "Años",
          yaxisname: "Cantidad",
          formatnumberscale: "1",
          theme: "fusion",
          showvalues: "1"
        },
        categories: [
          {
            category: [{ label: "2019" }, { label: "2020" }, { label: "2021" }]
          }
        ],
        dataset: [
          {
            seriesname: "Tecnologia",
            data: array_tecnologia
          },
          {
            seriesname: "Hogar",
            data: array_hogar
          },
          {
            seriesname: "Deporte",
            data: array_deporte
          },
          {
            seriesname: "Musica",
            data: array_musica
          },
          {
            seriesname: "Belleza",
            data: array_belleza
          },
          {
            seriesname: "Bebes",
            data: array_bebes
          },
          {
            seriesname: "Herramientas",
            data: array_herramientas
          },
          {
            seriesname: "Libros",
            data: array_libros
          },
          {
            seriesname: "Otros",
            data: array_otros
          },
          {
            seriesname: "Mascotas",
            data: array_mascotas
          }
        ]
      }
      this.mostrarGrafico = true;
      this.spinner.hide();
    }



    /* Cantidad de publicaciones según subcategoría */
    if (periodo == "Por día" && this.nombreEstadisticaSeleccionada == "Cantidad total de publicaciones según subcategorías") {
      let schema2 = [
        {
          "name": "Tiempo",
          "type": "date",
          "format": "%d-%b-%y"
        },
        {
          "name": "Subcategoria",
          "type": "string"
        },
        {
          "name": "Cantidad",
          "type": "number"
        }
      ]
      /* Arma array con las categorias que salen en una determinada fecha */
      for (let i = 0; i < this.publicaciones.length; i++) {
        const element = this.publicaciones[i];
        let fecha = new Date(element.createdAt);
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2)
        let formato_elemento = fecha.getUTCDate() + "-" + mes + "-" + año;
        objeto = {
          tiempo: formato_elemento,
          categoria: this.publicaciones[i].categoria,
          subcategoria: this.publicaciones[i].subcategoria
        }
        array_parcial.push(objeto);
      }

      /* Arma array con las fechas de los alquileres creados */
      for (let i = 0; i < this.publicaciones.length; i++) {
        const element1 = this.publicaciones[i];
        let fecha = new Date(element1.createdAt);
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2)
        let formato_elemento = fecha.getUTCDate() + "-" + mes + "-" + año;
        if (array_fechas.length == 0) {
          array_fechas.push(formato_elemento);
        } else {
          if (!array_fechas.includes(formato_elemento)) {
            array_fechas.push(formato_elemento)
          }
        }
      }

      /* Arma array para el grafico */
      for (let i = 0; i < array_fechas.length; i++) {
        objeto = {};
        const element1 = array_fechas[i];

        //ELECTRONICA
        let tv_audio_video = 0, celulares_tablets = 0, computadoras = 0, notebooks = 0, videojuegos = 0, consolas = 0, camaras_y_accesorios = 0;

        //HOGAR
        let accesorios_hogar = 0, decoracion = 0, electrodomesticos = 0, muebles = 0, jardin = 0;

        //DEPORTES
        let aerobics_y_fitness = 0, bicicletas_y_ciclismo = 0, camping_y_pesca = 0, deportes_acuaticos = 0, futbol = 0, otros_deportes = 0;

        //MUSICA
        let arte_y_antiguedades = 0, cds_dvds = 0, instrumentos_musicales = 0, libros_y_revistas = 0;

        //BELLEZA
        let relojes_joyas_accesorios = 0, ropa_y_calzado = 0, salud_y_belleza = 0;

        //BEBES
        let cunas_accesorios = 0, juegos_juguetes = 0, ropa_bebés_y_niños = 0;

        //ANIMALES
        let accesorios_para_perros = 0, accesorios_para_gatos = 0, otros_mascotas = 0;

        //HERRAMIENTAS
        let industria = 0, repuestos = 0, muebles_para_negocios_oficinas = 0;

        //LIBROS
        let novela = 0, gotico = 0, ciencia_ficcion = 0, cuento_de_hadas = 0, accion = 0, drama = 0, suspenso = 0, terror = 0, fantastica = 0;

        //OTROS
        let otra_categoria = 0

        for (let j = 0; j < array_parcial.length; j++) {
          const element2 = array_parcial[j];
          if (element1 == element2.tiempo) {
            if (element2.categoria == "Tecnologia") {
              if (element2.subcategoria == 'TV - Audio - Video') tv_audio_video++;
              if (element2.subcategoria == 'Celulares - Tablets') celulares_tablets++;
              if (element2.subcategoria == 'Computadoras') computadoras++;
              if (element2.subcategoria == 'Notebooks') notebooks++;
              if (element2.subcategoria == 'Videojuegos') videojuegos++;
              if (element2.subcategoria == 'Consolas') consolas++;
              if (element2.subcategoria == 'Cámaras y accesorios') camaras_y_accesorios++;
            }

            if (element2.categoria == "Hogar") {
              if (element2.subcategoria == 'Accesorios (Hogar)') accesorios_hogar++;
              if (element2.subcategoria == 'Decoración') decoracion++;
              if (element2.subcategoria == 'Electrodomésticos') electrodomesticos++;
              if (element2.subcategoria == 'Muebles') muebles++;
              if (element2.subcategoria == 'Jardin') jardin++;
            }

            if (element2.categoria == "Deporte") {
              if (element2.subcategoria == 'Aerobics y fitness') aerobics_y_fitness++;
              if (element2.subcategoria == 'Bicicletas y ciclismo') bicicletas_y_ciclismo++;
              if (element2.subcategoria == 'Camping y pesca') camping_y_pesca++;
              if (element2.subcategoria == 'Deportes acuaticos') deportes_acuaticos++;
              if (element2.subcategoria == 'Futbol') futbol++;
              if (element2.subcategoria == 'Otros deportes') otros_deportes++;
            }

            if (element2.categoria == "Musica") {
              if (element2.subcategoria == 'Arte y antiguedades') arte_y_antiguedades++;
              if (element2.subcategoria == 'CDs - DVDs') cds_dvds++;
              if (element2.subcategoria == 'Instrumentos musicales') instrumentos_musicales++;
              if (element2.subcategoria == 'Libros y revistas') libros_y_revistas++;
            }

            if (element2.categoria == "Belleza") {
              if (element2.subcategoria == 'Relojes - joyas - accesorios') relojes_joyas_accesorios++;
              if (element2.subcategoria == 'Ropa y calzado') ropa_y_calzado++;
              if (element2.subcategoria == 'Salud y belleza') salud_y_belleza++;
            }

            if (element2.categoria == "Bebes") {
              if (element2.subcategoria == 'Cunas - Accesorios') cunas_accesorios++;
              if (element2.subcategoria == 'Juegos - juguetes') juegos_juguetes++;
              if (element2.subcategoria == 'Ropa bebés y niños') ropa_bebés_y_niños++;
            }

            if (element2.categoria == "Mascotas") {
              if (element2.subcategoria == 'Accesorios para perros') accesorios_para_perros++;
              if (element2.subcategoria == 'Accesorios para gatos') accesorios_para_gatos++;
              if (element2.subcategoria == 'Otros (mascotas)') otros_mascotas++;
            }

            if (element2.categoria == "Herramientas") {
              if (element2.subcategoria == 'Industria') industria++;
              if (element2.subcategoria == 'Repuestos') repuestos++;
              if (element2.subcategoria == 'Muebles para negocios - oficinas') muebles_para_negocios_oficinas++;
            }

            if (element2.categoria == "Libros") {
              if (element2.subcategoria == 'Novela') novela++;
              if (element2.subcategoria == 'Gótico') gotico++;
              if (element2.subcategoria == 'Ciencia Ficción') ciencia_ficcion++;
              if (element2.subcategoria == 'Cuento de hadas') cuento_de_hadas++;
              if (element2.subcategoria == 'Acción') accion++;
              if (element2.subcategoria == 'Drama') drama++;
              if (element2.subcategoria == 'Suspenso') suspenso++;
              if (element2.subcategoria == 'Terror') terror++;
              if (element2.subcategoria == 'Fantástica') fantastica++;
            }

            if (element2.categoria == "Otros") {
              if (element2.subcategoria == 'Otra categoria') otra_categoria++;
            }
          }
        }

        if (this.categoriaSeleccionada == "Tecnologia") {
          array_general.push([element1, "TV - Audio - Video", tv_audio_video]);
          array_general.push([element1, "Celulares - Tablets", celulares_tablets]);
          array_general.push([element1, "Computadoras", computadoras]);
          array_general.push([element1, "Notebooks", notebooks]);
          array_general.push([element1, "Videojuegos", videojuegos]);
          array_general.push([element1, "Consolas", consolas]);
          array_general.push([element1, "Cámaras y accesorios", camaras_y_accesorios]);
        }

        if (this.categoriaSeleccionada == "Hogar") {
          array_general.push([element1, "Accesorios (Hogar)", accesorios_hogar]);
          array_general.push([element1, "Decoración", decoracion]);
          array_general.push([element1, "Electrodomésticos", electrodomesticos]);
          array_general.push([element1, "Muebles", muebles]);
          array_general.push([element1, "Jardin", jardin]);
        }

        if (this.categoriaSeleccionada == "Deportes") {
          array_general.push([element1, "Aerobics y fitness", aerobics_y_fitness]);
          array_general.push([element1, "Bicicletas y ciclismo", bicicletas_y_ciclismo]);
          array_general.push([element1, "Camping y pesca", camping_y_pesca]);
          array_general.push([element1, "Deportes acuaticos", deportes_acuaticos]);
          array_general.push([element1, "Futbol", futbol]);
          array_general.push([element1, "Otros deportes", otros_deportes]);
        }

        if (this.categoriaSeleccionada == "Musica") {
          array_general.push([element1, "Arte y antiguedades", arte_y_antiguedades]);
          array_general.push([element1, "CDs - DVDs", cds_dvds]);
          array_general.push([element1, "Instrumentos musicales", instrumentos_musicales]);
          array_general.push([element1, "Libros y revistas", libros_y_revistas]);
        }

        if (this.categoriaSeleccionada == "Belleza") {
          array_general.push([element1, "Relojes - joyas - accesorios", relojes_joyas_accesorios]);
          array_general.push([element1, "Ropa y calzado", ropa_y_calzado]);
          array_general.push([element1, "Salud y belleza", salud_y_belleza]);
        }

        if (this.categoriaSeleccionada == "Bebes") {
          array_general.push([element1, "Cunas - Accesorios", cunas_accesorios]);
          array_general.push([element1, "Juegos - juguetes", juegos_juguetes]);
          array_general.push([element1, "Ropa bebés y niños", ropa_bebés_y_niños]);
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          array_general.push([element1, "Accesorios para perros", accesorios_para_perros]);
          array_general.push([element1, "Accesorios para gatos", accesorios_para_gatos]);
          array_general.push([element1, "Otros (mascotas)", otros_mascotas]);
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          array_general.push([element1, "Industria", industria]);
          array_general.push([element1, "Repuestos", repuestos]);
          array_general.push([element1, "Muebles para negocios - oficinas", muebles_para_negocios_oficinas]);
        }

        if (this.categoriaSeleccionada == "Libros") {
          array_general.push([element1, "Novela", novela]);
          array_general.push([element1, "Gótico", gotico]);
          array_general.push([element1, "Ciencia Ficción", ciencia_ficcion]);
          array_general.push([element1, "Cuento de hadas", cuento_de_hadas]);
          array_general.push([element1, "Acción", accion]);
          array_general.push([element1, "Drama", drama]);
          array_general.push([element1, "Suspenso", suspenso]);
          array_general.push([element1, "Terror", terror]);
          array_general.push([element1, "Fantástica", fantastica]);
        }

        if (this.categoriaSeleccionada == "Otros") {
          array_general.push([element1, "Otra categoria", otra_categoria]);
        }
      }

      const fusionDataStore = new FusionCharts.DataStore();
      const fusionTable = fusionDataStore.createDataTable(array_general, schema2);
      this.type = "timeseries"
      this.dataSource = {
        chart: { theme: "fusion", bgColor: "#fafafa", xaxisname: "Días", },
        caption: {
          text: "Publicaciones creadas por día"
        },
        subcaption: {
          text: "Filtradas por subcategoría"
        },
        series: "Subcategoria",
        yaxis: [
          {
            plot: "cantidad",
            title: "Cantidad",
            plottype: "smooth-line",
          }
        ]
      };
      this.dataSource.data = fusionTable;
      this.mostrarGrafico = true;
      this.spinner.hide();
    }

    if (periodo == "Por mes" && this.nombreEstadisticaSeleccionada == "Cantidad total de publicaciones según subcategorías") {
      let array_meses = [], array_labels = [], array_categorias = [], array_total_mes = [];

      //ELECTRONICA
      let array_tv_audio_video = [], array_celulares_tablets = [], array_computadoras = [], array_notebooks = [], array_videojuegos = [], array_consolas = [], array_camaras_y_accesorios = [];
      //HOGAR
      let array_accesorios_hogar = [], array_decoracion = [], array_electrodomesticos = [], array_muebles = [], array_jardin = [];
      //DEPORTES
      let array_aerobics_y_fitness = [], array_bicicletas_y_ciclismo = [], array_camping_y_pesca = [], array_deportes_acuaticos = [], array_futbol = [], array_otros_deportes = [];
      //MUSICA
      let array_arte_y_antiguedades = [], array_cds_dvds = [], array_instrumentos_musicales = [], array_libros_y_revistas = [];
      //BELLEZA
      let array_relojes_joyas_accesorios = [], array_ropa_y_calzado = [], array_salud_y_belleza = [];
      //BEBES
      let array_cunas_accesorios = [], array_juegos_juguetes = [], array_ropa_bebés_y_niños = []
      //ANIMALES
      let array_accesorios_para_perros = [], array_accesorios_para_gatos = [], array_otros_mascotas = [];
      //HERRAMIENTAS
      let array_industria = [], array_repuestos = [], array_muebles_para_negocios_oficinas = [];
      //LIBROS
      let array_novela = [], array_gotico = [], array_ciencia_ficcion = [], array_cuento_de_hadas = [], array_accion = [], array_drama = [], array_suspenso = [], array_terror = [], array_fantastica = [];
      //OTROS
      let array_otra_categoria = []

      /* Armar array con meses existentes en el array total + armar array con labels para el grafico + armar array con nombres de categorias*/
      for (let i = 0; i < this.publicaciones.length; i++) {
        const element = this.publicaciones[i];
        let fecha = new Date(element.createdAt)
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2, 4);
        let fecha_formateada = mes + " " + año
        if (array_meses.length == 0) {
          array_meses.push(fecha_formateada);
        } else {
          if (!array_meses.includes(fecha_formateada)) {
            array_meses.push(fecha_formateada);
          }
        }

        let categoria = element.categoria;
        if (array_categorias.length == 0) {
          array_categorias.push(categoria);
        } else {
          if (!array_categorias.includes(categoria)) {
            array_categorias.push(categoria)
          }
        }
      }

      /*Armar array con totales por mes */
      for (let i = 0; i < array_meses.length; i++) {
        const element1 = array_meses[i];
        //ELECTRONICA
        let tv_audio_video = 0, celulares_tablets = 0, computadoras = 0, notebooks = 0, videojuegos = 0, consolas = 0, camaras_y_accesorios = 0;

        //HOGAR
        let accesorios_hogar = 0, decoracion = 0, electrodomesticos = 0, muebles = 0, jardin = 0;

        //DEPORTES
        let aerobics_y_fitness = 0, bicicletas_y_ciclismo = 0, camping_y_pesca = 0, deportes_acuaticos = 0, futbol = 0, otros_deportes = 0;

        //MUSICA
        let arte_y_antiguedades = 0, cds_dvds = 0, instrumentos_musicales = 0, libros_y_revistas = 0;

        //BELLEZA
        let relojes_joyas_accesorios = 0, ropa_y_calzado = 0, salud_y_belleza = 0;

        //BEBES
        let cunas_accesorios = 0, juegos_juguetes = 0, ropa_bebés_y_niños = 0;

        //ANIMALES
        let accesorios_para_perros = 0, accesorios_para_gatos = 0, otros_mascotas = 0;

        //HERRAMIENTAS
        let industria = 0, repuestos = 0, muebles_para_negocios_oficinas = 0;

        //LIBROS
        let novela = 0, gotico = 0, ciencia_ficcion = 0, cuento_de_hadas = 0, accion = 0, drama = 0, suspenso = 0, terror = 0, fantastica = 0;

        //OTROS
        let otra_categoria = 0


        for (let j = 0; j < this.publicaciones.length; j++) {
          const element2 = this.publicaciones[j];
          let fecha = new Date(element2.createdAt)
          let mes = this.obtenerMes(fecha);
          let año = String(fecha.getFullYear()).slice(2, 4);
          let fecha_formateada = mes + " " + año;
          if (fecha_formateada == element1) {
            if (element2.categoria == "Tecnologia") {
              if (element2.subcategoria == 'TV - Audio - Video') tv_audio_video++;
              if (element2.subcategoria == 'Celulares - Tablets') celulares_tablets++;
              if (element2.subcategoria == 'Computadoras') computadoras++;
              if (element2.subcategoria == 'Notebooks') notebooks++;
              if (element2.subcategoria == 'Videojuegos') videojuegos++;
              if (element2.subcategoria == 'Consolas') consolas++;
              if (element2.subcategoria == 'Cámaras y accesorios') camaras_y_accesorios++;
            }

            if (element2.categoria == "Hogar") {
              if (element2.subcategoria == 'Accesorios (Hogar)') accesorios_hogar++;
              if (element2.subcategoria == 'Decoración') decoracion++;
              if (element2.subcategoria == 'Electrodomésticos') electrodomesticos++;
              if (element2.subcategoria == 'Muebles') muebles++;
              if (element2.subcategoria == 'Jardin') jardin++;
            }

            if (element2.categoria == "Deporte") {
              if (element2.subcategoria == 'Aerobics y fitness') aerobics_y_fitness++;
              if (element2.subcategoria == 'Bicicletas y ciclismo') bicicletas_y_ciclismo++;
              if (element2.subcategoria == 'Camping y pesca') camping_y_pesca++;
              if (element2.subcategoria == 'Deportes acuaticos') deportes_acuaticos++;
              if (element2.subcategoria == 'Futbol') futbol++;
              if (element2.subcategoria == 'Otros deportes') otros_deportes++;
            }

            if (element2.categoria == "Musica") {
              if (element2.subcategoria == 'Arte y antiguedades') arte_y_antiguedades++;
              if (element2.subcategoria == 'CDs - DVDs') cds_dvds++;
              if (element2.subcategoria == 'Instrumentos musicales') instrumentos_musicales++;
              if (element2.subcategoria == 'Libros y revistas') libros_y_revistas++;
            }

            if (element2.categoria == "Belleza") {
              if (element2.subcategoria == 'Relojes - joyas - accesorios') relojes_joyas_accesorios++;
              if (element2.subcategoria == 'Ropa y calzado') ropa_y_calzado++;
              if (element2.subcategoria == 'Salud y belleza') salud_y_belleza++;
            }

            if (element2.categoria == "Bebes") {
              if (element2.subcategoria == 'Cunas - Accesorios') cunas_accesorios++;
              if (element2.subcategoria == 'Juegos - juguetes') juegos_juguetes++;
              if (element2.subcategoria == 'Ropa bebés y niños') ropa_bebés_y_niños++;
            }

            if (element2.categoria == "Mascotas") {
              if (element2.subcategoria == 'Accesorios para perros') accesorios_para_perros++;
              if (element2.subcategoria == 'Accesorios para gatos') accesorios_para_gatos++;
              if (element2.subcategoria == 'Otros (mascotas)') otros_mascotas++;
            }

            if (element2.categoria == "Herramientas") {
              if (element2.subcategoria == 'Industria') industria++;
              if (element2.subcategoria == 'Repuestos') repuestos++;
              if (element2.subcategoria == 'Muebles para negocios - oficinas') muebles_para_negocios_oficinas++;
            }

            if (element2.categoria == "Libros") {
              if (element2.subcategoria == 'Novela') novela++;
              if (element2.subcategoria == 'Gótico') gotico++;
              if (element2.subcategoria == 'Ciencia Ficción') ciencia_ficcion++;
              if (element2.subcategoria == 'Cuento de hadas') cuento_de_hadas++;
              if (element2.subcategoria == 'Acción') accion++;
              if (element2.subcategoria == 'Drama') drama++;
              if (element2.subcategoria == 'Suspenso') suspenso++;
              if (element2.subcategoria == 'Terror') terror++;
              if (element2.subcategoria == 'Fantástica') fantastica++;
            }

            if (element2.categoria == "Otros") {
              if (element2.subcategoria == 'Otra categoria') otra_categoria++;
            }
          }
        }
        if (this.categoriaSeleccionada == "Tecnologia") {
          array_total_mes.push([element1, "TV - Audio - Video", tv_audio_video]);
          array_total_mes.push([element1, "Celulares - Tablets", celulares_tablets]);
          array_total_mes.push([element1, "Computadoras", computadoras]);
          array_total_mes.push([element1, "Notebooks", notebooks]);
          array_total_mes.push([element1, "Videojuegos", videojuegos]);
          array_total_mes.push([element1, "Consolas", consolas]);
          array_total_mes.push([element1, "Cámaras y accesorios", camaras_y_accesorios]);
        }

        if (this.categoriaSeleccionada == "Hogar") {
          array_total_mes.push([element1, "Accesorios (Hogar)", accesorios_hogar]);
          array_total_mes.push([element1, "Decoración", decoracion]);
          array_total_mes.push([element1, "Electrodomésticos", electrodomesticos]);
          array_total_mes.push([element1, "Muebles", muebles]);
          array_total_mes.push([element1, "Jardin", jardin]);
        }

        if (this.categoriaSeleccionada == "Deportes") {
          array_total_mes.push([element1, "Aerobics y fitness", aerobics_y_fitness]);
          array_total_mes.push([element1, "Bicicletas y ciclismo", bicicletas_y_ciclismo]);
          array_total_mes.push([element1, "Camping y pesca", camping_y_pesca]);
          array_total_mes.push([element1, "Deportes acuaticos", deportes_acuaticos]);
          array_total_mes.push([element1, "Futbol", futbol]);
          array_total_mes.push([element1, "Otros deportes", otros_deportes]);
        }

        if (this.categoriaSeleccionada == "Musica") {
          array_total_mes.push([element1, "Arte y antiguedades", arte_y_antiguedades]);
          array_total_mes.push([element1, "CDs - DVDs", cds_dvds]);
          array_total_mes.push([element1, "Instrumentos musicales", instrumentos_musicales]);
          array_total_mes.push([element1, "Libros y revistas", libros_y_revistas]);
        }

        if (this.categoriaSeleccionada == "Belleza") {
          array_total_mes.push([element1, "Relojes - joyas - accesorios", relojes_joyas_accesorios]);
          array_total_mes.push([element1, "Ropa y calzado", ropa_y_calzado]);
          array_total_mes.push([element1, "Salud y belleza", salud_y_belleza]);
        }

        if (this.categoriaSeleccionada == "Bebes") {
          array_total_mes.push([element1, "Cunas - Accesorios", cunas_accesorios]);
          array_total_mes.push([element1, "Juegos - juguetes", juegos_juguetes]);
          array_total_mes.push([element1, "Ropa bebés y niños", ropa_bebés_y_niños]);
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          array_total_mes.push([element1, "Accesorios para perros", accesorios_para_perros]);
          array_total_mes.push([element1, "Accesorios para gatos", accesorios_para_gatos]);
          array_total_mes.push([element1, "Otros (mascotas)", otros_mascotas]);
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          array_total_mes.push([element1, "Industria", industria]);
          array_total_mes.push([element1, "Repuestos", repuestos]);
          array_total_mes.push([element1, "Muebles para negocios - oficinas", muebles_para_negocios_oficinas]);
        }

        if (this.categoriaSeleccionada == "Libros") {
          array_total_mes.push([element1, "Novela", novela]);
          array_total_mes.push([element1, "Gótico", gotico]);
          array_total_mes.push([element1, "Ciencia Ficción", ciencia_ficcion]);
          array_total_mes.push([element1, "Cuento de hadas", cuento_de_hadas]);
          array_total_mes.push([element1, "Acción", accion]);
          array_total_mes.push([element1, "Drama", drama]);
          array_total_mes.push([element1, "Suspenso", suspenso]);
          array_total_mes.push([element1, "Terror", terror]);
          array_total_mes.push([element1, "Fantástica", fantastica]);
        }

        if (this.categoriaSeleccionada == "Otros") {
          array_total_mes.push([element1, "Otra categoria", otra_categoria]);
        }

      }

      /* Ordena y crea los arreglos para después mostrar el gráfico */
      var monthNames = {
        "Jan 20": 1, "Feb 20": 2, "Mar 20": 3, "Apr 20": 4, "May 20": 5, "Jun 20": 6, "Jul 20": 7, "Aug 20": 8, "Sep 20": 9, "Oct 20": 10, "Nov 20": 11, "Dec 20": 12,
        "Jan 21": 13, "Feb 21": 14, "Mar 21": 15, "Apr 21": 16, "May 21": 17, "Jun 21": 18, "Jul 21": 19, "Aug 21": 20, "Sep 21": 21, "Oct 21": 22, "Nov 21": 23, "Dec 21": 24
      };

      array_total_mes.sort(function (a, b) {
        return monthNames[a[0]] - monthNames[b[0]];
      });

      array_meses.sort(function (a, b) {
        return monthNames[a] - monthNames[b];
      })

      let dataset = [];
      for (let i = 0; i < array_total_mes.length; i++) {
        const element = array_total_mes[i];
        if (this.categoriaSeleccionada == "Tecnologia") {
          if (element[1] == "TV - Audio - Video") array_tv_audio_video.push({ value: element[2] });
          if (element[1] == "Celulares - Tablets") array_celulares_tablets.push({ value: element[2] });
          if (element[1] == "Computadoras") array_computadoras.push({ value: element[2] });
          if (element[1] == "Notebooks") array_notebooks.push({ value: element[2] });
          if (element[1] == "Videojuegos") array_videojuegos.push({ value: element[2] });
          if (element[1] == "Consolas") array_consolas.push({ value: element[2] });
          if (element[1] == "Cámaras y accesorios") array_camaras_y_accesorios.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_tv_audio_video, array_meses) != 0) {
              dataset.push({ seriesname: "TV - Audio - Video", data: array_tv_audio_video })
            }
            if (this.evitarLog(array_celulares_tablets, array_meses) != 0) {
              dataset.push({ seriesname: "Celulares - Tablets", data: array_celulares_tablets })
            }
            if (this.evitarLog(array_computadoras, array_meses) != 0) {
              dataset.push({ seriesname: "Computadoras", data: array_computadoras })
            }
            if (this.evitarLog(array_notebooks, array_meses) != 0) {
              dataset.push({ seriesname: "Notebooks", data: array_notebooks })
            }
            if (this.evitarLog(array_videojuegos, array_meses) != 0) {
              dataset.push({ seriesname: "Videojuegos", data: array_videojuegos })
            }
            if (this.evitarLog(array_consolas, array_meses) != 0) {
              dataset.push({ seriesname: "Consolas", data: array_consolas })
            }
            if (this.evitarLog(array_camaras_y_accesorios, array_meses) != 0) {
              dataset.push({ seriesname: "Cámaras y accesorios", data: array_camaras_y_accesorios })
            }
          }
        }

        if (this.categoriaSeleccionada == "Hogar") {
          if (element[1] == "Accesorios (Hogar)") array_accesorios_hogar.push({ value: element[2] });
          if (element[1] == "Decoración") array_decoracion.push({ value: element[2] });
          if (element[1] == "Electrodomésticos") array_electrodomesticos.push({ value: element[2] });
          if (element[1] == "Muebles") array_muebles.push({ value: element[2] });
          if (element[1] == "Jardin") array_jardin.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_accesorios_hogar, array_meses) != 0) {
              dataset.push({ seriesname: "Accesorios (Hogar)", data: array_accesorios_hogar })
            }
            if (this.evitarLog(array_decoracion, array_meses) != 0) {
              dataset.push({ seriesname: "Decoración", data: array_decoracion })
            }
            if (this.evitarLog(array_electrodomesticos, array_meses) != 0) {
              dataset.push({ seriesname: "Electrodomésticos", data: array_electrodomesticos })
            }
            if (this.evitarLog(array_muebles, array_meses) != 0) {
              dataset.push({ seriesname: "Muebles", data: array_muebles })
            }
            if (this.evitarLog(array_jardin, array_meses) != 0) {
              dataset.push({ seriesname: "Jardin", data: array_jardin })
            }
          }
        }

        if (this.categoriaSeleccionada == "Deportes") {
          if (element[1] == "Aerobics y fitness") array_aerobics_y_fitness.push({ value: element[2] });
          if (element[1] == "Bicicletas y ciclismo") array_bicicletas_y_ciclismo.push({ value: element[2] });
          if (element[1] == "Camping y pesca") array_camping_y_pesca.push({ value: element[2] });
          if (element[1] == "Deportes acuaticos") array_deportes_acuaticos.push({ value: element[2] });
          if (element[1] == "Futbol") array_futbol.push({ value: element[2] });
          if (element[1] == "Otros deportes") array_otros_deportes.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_aerobics_y_fitness, array_meses) != 0) {
              dataset.push({ seriesname: "Aerobics y fitness", data: array_aerobics_y_fitness })
            }
            if (this.evitarLog(array_bicicletas_y_ciclismo, array_meses) != 0) {
              dataset.push({ seriesname: "Bicicletas y ciclismo", data: array_bicicletas_y_ciclismo })
            }
            if (this.evitarLog(array_camping_y_pesca, array_meses) != 0) {
              dataset.push({ seriesname: "Camping y pesca", data: array_camping_y_pesca })
            }
            if (this.evitarLog(array_deportes_acuaticos, array_meses) != 0) {
              dataset.push({ seriesname: "Deportes acuaticos", data: array_deportes_acuaticos })
            }
            if (this.evitarLog(array_futbol, array_meses) != 0) {
              dataset.push({ seriesname: "Futbol", data: array_futbol })
            }
            if (this.evitarLog(array_otros_deportes, array_meses) != 0) {
              dataset.push({ seriesname: "Otros deportes", data: array_otros_deportes })
            }
          }
        }

        if (this.categoriaSeleccionada == "Musica") {
          if (element[1] == "Arte y antiguedades") array_arte_y_antiguedades.push({ value: element[2] });
          if (element[1] == "CDs - DVDs") array_cds_dvds.push({ value: element[2] });
          if (element[1] == "Instrumentos musicales") array_instrumentos_musicales.push({ value: element[2] });
          if (element[1] == "Libros y revistas") array_libros_y_revistas.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_arte_y_antiguedades, array_meses) != 0) {
              dataset.push({ seriesname: "Arte y antiguedades", data: array_arte_y_antiguedades })
            }
            if (this.evitarLog(array_cds_dvds, array_meses) != 0) {
              dataset.push({ seriesname: "CDs - DVDs", data: array_cds_dvds })
            }
            if (this.evitarLog(array_instrumentos_musicales, array_meses) != 0) {
              dataset.push({ seriesname: "Instrumentos musicales", data: array_instrumentos_musicales })
            }
            if (this.evitarLog(array_libros_y_revistas, array_meses) != 0) {
              dataset.push({ seriesname: "Libros y revistas", data: array_libros_y_revistas })
            }
          }
        }

        if (this.categoriaSeleccionada == "Belleza") {
          if (element[1] == "Relojes - joyas - accesorios") array_relojes_joyas_accesorios.push({ value: element[2] });
          if (element[1] == "Ropa y calzado") array_ropa_y_calzado.push({ value: element[2] });
          if (element[1] == "Salud y belleza") array_salud_y_belleza.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_relojes_joyas_accesorios, array_meses) != 0) {
              dataset.push({ seriesname: "Relojes - joyas - accesorios", data: array_relojes_joyas_accesorios })
            }
            if (this.evitarLog(array_ropa_y_calzado, array_meses) != 0) {
              dataset.push({ seriesname: "Ropa y calzado", data: array_ropa_y_calzado })
            }
            if (this.evitarLog(array_salud_y_belleza, array_meses) != 0) {
              dataset.push({ seriesname: "Salud y belleza", data: array_salud_y_belleza })
            }
          }
        }

        if (this.categoriaSeleccionada == "Bebes") {
          if (element[1] == "Cunas - Accesorios") array_cunas_accesorios.push({ value: element[2] });
          if (element[1] == "Juegos - juguetes") array_juegos_juguetes.push({ value: element[2] });
          if (element[1] == "Ropa bebés y niños") array_ropa_bebés_y_niños.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_cunas_accesorios, array_meses) != 0) {
              dataset.push({ seriesname: "Cunas - Accesorios", data: array_cunas_accesorios })
            }
            if (this.evitarLog(array_juegos_juguetes, array_meses) != 0) {
              dataset.push({ seriesname: "Juegos - juguetes", data: array_juegos_juguetes })
            }
            if (this.evitarLog(array_ropa_bebés_y_niños, array_meses) != 0) {
              dataset.push({ seriesname: "Ropa bebés y niños", data: array_ropa_bebés_y_niños })
            }
          }
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          if (element[1] == "Accesorios para perros") array_accesorios_para_perros.push({ value: element[2] });
          if (element[1] == "Accesorios para gatos") array_accesorios_para_gatos.push({ value: element[2] });
          if (element[1] == "Otros (mascotas)") array_otros_mascotas.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_accesorios_para_perros, array_meses) != 0) {
              dataset.push({ seriesname: "Accesorios para perros", data: array_accesorios_para_perros })
            }
            if (this.evitarLog(array_accesorios_para_gatos, array_meses) != 0) {
              dataset.push({ seriesname: "Accesorios para gatos", data: array_accesorios_para_gatos })
            }
            if (this.evitarLog(array_otros_mascotas, array_meses) != 0) {
              dataset.push({ seriesname: "Otros (mascotas)", data: array_otros_mascotas })
            }
          }
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          if (element[1] == "Industria") array_industria.push({ value: element[2] });
          if (element[1] == "Repuestos") array_repuestos.push({ value: element[2] });
          if (element[1] == "Muebles para negocios - oficinas") array_muebles_para_negocios_oficinas.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_industria, array_meses) != 0) {
              dataset.push({ seriesname: "Industria", data: array_industria })
            }
            if (this.evitarLog(array_repuestos, array_meses) != 0) {
              dataset.push({ seriesname: "Repuestos", data: array_repuestos })
            }
            if (this.evitarLog(array_muebles_para_negocios_oficinas, array_meses) != 0) {
              dataset.push({ seriesname: "Muebles para negocios - oficinas", data: array_muebles_para_negocios_oficinas })
            }
          }
        }

        if (this.categoriaSeleccionada == "Libros") {
          if (element[1] == "Novela") array_novela.push({ value: element[2] });
          if (element[1] == "Gótico") array_gotico.push({ value: element[2] });
          if (element[1] == "Ciencia Ficción") array_ciencia_ficcion.push({ value: element[2] });
          if (element[1] == "Cuento de hadas") array_cuento_de_hadas.push({ value: element[2] });
          if (element[1] == "Acción") array_accion.push({ value: element[2] });
          if (element[1] == "Drama") array_drama.push({ value: element[2] });
          if (element[1] == "Suspenso") array_suspenso.push({ value: element[2] });
          if (element[1] == "Terror") array_terror.push({ value: element[2] });
          if (element[1] == "Fantástica") array_fantastica.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_novela, array_meses) != 0) {
              dataset.push({ seriesname: "Novela", data: array_novela })
            }
            if (this.evitarLog(array_gotico, array_meses) != 0) {
              dataset.push({ seriesname: "Gótico", data: array_gotico })
            }
            if (this.evitarLog(array_ciencia_ficcion, array_meses) != 0) {
              dataset.push({ seriesname: "Ciencia Ficción", data: array_ciencia_ficcion })
            }
            if (this.evitarLog(array_cuento_de_hadas, array_meses) != 0) {
              dataset.push({ seriesname: "Cuento de hadas", data: array_cuento_de_hadas })
            }
            if (this.evitarLog(array_accion, array_meses) != 0) {
              dataset.push({ seriesname: "Acción", data: array_accion })
            }
            if (this.evitarLog(array_drama, array_meses) != 0) {
              dataset.push({ seriesname: "Drama", data: array_drama })
            }
            if (this.evitarLog(array_suspenso, array_meses) != 0) {
              dataset.push({ seriesname: "Suspenso", data: array_suspenso })
            }
            if (this.evitarLog(array_terror, array_meses) != 0) {
              dataset.push({ seriesname: "Terror", data: array_terror })
            }
            if (this.evitarLog(array_fantastica, array_meses) != 0) {
              dataset.push({ seriesname: "Fantástica", data: array_fantastica })
            }
          }
        }

        if (this.categoriaSeleccionada == "Otros") {
          if (element[1] == "Otra categoria") array_otra_categoria.push({ value: element[2] });

          if (i == (array_total_mes.length - 1)) {
            if (this.evitarLog(array_otra_categoria, array_meses) != 0) {
              dataset.push({ seriesname: "Otra categoria", data: array_otra_categoria })
            }
          }
        }

      }

      for (let i = 0; i < array_meses.length; i++) {
        const element = array_meses[i];
        array_labels.push({ label: element })
      }

      /* Armado de los distintos dataset */
      this.type = "msspline";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          yAxisMinValue: "0",
          caption: "Cantidad de publicaciones según subcategoría",
          xaxisname: "Meses",
          yaxisname: "Cantidad",
          subcaption: "Ordenados por mes",
          numdivlines: "1",
          showvalues: "1",
          legenditemfontsize: "11",
          legenditemfontbold: "1",

          theme: "fusion"
        },
        categories: [
          {
            category: array_labels
          }
        ],
        dataset: dataset
      }

      this.mostrarGrafico = true;
      this.spinner.hide();

    }

    if (periodo == "Por año" && this.nombreEstadisticaSeleccionada == "Cantidad total de publicaciones según subcategorías") {
      let array_año = [], array_categorias = [], array_total_año = [], array_labels = [];
      //ELECTRONICA
      let array_tv_audio_video = [], array_celulares_tablets = [], array_computadoras = [], array_notebooks = [], array_videojuegos = [], array_consolas = [], array_camaras_y_accesorios = [];
      //HOGAR
      let array_accesorios_hogar = [], array_decoracion = [], array_electrodomesticos = [], array_muebles = [], array_jardin = [];
      //DEPORTES
      let array_aerobics_y_fitness = [], array_bicicletas_y_ciclismo = [], array_camping_y_pesca = [], array_deportes_acuaticos = [], array_futbol = [], array_otros_deportes = [];
      //MUSICA
      let array_arte_y_antiguedades = [], array_cds_dvds = [], array_instrumentos_musicales = [], array_libros_y_revistas = [];
      //BELLEZA
      let array_relojes_joyas_accesorios = [], array_ropa_y_calzado = [], array_salud_y_belleza = [];
      //BEBES
      let array_cunas_accesorios = [], array_juegos_juguetes = [], array_ropa_bebés_y_niños = []
      //ANIMALES
      let array_accesorios_para_perros = [], array_accesorios_para_gatos = [], array_otros_mascotas = [];
      //HERRAMIENTAS
      let array_industria = [], array_repuestos = [], array_muebles_para_negocios_oficinas = [];
      //LIBROS
      let array_novela = [], array_gotico = [], array_ciencia_ficcion = [], array_cuento_de_hadas = [], array_accion = [], array_drama = [], array_suspenso = [], array_terror = [], array_fantastica = [];
      //OTROS
      let array_otra_categoria = []

      for (let i = 0; i < this.publicaciones.length; i++) {
        const element = this.publicaciones[i];
        let fecha = new Date(element.createdAt)
        let año = fecha.getFullYear()
        if (array_año.length == 0) {
          array_año.push(año);
        } else {
          if (!array_año.includes(año)) {
            array_año.push(año);
          }
        }

        let categoria = element.categoria;
        if (array_categorias.length == 0) {
          array_categorias.push(categoria);
        } else {
          if (!array_categorias.includes(categoria)) {
            array_categorias.push(categoria)
          }
        }
      }

      for (let i = 0; i < array_año.length; i++) {
        const element1 = array_año[i];
        //ELECTRONICA
        let tv_audio_video = 0, celulares_tablets = 0, computadoras = 0, notebooks = 0, videojuegos = 0, consolas = 0, camaras_y_accesorios = 0;

        //HOGAR
        let accesorios_hogar = 0, decoracion = 0, electrodomesticos = 0, muebles = 0, jardin = 0;

        //DEPORTES
        let aerobics_y_fitness = 0, bicicletas_y_ciclismo = 0, camping_y_pesca = 0, deportes_acuaticos = 0, futbol = 0, otros_deportes = 0;

        //MUSICA
        let arte_y_antiguedades = 0, cds_dvds = 0, instrumentos_musicales = 0, libros_y_revistas = 0;

        //BELLEZA
        let relojes_joyas_accesorios = 0, ropa_y_calzado = 0, salud_y_belleza = 0;

        //BEBES
        let cunas_accesorios = 0, juegos_juguetes = 0, ropa_bebés_y_niños = 0;

        //ANIMALES
        let accesorios_para_perros = 0, accesorios_para_gatos = 0, otros_mascotas = 0;

        //HERRAMIENTAS
        let industria = 0, repuestos = 0, muebles_para_negocios_oficinas = 0;

        //LIBROS
        let novela = 0, gotico = 0, ciencia_ficcion = 0, cuento_de_hadas = 0, accion = 0, drama = 0, suspenso = 0, terror = 0, fantastica = 0;

        //OTROS
        let otra_categoria = 0

        for (let j = 0; j < this.publicaciones.length; j++) {
          const element2 = this.publicaciones[j];
          let fecha = new Date(element2.createdAt)
          let año = fecha.getFullYear()
          if (año == element1) {
            if (element2.categoria == "Tecnologia") {
              if (element2.subcategoria == 'TV - Audio - Video') tv_audio_video++;
              if (element2.subcategoria == 'Celulares - Tablets') celulares_tablets++;
              if (element2.subcategoria == 'Computadoras') computadoras++;
              if (element2.subcategoria == 'Notebooks') notebooks++;
              if (element2.subcategoria == 'Videojuegos') videojuegos++;
              if (element2.subcategoria == 'Consolas') consolas++;
              if (element2.subcategoria == 'Cámaras y accesorios') camaras_y_accesorios++;
            }

            if (element2.categoria == "Hogar") {
              if (element2.subcategoria == 'Accesorios (Hogar)') accesorios_hogar++;
              if (element2.subcategoria == 'Decoración') decoracion++;
              if (element2.subcategoria == 'Electrodomésticos') electrodomesticos++;
              if (element2.subcategoria == 'Muebles') muebles++;
              if (element2.subcategoria == 'Jardin') jardin++;
            }

            if (element2.categoria == "Deporte") {
              if (element2.subcategoria == 'Aerobics y fitness') aerobics_y_fitness++;
              if (element2.subcategoria == 'Bicicletas y ciclismo') bicicletas_y_ciclismo++;
              if (element2.subcategoria == 'Camping y pesca') camping_y_pesca++;
              if (element2.subcategoria == 'Deportes acuaticos') deportes_acuaticos++;
              if (element2.subcategoria == 'Futbol') futbol++;
              if (element2.subcategoria == 'Otros deportes') otros_deportes++;
            }

            if (element2.categoria == "Musica") {
              if (element2.subcategoria == 'Arte y antiguedades') arte_y_antiguedades++;
              if (element2.subcategoria == 'CDs - DVDs') cds_dvds++;
              if (element2.subcategoria == 'Instrumentos musicales') instrumentos_musicales++;
              if (element2.subcategoria == 'Libros y revistas') libros_y_revistas++;
            }

            if (element2.categoria == "Belleza") {
              if (element2.subcategoria == 'Relojes - joyas - accesorios') relojes_joyas_accesorios++;
              if (element2.subcategoria == 'Ropa y calzado') ropa_y_calzado++;
              if (element2.subcategoria == 'Salud y belleza') salud_y_belleza++;
            }

            if (element2.categoria == "Bebes") {
              if (element2.subcategoria == 'Cunas - Accesorios') cunas_accesorios++;
              if (element2.subcategoria == 'Juegos - juguetes') juegos_juguetes++;
              if (element2.subcategoria == 'Ropa bebés y niños') ropa_bebés_y_niños++;
            }

            if (element2.categoria == "Mascotas") {
              if (element2.subcategoria == 'Accesorios para perros') accesorios_para_perros++;
              if (element2.subcategoria == 'Accesorios para gatos') accesorios_para_gatos++;
              if (element2.subcategoria == 'Otros (mascotas)') otros_mascotas++;
            }

            if (element2.categoria == "Herramientas") {
              if (element2.subcategoria == 'Industria') industria++;
              if (element2.subcategoria == 'Repuestos') repuestos++;
              if (element2.subcategoria == 'Muebles para negocios - oficinas') muebles_para_negocios_oficinas++;
            }

            if (element2.categoria == "Libros") {
              if (element2.subcategoria == 'Novela') novela++;
              if (element2.subcategoria == 'Gótico') gotico++;
              if (element2.subcategoria == 'Ciencia Ficción') ciencia_ficcion++;
              if (element2.subcategoria == 'Cuento de hadas') cuento_de_hadas++;
              if (element2.subcategoria == 'Acción') accion++;
              if (element2.subcategoria == 'Drama') drama++;
              if (element2.subcategoria == 'Suspenso') suspenso++;
              if (element2.subcategoria == 'Terror') terror++;
              if (element2.subcategoria == 'Fantástica') fantastica++;
            }

            if (element2.categoria == "Otros") {
              if (element2.subcategoria == 'Otra categoria') otra_categoria++;
            }
          }
        }
        if (this.categoriaSeleccionada == "Tecnologia") {
          array_total_año.push([element1, "TV - Audio - Video", tv_audio_video]);
          array_total_año.push([element1, "Celulares - Tablets", celulares_tablets]);
          array_total_año.push([element1, "Computadoras", computadoras]);
          array_total_año.push([element1, "Notebooks", notebooks]);
          array_total_año.push([element1, "Videojuegos", videojuegos]);
          array_total_año.push([element1, "Consolas", consolas]);
          array_total_año.push([element1, "Cámaras y accesorios", camaras_y_accesorios]);
        }

        if (this.categoriaSeleccionada == "Hogar") {
          array_total_año.push([element1, "Accesorios (Hogar)", accesorios_hogar]);
          array_total_año.push([element1, "Decoración", decoracion]);
          array_total_año.push([element1, "Electrodomésticos", electrodomesticos]);
          array_total_año.push([element1, "Muebles", muebles]);
          array_total_año.push([element1, "Jardin", jardin]);
        }

        if (this.categoriaSeleccionada == "Deportes") {
          array_total_año.push([element1, "Aerobics y fitness", aerobics_y_fitness]);
          array_total_año.push([element1, "Bicicletas y ciclismo", bicicletas_y_ciclismo]);
          array_total_año.push([element1, "Camping y pesca", camping_y_pesca]);
          array_total_año.push([element1, "Deportes acuaticos", deportes_acuaticos]);
          array_total_año.push([element1, "Futbol", futbol]);
          array_total_año.push([element1, "Otros deportes", otros_deportes]);
        }

        if (this.categoriaSeleccionada == "Musica") {
          array_total_año.push([element1, "Arte y antiguedades", arte_y_antiguedades]);
          array_total_año.push([element1, "CDs - DVDs", cds_dvds]);
          array_total_año.push([element1, "Instrumentos musicales", instrumentos_musicales]);
          array_total_año.push([element1, "Libros y revistas", libros_y_revistas]);
        }

        if (this.categoriaSeleccionada == "Belleza") {
          array_total_año.push([element1, "Relojes - joyas - accesorios", relojes_joyas_accesorios]);
          array_total_año.push([element1, "Ropa y calzado", ropa_y_calzado]);
          array_total_año.push([element1, "Salud y belleza", salud_y_belleza]);
        }

        if (this.categoriaSeleccionada == "Bebes") {
          array_total_año.push([element1, "Cunas - Accesorios", cunas_accesorios]);
          array_total_año.push([element1, "Juegos - juguetes", juegos_juguetes]);
          array_total_año.push([element1, "Ropa bebés y niños", ropa_bebés_y_niños]);
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          array_total_año.push([element1, "Accesorios para perros", accesorios_para_perros]);
          array_total_año.push([element1, "Accesorios para gatos", accesorios_para_gatos]);
          array_total_año.push([element1, "Otros (mascotas)", otros_mascotas]);
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          array_total_año.push([element1, "Industria", industria]);
          array_total_año.push([element1, "Repuestos", repuestos]);
          array_total_año.push([element1, "Muebles para negocios - oficinas", muebles_para_negocios_oficinas]);
        }

        if (this.categoriaSeleccionada == "Libros") {
          array_total_año.push([element1, "Novela", novela]);
          array_total_año.push([element1, "Gótico", gotico]);
          array_total_año.push([element1, "Ciencia Ficción", ciencia_ficcion]);
          array_total_año.push([element1, "Cuento de hadas", cuento_de_hadas]);
          array_total_año.push([element1, "Acción", accion]);
          array_total_año.push([element1, "Drama", drama]);
          array_total_año.push([element1, "Suspenso", suspenso]);
          array_total_año.push([element1, "Terror", terror]);
          array_total_año.push([element1, "Fantástica", fantastica]);
        }

        if (this.categoriaSeleccionada == "Otros") {
          array_total_año.push([element1, "Otra categoria", otra_categoria]);
        }
      }

      let years = { "2019": 1, "2020": 2, "2021": 3 };
      array_año.sort();
      array_total_año.sort(function (a, b) {
        return years[a[0]] - years[b[0]];
      });

      let dataset = [];
      for (let i = 0; i < array_total_año.length; i++) {
        const element = array_total_año[i];
        if (this.categoriaSeleccionada == "Tecnologia") {
          if (element[1] == "TV - Audio - Video") array_tv_audio_video.push({ value: element[2] });
          if (element[1] == "Celulares - Tablets") array_celulares_tablets.push({ value: element[2] });
          if (element[1] == "Computadoras") array_computadoras.push({ value: element[2] });
          if (element[1] == "Notebooks") array_notebooks.push({ value: element[2] });
          if (element[1] == "Videojuegos") array_videojuegos.push({ value: element[2] });
          if (element[1] == "Consolas") array_consolas.push({ value: element[2] });
          if (element[1] == "Cámaras y accesorios") array_camaras_y_accesorios.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "TV - Audio - Video", data: array_tv_audio_video })
            dataset.push({ seriesname: "Celulares - Tablets", data: array_celulares_tablets })
            dataset.push({ seriesname: "Computadoras", data: array_computadoras })
            dataset.push({ seriesname: "Notebooks", data: array_notebooks })
            dataset.push({ seriesname: "Videojuegos", data: array_videojuegos })
            dataset.push({ seriesname: "Consolas", data: array_consolas })
            dataset.push({ seriesname: "Cámaras y accesorios", data: array_camaras_y_accesorios })
          }
        }

        if (this.categoriaSeleccionada == "Hogar") {
          if (element[1] == "Accesorios (Hogar)") array_accesorios_hogar.push({ value: element[2] });
          if (element[1] == "Decoración") array_decoracion.push({ value: element[2] });
          if (element[1] == "Electrodomésticos") array_electrodomesticos.push({ value: element[2] });
          if (element[1] == "Muebles") array_muebles.push({ value: element[2] });
          if (element[1] == "Jardin") array_jardin.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Accesorios (Hogar)", data: array_accesorios_hogar })
            dataset.push({ seriesname: "Decoración", data: array_decoracion })
            dataset.push({ seriesname: "Electrodomésticos", data: array_electrodomesticos })
            dataset.push({ seriesname: "Muebles", data: array_muebles })
            dataset.push({ seriesname: "Jardin", data: array_jardin })
          }
        }

        if (this.categoriaSeleccionada == "Deportes") {
          if (element[1] == "Aerobics y fitness") array_aerobics_y_fitness.push({ value: element[2] });
          if (element[1] == "Bicicletas y ciclismo") array_bicicletas_y_ciclismo.push({ value: element[2] });
          if (element[1] == "Camping y pesca") array_camping_y_pesca.push({ value: element[2] });
          if (element[1] == "Deportes acuaticos") array_deportes_acuaticos.push({ value: element[2] });
          if (element[1] == "Futbol") array_futbol.push({ value: element[2] });
          if (element[1] == "Otros deportes") array_otros_deportes.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Aerobics y fitness", data: array_aerobics_y_fitness })
            dataset.push({ seriesname: "Bicicletas y ciclismo", data: array_bicicletas_y_ciclismo })
            dataset.push({ seriesname: "Camping y pesca", data: array_camping_y_pesca })
            dataset.push({ seriesname: "Deportes acuaticos", data: array_deportes_acuaticos })
            dataset.push({ seriesname: "Futbol", data: array_futbol })
            dataset.push({ seriesname: "Otros deportes", data: array_otros_deportes })
          }
        }

        if (this.categoriaSeleccionada == "Musica") {
          if (element[1] == "Arte y antiguedades") array_arte_y_antiguedades.push({ value: element[2] });
          if (element[1] == "CDs - DVDs") array_cds_dvds.push({ value: element[2] });
          if (element[1] == "Instrumentos musicales") array_instrumentos_musicales.push({ value: element[2] });
          if (element[1] == "Libros y revistas") array_libros_y_revistas.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Arte y antiguedades", data: array_arte_y_antiguedades })
            dataset.push({ seriesname: "CDs - DVDs", data: array_cds_dvds })
            dataset.push({ seriesname: "Instrumentos musicales", data: array_instrumentos_musicales })
            dataset.push({ seriesname: "Libros y revistas", data: array_libros_y_revistas })
          }
        }

        if (this.categoriaSeleccionada == "Belleza") {
          if (element[1] == "Relojes - joyas - accesorios") array_relojes_joyas_accesorios.push({ value: element[2] });
          if (element[1] == "Ropa y calzado") array_ropa_y_calzado.push({ value: element[2] });
          if (element[1] == "Salud y belleza") array_salud_y_belleza.push({ value: element[2] });
          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Relojes - joyas - accesorios", data: array_relojes_joyas_accesorios })
            dataset.push({ seriesname: "Ropa y calzado", data: array_ropa_y_calzado })
            dataset.push({ seriesname: "Salud y belleza", data: array_salud_y_belleza })
          }
        }

        if (this.categoriaSeleccionada == "Bebes") {
          if (element[1] == "Cunas - Accesorios") array_cunas_accesorios.push({ value: element[2] });
          if (element[1] == "Juegos - juguetes") array_juegos_juguetes.push({ value: element[2] });
          if (element[1] == "Ropa bebés y niños") array_ropa_bebés_y_niños.push({ value: element[2] });
          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Cunas - Accesorios", data: array_cunas_accesorios })
            dataset.push({ seriesname: "Juegos - juguetes", data: array_juegos_juguetes })
            dataset.push({ seriesname: "Ropa bebés y niños", data: array_ropa_bebés_y_niños })
          }
        }

        if (this.categoriaSeleccionada == "Mascotas") {
          if (element[1] == "Accesorios para perros") array_accesorios_para_perros.push({ value: element[2] });
          if (element[1] == "Accesorios para gatos") array_accesorios_para_gatos.push({ value: element[2] });
          if (element[1] == "Otros (mascotas)") array_otros_mascotas.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Accesorios para perros", data: array_accesorios_para_perros })
            dataset.push({ seriesname: "Accesorios para gatos", data: array_accesorios_para_gatos })
            dataset.push({ seriesname: "Otros (mascotas)", data: array_otros_mascotas })
          }
        }

        if (this.categoriaSeleccionada == "Herramientas") {
          if (element[1] == "Industria") array_industria.push({ value: element[2] });
          if (element[1] == "Repuestos") array_repuestos.push({ value: element[2] });
          if (element[1] == "Muebles para negocios - oficinas") array_muebles_para_negocios_oficinas.push({ value: element[2] });
          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Industria", data: array_industria })
            dataset.push({ seriesname: "Repuestos", data: array_repuestos })
            dataset.push({ seriesname: "Muebles para negocios - oficinas", data: array_muebles_para_negocios_oficinas })
          }
        }

        if (this.categoriaSeleccionada == "Libros") {
          if (element[1] == "Novela") array_novela.push({ value: element[2] });
          if (element[1] == "Gótico") array_gotico.push({ value: element[2] });
          if (element[1] == "Ciencia Ficción") array_ciencia_ficcion.push({ value: element[2] });
          if (element[1] == "Cuento de hadas") array_cuento_de_hadas.push({ value: element[2] });
          if (element[1] == "Acción") array_accion.push({ value: element[2] });
          if (element[1] == "Drama") array_drama.push({ value: element[2] });
          if (element[1] == "Suspenso") array_suspenso.push({ value: element[2] });
          if (element[1] == "Terror") array_terror.push({ value: element[2] });
          if (element[1] == "Fantástica") array_fantastica.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Novela", data: array_novela })
            dataset.push({ seriesname: "Gótico", data: array_gotico })
            dataset.push({ seriesname: "Ciencia Ficción", data: array_ciencia_ficcion })
            dataset.push({ seriesname: "Cuento de hadas", data: array_cuento_de_hadas })
            dataset.push({ seriesname: "Acción", data: array_accion })
            dataset.push({ seriesname: "Drama", data: array_drama })
            dataset.push({ seriesname: "Suspenso", data: array_suspenso })
            dataset.push({ seriesname: "Terror", data: array_terror })
            dataset.push({ seriesname: "Fantástica", data: array_fantastica })
          }
        }

        if (this.categoriaSeleccionada == "Otros") {
          if (element[1] == "Otra categoria") array_otra_categoria.push({ value: element[2] });

          if (i == (array_total_año.length - 1)) {
            dataset.push({ seriesname: "Otra categoria", data: array_otra_categoria })
          }
        }

      }

      for (let i = 0; i < array_año.length; i++) {
        const element = array_año[i];
        array_labels.push({ label: element })
      }

      this.type = "mscolumn3d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          caption: "Cantidad de publicaciones según subcategoría",
          subcaption: "Ordenados por año",
          bgColor: "#fafafa",
          xaxisname: "Años",
          yaxisname: "Cantidad",
          formatnumberscale: "1",
          theme: "fusion",
          showvalues: "1"
        },
        categories: [
          {
            category: [{ label: "2019" }, { label: "2020" }, { label: "2021" }]
          }
        ],
        dataset: dataset
      }
      this.mostrarGrafico = true;
      this.spinner.hide();
    }


    /* Cantidad de usuarios filtrados por red social */
    if (periodo == "Por día" && this.nombreEstadisticaSeleccionada == "Cantidad de usuarios filtrados por red social") {
      let array_usuarios = [], array_total = [];
      let schema2 = [
        {
          "name": "Tiempo",
          "type": "date",
          "format": "%d-%b-%y"
        },
        {
          "name": "Red social",
          "type": "string"
        },
        {
          "name": "Cantidad",
          "type": "number"
        }
      ]
      /* Arma array con los usuarios y sus fechas de creación formateadas */
      for (let i = 0; i < this.usuarios.length; i++) {
        const element = this.usuarios[i];
        let fecha = new Date(element.createdAt);
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2)
        let formato_elemento = fecha.getUTCDate() + "-" + mes + "-" + año;
        array_usuarios.push({ tiempo: formato_elemento, tipo: element.tipo });

        if (array_fechas.length == 0) {
          array_fechas.push(formato_elemento);
        } else {
          if (!array_fechas.includes(formato_elemento)) {
            array_fechas.push(formato_elemento)
          }
        }
      }

      /* Arma array para el grafico */
      for (let i = 0; i < array_fechas.length; i++) {
        let google = 0, facebook = 0, oneuse = 0;
        const element1 = array_fechas[i];
        for (let j = 0; j < array_usuarios.length; j++) {
          const element2 = array_usuarios[j];
          if (element1 == element2.tiempo) {
            if (element2.tipo == 'gmail') google++;
            if (element2.tipo == 'facebook') facebook++
            if (element2.tipo == 'oneuse') oneuse++
          }
        }
        array_total.push([element1, "Google", google]);
        array_total.push([element1, "Facebook", facebook]);
        array_total.push([element1, "OneUse", oneuse]);
      }

      const fusionDataStore = new FusionCharts.DataStore();
      const fusionTable = fusionDataStore.createDataTable(array_total, schema2);
      this.type = "timeseries"
      this.dataSource = {
        chart: { theme: "fusion", bgColor: "#fafafa", xaxisname: "Días", },
        caption: {
          text: "Cantidad de usuarios creados por día"
        },
        subcaption: {
          text: "Filtrados por red social"
        },
        series: "Red social",
        yaxis: [
          {
            plot: "cantidad",
            title: "Cantidad",
            plottype: "smooth-line",
          }
        ]
      };
      this.dataSource.data = fusionTable;
      this.mostrarGrafico = true;
      this.spinner.hide();
    }

    if (periodo == "Por mes" && this.nombreEstadisticaSeleccionada == "Cantidad de usuarios filtrados por red social") {
      let array_meses = [], array_labels = [], array_usuarios = [], array_total = [];

      for (let i = 0; i < this.usuarios.length; i++) {
        const element = this.usuarios[i];
        let fecha = new Date(element.createdAt)
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2, 4);
        let fecha_formateada = mes + " " + año
        array_usuarios.push({ tiempo: fecha_formateada, tipo: element.tipo });

        if (array_meses.length == 0) {
          array_meses.push(fecha_formateada);
        } else {
          if (!array_meses.includes(fecha_formateada)) {
            array_meses.push(fecha_formateada)
          }
        }
      }

      /*Armar array con totales por mes */
      for (let i = 0; i < array_meses.length; i++) {
        const element1 = array_meses[i];
        let google = 0, facebook = 0, oneuse = 0;
        for (let j = 0; j < array_usuarios.length; j++) {
          const element2 = array_usuarios[j];
          if (element2.tiempo == element1) {
            if (element2.tipo == 'gmail') google++;
            if (element2.tipo == 'facebook') facebook++
            if (element2.tipo == 'oneuse') oneuse++
          }
        }
        array_total.push([element1, "Google", google]);
        array_total.push([element1, "Facebook", facebook]);
        array_total.push([element1, "OneUse", oneuse]);
      }

      /* Ordena y crea los arreglos para después mostrar el gráfico */
      var monthNames = {
        "Jan 20": 1, "Feb 20": 2, "Mar 20": 3, "Apr 20": 4, "May 20": 5, "Jun 20": 6, "Jul 20": 7, "Aug 20": 8, "Sep 20": 9, "Oct 20": 10, "Nov 20": 11, "Dec 20": 12,
        "Jan 21": 13, "Feb 21": 14, "Mar 21": 15, "Apr 21": 16, "May 21": 17, "Jun 21": 18, "Jul 21": 19, "Aug 21": 20, "Sep 21": 21, "Oct 21": 22, "Nov 21": 23, "Dec 21": 24
      };

      array_total.sort(function (a, b) {
        return monthNames[a[0]] - monthNames[b[0]];
      });

      array_meses.sort(function (a, b) {
        return monthNames[a] - monthNames[b];
      })

      let array_google = [], array_facebook = [], array_oneuse = []
      for (let i = 0; i < array_total.length; i++) {
        const element = array_total[i];
        if (element[1] == "Google") array_google.push({ value: element[2] });
        if (element[1] == "Facebook") array_facebook.push({ value: element[2] });
        if (element[1] == "OneUse") array_oneuse.push({ value: element[2] });
      }

      for (let i = 0; i < array_meses.length; i++) {
        const element = array_meses[i];
        array_labels.push({ label: element })
      }

      this.type = "msspline";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          caption: "Cantidad de usuarios filtrados por red social",
          bgColor: "#fafafa",
          xaxisname: "Meses",
          yaxisname: "Cantidad",
          subcaption: "Ordenados por mes",
          numdivlines: "3",
          showvalues: "1",
          legenditemfontsize: "11",
          legenditemfontbold: "1",
          theme: "fusion"
        },
        categories: [
          {
            category: array_labels
          }
        ],
        dataset: [
          {
            seriesname: "Google",
            color: "#DB4437",
            data: array_google
          },
          {
            seriesname: "Facebook",
            color: "#3b5998",
            data: array_facebook
          },
          {
            seriesname: "OneUse",
            color: "#fdbb30",
            data: array_oneuse
          }
        ]
      }
      this.mostrarGrafico = true;
      this.spinner.hide();
    }

    if (periodo == "Por año" && this.nombreEstadisticaSeleccionada == "Cantidad de usuarios filtrados por red social") {
      let array_año = [], array_usuarios = [], array_total_año = [], array_labels = [];

      for (let i = 0; i < this.usuarios.length; i++) {
        const element = this.usuarios[i];
        let fecha = new Date(element.createdAt)
        let año = fecha.getFullYear()
        array_usuarios.push({ tiempo: año, tipo: element.tipo });

        if (array_año.length == 0) {
          array_año.push(año);
        } else {
          if (!array_año.includes(año)) {
            array_año.push(año)
          }
        }
      }

      for (let i = 0; i < array_año.length; i++) {
        const element1 = array_año[i];
        let google = 0, facebook = 0, oneuse = 0;
        for (let j = 0; j < array_usuarios.length; j++) {
          const element2 = array_usuarios[j];
          if (element2.tiempo == element1) {
            if (element2.tipo == 'gmail') google++;
            if (element2.tipo == 'facebook') facebook++
            if (element2.tipo == 'oneuse') oneuse++
          }
        }
        array_total_año.push([element1, "Google", google]);
        array_total_año.push([element1, "Facebook", facebook]);
        array_total_año.push([element1, "OneUse", oneuse]);
      }

      let years = { "2019": 1, "2020": 2, "2021": 3 };
      array_año.sort();
      array_total_año.sort(function (a, b) {
        return years[a[0]] - years[b[0]];
      });

      let array_google = [], array_facebook = [], array_oneuse = []
      for (let i = 0; i < array_total_año.length; i++) {
        const element = array_total_año[i];
        if (element[1] == "Google") array_google.push({ value: element[2] });
        if (element[1] == "Facebook") array_facebook.push({ value: element[2] });
        if (element[1] == "OneUse") array_oneuse.push({ value: element[2] });
      }

      for (let i = 0; i < array_año.length; i++) {
        const element = array_año[i];
        array_labels.push({ label: element })
      }

      this.type = "stackedcolumn2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          caption: "Cantidad de usuarios filtrados por red social",
          subcaption: "Ordenados por año",
          bgColor: "#fafafa",
          xaxisname: "Años",
          yaxisname: "Cantidad",
          formatnumberscale: "1",
          theme: "fusion",
          showvalues: "1"
        },
        categories: [
          {
            category: [{ label: "2019" }, { label: "2020" }, { label: "2021" }]
          }
        ],
        dataset: [
          {
            seriesname: "Google",
            color: "#DB4437",
            data: array_google
          },
          {
            seriesname: "Facebook",
            color: "#3b5998",
            data: array_facebook
          },
          {
            seriesname: "OneUse",
            color: "#fdbb30",
            data: array_oneuse
          }
        ]
      }
      this.mostrarGrafico = true;
      this.spinner.hide();
    }


    /* Ranking de quienes más alquilan objetos */
    if (periodo == "Esta semana" && this.nombreEstadisticaSeleccionada == 'Ranking de quienes más alquilan objetos') {
      this.periodoRankingMesHabilitado = false;
      let semana: Date[] = this.obtenerSemana();
      var array_usuarios = [], array_x_dia = [], array_resultado = [];
      for (let j = 0; j < semana.length; j++) {
        const element1 = semana[j];
        for (let i = 0; i < this.alquileres.length; i++) {
          const element2 = this.alquileres[i];
          let fecha = new Date(element2.createdAt)
          if (element1.getDate() == fecha.getDate() && element1.getFullYear() == fecha.getFullYear() && element1.getMonth() == fecha.getMonth()) {
            array_usuarios.push(element2.name_usuarioLocatario)
          }
        }
      }

      if (array_usuarios.length > 0) {
        for (let index = 0; index < array_usuarios.length; index++) {
          const element1 = array_usuarios[index];
          if (array_x_dia.length == 0) {
            array_x_dia.push([element1, 1])
          } else {
            let indice = -1;
            for (let h = 0; h < array_x_dia.length; h++) {
              const element2 = array_x_dia[h];
              if (element2[0] == element1) {
                indice = h;
                break;
              } else continue;
            }
            if (indice < 0) {
              array_x_dia.push([element1, 1])
            } else {
              array_x_dia[indice][1]++;
            }
          }
        }

        if (array_x_dia.length > 5) {
          array_x_dia.splice(5)
        }

        array_x_dia.sort(function (a, b) {
          return b[1] - a[1];
        });

        for (let i = 0; i < array_x_dia.length; i++) {
          const element = array_x_dia[i];
          array_resultado.push({ label: element[0], value: element[1] })
        }
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de quienes más alquilan objetos",
          subcaption: "En esta semana",
          plottooltext: "<b>$label</b> realizó $value alquileres",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de alquileres",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    if (periodo == "Por mes" && this.nombreEstadisticaSeleccionada == 'Ranking de quienes más alquilan objetos') {
      var array_meses = []
      this.periodoRankingMes = []

      this.periodoRankingMesHabilitado = true;
      this.periodoRankingAnioHabilitado = false;

      for (let i = 0; i < this.alquileres.length; i++) {
        const element2 = this.alquileres[i];
        let fecha = new Date(element2.createdAt)
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2, 4);
        let fecha_formateada = mes + " " + año
        if (array_meses.length == 0) {
          array_meses.push(fecha_formateada)
        } else {
          if (!array_meses.includes(fecha_formateada)) {
            array_meses.push(fecha_formateada)
          }
        }
      }

      var monthNames = {
        "Jan 20": 1, "Feb 20": 2, "Mar 20": 3, "Apr 20": 4, "May 20": 5, "Jun 20": 6, "Jul 20": 7, "Aug 20": 8, "Sep 20": 9, "Oct 20": 10, "Nov 20": 11, "Dec 20": 12,
        "Jan 21": 13, "Feb 21": 14, "Mar 21": 15, "Apr 21": 16, "May 21": 17, "Jun 21": 18, "Jul 21": 19, "Aug 21": 20, "Sep 21": 21, "Oct 21": 22, "Nov 21": 23, "Dec 21": 24
      };

      array_meses.sort(function (a, b) {
        return monthNames[a] - monthNames[b];
      })

      for (let j = 0; j < array_meses.length; j++) {
        const element = array_meses[j];
        let muestra = obtenerViewValue(element)
        this.periodoRankingMes.push({ viewValue: muestra, value: element });
      }
      this.spinner.hide();

      function obtenerViewValue(elemento) {
        if (elemento == "Jan 20") return "Enero - 2020"
        if (elemento == "Feb 20") return "Febrero - 2020"
        if (elemento == "Mar 20") return "Marzo - 2020"
        if (elemento == "Apr 20") return "Abril - 2020"
        if (elemento == "May 20") return "Mayo - 2020"
        if (elemento == "Jun 20") return "Junio - 2020"
        if (elemento == "Jul 20") return "Julio - 2020"
        if (elemento == "Aug 20") return "Agosto - 2020"
        if (elemento == "Sep 20") return "Septiembre - 2020"
        if (elemento == "Oct 20") return "Octubre - 2020"
        if (elemento == "Nov 20") return "Noviembre - 2020"
        if (elemento == "Dec 20") return "Diciembre - 2020"
        if (elemento == "Jan 21") return "Enero - 2021"
        if (elemento == "Feb 21") return "Febrero - 2021"
        if (elemento == "Mar 21") return "Marzo - 2021"
        if (elemento == "Apr 21") return "Abril - 2021"
        if (elemento == "May 21") return "Mayo - 2021"
        if (elemento == "Jun 21") return "Junio - 2021"
        if (elemento == "Jul 21") return "Julio - 2021"
        if (elemento == "Aug 21") return "Agosto - 2021"
        if (elemento == "Sep 21") return "Septiembre - 2021"
        if (elemento == "Oct 21") return "Octubre - 2021"
        if (elemento == "Nov 21") return "Noviembre - 2021"
        if (elemento == "Dec 21") return "Diciembre - 2021"
      }
    }

    if (periodo == "Por año" && this.nombreEstadisticaSeleccionada == 'Ranking de quienes más alquilan objetos') {
      this.periodoRankingMesHabilitado = false;
      this.periodoRankingAnioHabilitado = true;

      this.periodoRankingAnio = []

      for (let i = 0; i < this.alquileres.length; i++) {
        const element = this.alquileres[i];
        let fecha = new Date(element.createdAt)
        let año = fecha.getFullYear();
        if (this.periodoRankingAnio.length == 0) {
          this.periodoRankingAnio.push(año)
        } else {
          if (!this.periodoRankingAnio.includes(año)) {
            this.periodoRankingAnio.push(año)
          }
        }
      }

      this.periodoRankingAnio.sort()
      this.spinner.hide();
    }


    /* Ranking de quienes más publican objetos */
    if (periodo == "Esta semana" && this.nombreEstadisticaSeleccionada == 'Ranking de quienes más publican objetos') {
      this.spinner.show()
      this.periodoRankingMesHabilitado = false;
      let semana: Date[] = this.obtenerSemana();
      var array_usuarios = [], array_x_dia = [], array_resultado = [];
      for (let j = 0; j < semana.length; j++) {
        const element1 = semana[j];
        for (let i = 0; i < this.publicaciones.length; i++) {
          const element2 = this.publicaciones[i];
          let fecha = new Date(element2.createdAt)
          if (element1.getDate() == fecha.getDate() && element1.getFullYear() == fecha.getFullYear() && element1.getMonth() == fecha.getMonth()) {
            for (let h = 0; h < this.usuarios.length; h++) {
              const element3 = this.usuarios[h];
              if (element3.email == element2.email) {
                array_usuarios.push(element2.name)
                break;
              }
            }
          }
        }
      }

      if (array_usuarios.length > 0) {
        for (let index = 0; index < array_usuarios.length; index++) {
          const element1 = array_usuarios[index];
          if (array_x_dia.length == 0) {
            array_x_dia.push([element1, 1])
          } else {
            let indice = -1;
            for (let h = 0; h < array_x_dia.length; h++) {
              const element2 = array_x_dia[h];
              if (element2[0] == element1) {
                indice = h;
                break;
              } else continue;
            }
            if (indice < 0) {
              array_x_dia.push([element1, 1])
            } else {
              array_x_dia[indice][1]++;
            }
          }
        }

        if (array_x_dia.length > 5) {
          array_x_dia.splice(5)
        }

        array_x_dia.sort(function (a, b) {
          return b[1] - a[1];
        });

        for (let i = 0; i < array_x_dia.length; i++) {
          const element = array_x_dia[i];
          array_resultado.push({ label: element[0], value: element[1] })
        }
        this.noHayDatos = false;
        this.mostrarGrafico = true;
      } else {
        this.mostrarGrafico = false;
        this.noHayDatos = true;
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de quienes más publican objetos",
          subcaption: "En esta semana",
          plottooltext: "<b>$label</b> realizó $value alquileres",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de publicaciones",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.spinner.hide()
    }

    if (periodo == "Por mes" && this.nombreEstadisticaSeleccionada == 'Ranking de quienes más publican objetos') {
      var array_meses = []
      this.periodoRankingMes = []

      this.periodoRankingMesHabilitado = true;
      this.periodoRankingAnioHabilitado = false;

      for (let i = 0; i < this.publicaciones.length; i++) {
        const element2 = this.publicaciones[i];
        let fecha = new Date(element2.createdAt)
        let mes = this.obtenerMes(fecha);
        let año = String(fecha.getFullYear()).slice(2, 4);
        let fecha_formateada = mes + " " + año
        if (array_meses.length == 0) {
          array_meses.push(fecha_formateada)
        } else {
          if (!array_meses.includes(fecha_formateada)) {
            array_meses.push(fecha_formateada)
          }
        }
      }

      let monthNames = {
        "Jan 19": 1, "Feb 19": 2, "Mar 19": 3, "Apr 19": 4, "May 19": 5, "Jun 19": 6, "Jul 19": 7, "Aug 19": 8, "Sep 19": 9, "Oct 19": 10, "Nov 19": 11, "Dec 19": 12,
        "Jan 20": 13, "Feb 20": 14, "Mar 20": 15, "Apr 20": 16, "May 20": 17, "Jun 20": 18, "Jul 20": 19, "Aug 20": 20, "Sep 20": 21, "Oct 20": 22, "Nov 20": 23, "Dec 20": 24,
        "Jan 21": 25, "Feb 21": 26, "Mar 21": 27, "Apr 21": 28, "May 21": 29, "Jun 21": 30, "Jul 21": 31, "Aug 21": 32, "Sep 21": 33, "Oct 21": 34, "Nov 21": 35, "Dec 21": 36
      };

      array_meses.sort(function (a, b) {
        return monthNames[a] - monthNames[b];
      })

      for (let j = 0; j < array_meses.length; j++) {
        const element = array_meses[j];
        let muestra = obtenerViewValue(element)
        this.periodoRankingMes.push({ viewValue: muestra, value: element });
      }
      this.spinner.hide();

      function obtenerViewValue(elemento) {
        if (elemento == "Jan 19") return "Enero - 2019"
        if (elemento == "Feb 19") return "Febrero - 2019"
        if (elemento == "Mar 19") return "Marzo - 2019"
        if (elemento == "Apr 19") return "Abril - 2019"
        if (elemento == "May 19") return "Mayo - 2019"
        if (elemento == "Jun 19") return "Junio - 2019"
        if (elemento == "Jul 19") return "Julio - 2019"
        if (elemento == "Aug 19") return "Agosto - 2019"
        if (elemento == "Sep 19") return "Septiembre - 2019"
        if (elemento == "Oct 19") return "Octubre - 2019"
        if (elemento == "Nov 19") return "Noviembre - 2019"
        if (elemento == "Dec 19") return "Diciembre - 2019"
        if (elemento == "Jan 20") return "Enero - 2020"
        if (elemento == "Feb 20") return "Febrero - 2020"
        if (elemento == "Mar 20") return "Marzo - 2020"
        if (elemento == "Apr 20") return "Abril - 2020"
        if (elemento == "May 20") return "Mayo - 2020"
        if (elemento == "Jun 20") return "Junio - 2020"
        if (elemento == "Jul 20") return "Julio - 2020"
        if (elemento == "Aug 20") return "Agosto - 2020"
        if (elemento == "Sep 20") return "Septiembre - 2020"
        if (elemento == "Oct 20") return "Octubre - 2020"
        if (elemento == "Nov 20") return "Noviembre - 2020"
        if (elemento == "Dec 20") return "Diciembre - 2020"
        if (elemento == "Jan 21") return "Enero - 2021"
        if (elemento == "Feb 21") return "Febrero - 2021"
        if (elemento == "Mar 21") return "Marzo - 2021"
        if (elemento == "Apr 21") return "Abril - 2021"
        if (elemento == "May 21") return "Mayo - 2021"
        if (elemento == "Jun 21") return "Junio - 2021"
        if (elemento == "Jul 21") return "Julio - 2021"
        if (elemento == "Aug 21") return "Agosto - 2021"
        if (elemento == "Sep 21") return "Septiembre - 2021"
        if (elemento == "Oct 21") return "Octubre - 2021"
        if (elemento == "Nov 21") return "Noviembre - 2021"
        if (elemento == "Dec 21") return "Diciembre - 2021"
      }
    }

    if (periodo == "Por año" && this.nombreEstadisticaSeleccionada == 'Ranking de quienes más publican objetos') {
      this.periodoRankingMesHabilitado = false;
      this.periodoRankingAnioHabilitado = true;

      this.periodoRankingAnio = []

      for (let i = 0; i < this.publicaciones.length; i++) {
        const element = this.publicaciones[i];
        let fecha = new Date(element.createdAt)
        let año = fecha.getFullYear();
        if (this.periodoRankingAnio.length == 0) {
          this.periodoRankingAnio.push(año)
        } else {
          if (!this.periodoRankingAnio.includes(año)) {
            this.periodoRankingAnio.push(año)
          }
        }
      }

      this.periodoRankingAnio.sort()
      this.spinner.hide();
    }


    /* Ranking de propietarios mejores puntuados del sitio */
    if (periodo == "Esta semana" && this.nombreEstadisticaSeleccionada == 'Ranking de propietarios mejores puntuados del sitio') {
      this.spinner.show()
      this.periodoRankingMesHabilitado = false;

      let semana: Date[] = this.obtenerSemana(), array_sumatorias = [], array_resultado = [];
      for (let j = 0; j < semana.length; j++) {
        const element1 = semana[j];
        for (let i = 0; i < this.alquileres.length; i++) {
          const element2 = this.alquileres[i];
          let existe = false;
          let fecha = new Date(element2.createdAt)
          if (element1.getDate() == fecha.getDate() && element1.getFullYear() == fecha.getFullYear() && element1.getMonth() == fecha.getMonth() && element2.puntuacion_locatario_al_propietario_ingresada == true) {
            if (array_sumatorias.length == 0) {
              array_sumatorias.push([element2.name_usuarioPropietario, 1, element2.puntuacion_locatario_al_propietario])
            } else {
              for (let j = 0; j < array_sumatorias.length; j++) {
                const element3 = array_sumatorias[j];
                if (element3.includes(element2.name_usuarioPropietario)) {
                  element3[1]++;
                  element3[2] += element2.puntuacion_locatario_al_propietario;
                  existe = true;
                  break;
                }
              }
              if (!existe) {
                array_sumatorias.push([element2.name_usuarioPropietario, 1, element2.puntuacion_locatario_al_propietario])
              }
            }
          }
        }
      }

      if (array_sumatorias.length == 0) {
        this.mostrarGrafico = false;
        this.noHayDatos = true;
      } else {
        if (array_sumatorias.length > 5) {
          array_sumatorias.splice(5)
        }

        array_resultado.sort(function (a, b) {
          return b[2] - a[2];
        })

        for (let i = 0; i < array_sumatorias.length; i++) {
          const element = array_sumatorias[i];
          let promedio = Math.floor(element[2] / element[1]);
          array_resultado.push({ label: element[0], value: promedio })
        }

        this.type = "column2d";
        this.dataFormat = "json";
        this.dataSource = {
          chart: {
            bgColor: "#fafafa",
            showvalues: "1",
            caption: "Ranking de propietarios mejores puntuados del sitio",
            subcaption: "Esta semana",
            plottooltext: "<b>$label</b> tuvo una puntuación promedio de $value estrellas",
            xaxisname: "Usuarios",
            yaxisname: "Puntuación promedio",
            theme: "fusion"
          },
          data: array_resultado
        };
        this.mostrarGrafico = true;
        this.spinner.hide()
      }
    }

    if (periodo == "Por mes" && this.nombreEstadisticaSeleccionada == 'Ranking de propietarios mejores puntuados del sitio') {
      var array_meses = []
      this.periodoRankingMes = []

      this.periodoRankingMesHabilitado = true;
      this.periodoRankingAnioHabilitado = false;

      for (let i = 0; i < this.alquileres.length; i++) {
        const element = this.alquileres[i];
        if (element.puntuacion_locatario_al_propietario_ingresada == true) {
          let fecha = new Date(element.createdAt)
          let mes = this.obtenerMes(fecha);
          let año = String(fecha.getFullYear()).slice(2, 4);
          let fecha_formateada = mes + " " + año
          if (array_meses.length == 0) {
            array_meses.push(fecha_formateada)
          } else {
            if (!array_meses.includes(fecha_formateada)) {
              array_meses.push(fecha_formateada)
            }
          }
        }
      }

      let monthNames = {
        "Jan 19": 1, "Feb 19": 2, "Mar 19": 3, "Apr 19": 4, "May 19": 5, "Jun 19": 6, "Jul 19": 7, "Aug 19": 8, "Sep 19": 9, "Oct 19": 10, "Nov 19": 11, "Dec 19": 12,
        "Jan 20": 13, "Feb 20": 14, "Mar 20": 15, "Apr 20": 16, "May 20": 17, "Jun 20": 18, "Jul 20": 19, "Aug 20": 20, "Sep 20": 21, "Oct 20": 22, "Nov 20": 23, "Dec 20": 24,
        "Jan 21": 25, "Feb 21": 26, "Mar 21": 27, "Apr 21": 28, "May 21": 29, "Jun 21": 30, "Jul 21": 31, "Aug 21": 32, "Sep 21": 33, "Oct 21": 34, "Nov 21": 35, "Dec 21": 36
      };

      array_meses.sort(function (a, b) {
        return monthNames[a] - monthNames[b];
      })

      for (let j = 0; j < array_meses.length; j++) {
        const element = array_meses[j];
        let muestra = obtenerViewValue(element)
        this.periodoRankingMes.push({ viewValue: muestra, value: element });
      }
      this.spinner.hide();

      function obtenerViewValue(elemento) {
        if (elemento == "Jan 19") return "Enero - 2019"
        if (elemento == "Feb 19") return "Febrero - 2019"
        if (elemento == "Mar 19") return "Marzo - 2019"
        if (elemento == "Apr 19") return "Abril - 2019"
        if (elemento == "May 19") return "Mayo - 2019"
        if (elemento == "Jun 19") return "Junio - 2019"
        if (elemento == "Jul 19") return "Julio - 2019"
        if (elemento == "Aug 19") return "Agosto - 2019"
        if (elemento == "Sep 19") return "Septiembre - 2019"
        if (elemento == "Oct 19") return "Octubre - 2019"
        if (elemento == "Nov 19") return "Noviembre - 2019"
        if (elemento == "Dec 19") return "Diciembre - 2019"
        if (elemento == "Jan 20") return "Enero - 2020"
        if (elemento == "Feb 20") return "Febrero - 2020"
        if (elemento == "Mar 20") return "Marzo - 2020"
        if (elemento == "Apr 20") return "Abril - 2020"
        if (elemento == "May 20") return "Mayo - 2020"
        if (elemento == "Jun 20") return "Junio - 2020"
        if (elemento == "Jul 20") return "Julio - 2020"
        if (elemento == "Aug 20") return "Agosto - 2020"
        if (elemento == "Sep 20") return "Septiembre - 2020"
        if (elemento == "Oct 20") return "Octubre - 2020"
        if (elemento == "Nov 20") return "Noviembre - 2020"
        if (elemento == "Dec 20") return "Diciembre - 2020"
        if (elemento == "Jan 21") return "Enero - 2021"
        if (elemento == "Feb 21") return "Febrero - 2021"
        if (elemento == "Mar 21") return "Marzo - 2021"
        if (elemento == "Apr 21") return "Abril - 2021"
        if (elemento == "May 21") return "Mayo - 2021"
        if (elemento == "Jun 21") return "Junio - 2021"
        if (elemento == "Jul 21") return "Julio - 2021"
        if (elemento == "Aug 21") return "Agosto - 2021"
        if (elemento == "Sep 21") return "Septiembre - 2021"
        if (elemento == "Oct 21") return "Octubre - 2021"
        if (elemento == "Nov 21") return "Noviembre - 2021"
        if (elemento == "Dec 21") return "Diciembre - 2021"
      }
    }

    if (periodo == "Por año" && this.nombreEstadisticaSeleccionada == 'Ranking de propietarios mejores puntuados del sitio') {
      this.periodoRankingMesHabilitado = false;
      this.periodoRankingAnioHabilitado = true;

      this.periodoRankingAnio = []

      for (let i = 0; i < this.alquileres.length; i++) {
        const element = this.alquileres[i];
        if (element.puntuacion_locatario_al_propietario_ingresada == true) {
          let fecha = new Date(element.createdAt)
          let año = fecha.getFullYear();
          if (this.periodoRankingAnio.length == 0) {
            this.periodoRankingAnio.push(año)
          } else {
            if (!this.periodoRankingAnio.includes(año)) {
              this.periodoRankingAnio.push(año)
            }
          }
        }
      }

      this.periodoRankingAnio.sort()
      this.spinner.hide();
    }

    /* Ranking de propietarios mejores puntuados del sitio */
    if (periodo == "Esta semana" && this.nombreEstadisticaSeleccionada == 'Ranking de locatarios mejores puntuados del sitio') {
      this.spinner.show()
      this.periodoRankingMesHabilitado = false;

      let semana: Date[] = this.obtenerSemana(), array_sumatorias = [], array_resultado = [];
      for (let j = 0; j < semana.length; j++) {
        const element1 = semana[j];
        for (let i = 0; i < this.alquileres.length; i++) {
          const element2 = this.alquileres[i];
          let existe = false;
          let fecha = new Date(element2.createdAt)
          if (element1.getDate() == fecha.getDate() && element1.getFullYear() == fecha.getFullYear() && element1.getMonth() == fecha.getMonth() && element2.puntuacion_propietario_al_locatario_ingresada == true) {
            if (array_sumatorias.length == 0) {
              array_sumatorias.push([element2.name_usuarioLocatario, 1, element2.puntuacion_propietario_al_locatario])
            } else {
              for (let j = 0; j < array_sumatorias.length; j++) {
                const element3 = array_sumatorias[j];
                if (element3.includes(element2.name_usuarioLocatario)) {
                  element3[1]++;
                  element3[2] += element2.puntuacion_propietario_al_locatario;
                  existe = true;
                  break;
                }
              }
              if (!existe) {
                array_sumatorias.push([element2.name_usuarioLocatario, 1, element2.puntuacion_propietario_al_locatario])
              }
            }
          }
        }
      }

      if (array_sumatorias.length == 0) {
        this.mostrarGrafico = false;
        this.noHayDatos = true;
      } else {
        if (array_sumatorias.length > 5) {
          array_sumatorias.splice(5)
        }

        array_resultado.sort(function (a, b) {
          return b[2] - a[2];
        })

        for (let i = 0; i < array_sumatorias.length; i++) {
          const element = array_sumatorias[i];
          let promedio = Math.floor(element[2] / element[1]);
          array_resultado.push({ label: element[0], value: promedio })
        }

        this.type = "column2d";
        this.dataFormat = "json";
        this.dataSource = {
          chart: {
            bgColor: "#fafafa",
            showvalues: "1",
            caption: "Ranking de locatarios mejores puntuados del sitio",
            subcaption: "Esta semana",
            plottooltext: "<b>$label</b> tuvo una puntuación promedio de $value estrellas",
            xaxisname: "Usuarios",
            yaxisname: "Puntuación promedio",
            theme: "fusion"
          },
          data: array_resultado
        };
        this.mostrarGrafico = true;
        this.spinner.hide()
      }
    }

    if (periodo == "Por mes" && this.nombreEstadisticaSeleccionada == 'Ranking de locatarios mejores puntuados del sitio') {
      var array_meses = []
      this.periodoRankingMes = []

      this.periodoRankingMesHabilitado = true;
      this.periodoRankingAnioHabilitado = false;

      for (let i = 0; i < this.alquileres.length; i++) {
        const element = this.alquileres[i];
        if (element.puntuacion_propietario_al_locatario_ingresada == true) {
          let fecha = new Date(element.createdAt)
          let mes = this.obtenerMes(fecha);
          let año = String(fecha.getFullYear()).slice(2, 4);
          let fecha_formateada = mes + " " + año
          if (array_meses.length == 0) {
            array_meses.push(fecha_formateada)
          } else {
            if (!array_meses.includes(fecha_formateada)) {
              array_meses.push(fecha_formateada)
            }
          }
        }
      }

      let monthNames = {
        "Jan 19": 1, "Feb 19": 2, "Mar 19": 3, "Apr 19": 4, "May 19": 5, "Jun 19": 6, "Jul 19": 7, "Aug 19": 8, "Sep 19": 9, "Oct 19": 10, "Nov 19": 11, "Dec 19": 12,
        "Jan 20": 13, "Feb 20": 14, "Mar 20": 15, "Apr 20": 16, "May 20": 17, "Jun 20": 18, "Jul 20": 19, "Aug 20": 20, "Sep 20": 21, "Oct 20": 22, "Nov 20": 23, "Dec 20": 24,
        "Jan 21": 25, "Feb 21": 26, "Mar 21": 27, "Apr 21": 28, "May 21": 29, "Jun 21": 30, "Jul 21": 31, "Aug 21": 32, "Sep 21": 33, "Oct 21": 34, "Nov 21": 35, "Dec 21": 36
      };

      array_meses.sort(function (a, b) {
        return monthNames[a] - monthNames[b];
      })

      for (let j = 0; j < array_meses.length; j++) {
        const element = array_meses[j];
        let muestra = obtenerViewValue(element)
        this.periodoRankingMes.push({ viewValue: muestra, value: element });
      }
      this.spinner.hide();

      function obtenerViewValue(elemento) {
        if (elemento == "Jan 19") return "Enero - 2019"
        if (elemento == "Feb 19") return "Febrero - 2019"
        if (elemento == "Mar 19") return "Marzo - 2019"
        if (elemento == "Apr 19") return "Abril - 2019"
        if (elemento == "May 19") return "Mayo - 2019"
        if (elemento == "Jun 19") return "Junio - 2019"
        if (elemento == "Jul 19") return "Julio - 2019"
        if (elemento == "Aug 19") return "Agosto - 2019"
        if (elemento == "Sep 19") return "Septiembre - 2019"
        if (elemento == "Oct 19") return "Octubre - 2019"
        if (elemento == "Nov 19") return "Noviembre - 2019"
        if (elemento == "Dec 19") return "Diciembre - 2019"
        if (elemento == "Jan 20") return "Enero - 2020"
        if (elemento == "Feb 20") return "Febrero - 2020"
        if (elemento == "Mar 20") return "Marzo - 2020"
        if (elemento == "Apr 20") return "Abril - 2020"
        if (elemento == "May 20") return "Mayo - 2020"
        if (elemento == "Jun 20") return "Junio - 2020"
        if (elemento == "Jul 20") return "Julio - 2020"
        if (elemento == "Aug 20") return "Agosto - 2020"
        if (elemento == "Sep 20") return "Septiembre - 2020"
        if (elemento == "Oct 20") return "Octubre - 2020"
        if (elemento == "Nov 20") return "Noviembre - 2020"
        if (elemento == "Dec 20") return "Diciembre - 2020"
        if (elemento == "Jan 21") return "Enero - 2021"
        if (elemento == "Feb 21") return "Febrero - 2021"
        if (elemento == "Mar 21") return "Marzo - 2021"
        if (elemento == "Apr 21") return "Abril - 2021"
        if (elemento == "May 21") return "Mayo - 2021"
        if (elemento == "Jun 21") return "Junio - 2021"
        if (elemento == "Jul 21") return "Julio - 2021"
        if (elemento == "Aug 21") return "Agosto - 2021"
        if (elemento == "Sep 21") return "Septiembre - 2021"
        if (elemento == "Oct 21") return "Octubre - 2021"
        if (elemento == "Nov 21") return "Noviembre - 2021"
        if (elemento == "Dec 21") return "Diciembre - 2021"
      }
    }

    if (periodo == "Por año" && this.nombreEstadisticaSeleccionada == 'Ranking de locatarios mejores puntuados del sitio') {
      this.periodoRankingMesHabilitado = false;
      this.periodoRankingAnioHabilitado = true;

      this.periodoRankingAnio = []

      for (let i = 0; i < this.alquileres.length; i++) {
        const element = this.alquileres[i];
        if (element.puntuacion_propietario_al_locatario_ingresada == true) {
          let fecha = new Date(element.createdAt)
          let año = fecha.getFullYear();
          if (this.periodoRankingAnio.length == 0) {
            this.periodoRankingAnio.push(año)
          } else {
            if (!this.periodoRankingAnio.includes(año)) {
              this.periodoRankingAnio.push(año)
            }
          }
        }
      }

      this.periodoRankingAnio.sort()
      this.spinner.hide();
    }

  }

  calcularPorPeriodoMesRanking(periodo: string, viewValue: string) {
    if (this.nombreEstadisticaSeleccionada == 'Ranking de quienes más publican objetos') {
      let año = obtenerAnio(periodo), mes = obtenerMes(periodo);
      var array_usuarios = [], array_x_mes = [], array_resultado = [];

      for (let i = 0; i < this.publicaciones.length; i++) {
        const element1 = this.publicaciones[i];
        let fecha = new Date(element1.createdAt)
        if (año == fecha.getFullYear() && mes == fecha.getMonth()) {
          for (let j = 0; j < this.usuarios.length; j++) {
            const element2 = this.usuarios[j];
            if (element1.email == element2.email) {
              array_usuarios.push(element2.name);
              break;
            }
          }
        }
      }

      if (array_usuarios.length > 0) {
        for (let index = 0; index < array_usuarios.length; index++) {
          const element1 = array_usuarios[index];
          if (array_x_mes.length == 0) {
            array_x_mes.push([element1, 1])
          } else {
            let indice = -1;
            for (let h = 0; h < array_x_mes.length; h++) {
              const element2 = array_x_mes[h];
              if (element2[0] == element1) {
                indice = h;
                break;
              } else continue;
            }
            if (indice < 0) {
              array_x_mes.push([element1, 1])
            } else {
              array_x_mes[indice][1]++;
            }
          }
        }

        if (array_x_mes.length > 5) {
          array_x_mes.splice(5)
        }

        array_x_mes.sort(function (a, b) {
          return b[1] - a[1];
        });

        for (let i = 0; i < array_x_mes.length; i++) {
          const element = array_x_mes[i];
          array_resultado.push({ label: element[0], value: element[1] })
        }
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de quienes más publican objetos",
          subcaption: viewValue,
          plottooltext: "<b>$label</b> realizó $value publicaciones",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de publicaciones",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    if (this.nombreEstadisticaSeleccionada == 'Ranking de quienes más alquilan objetos') {
      let año = obtenerAnio(periodo), mes = obtenerMes(periodo);
      var array_usuarios = [], array_x_mes = [], array_resultado = [];

      for (let i = 0; i < this.alquileres.length; i++) {
        const element = this.alquileres[i];
        let fecha = new Date(element.createdAt)
        if (año == fecha.getFullYear() && mes == fecha.getMonth()) {
          array_usuarios.push(element.name_usuarioLocatario)
        }
      }

      if (array_usuarios.length > 0) {
        for (let index = 0; index < array_usuarios.length; index++) {
          const element1 = array_usuarios[index];
          if (array_x_mes.length == 0) {
            array_x_mes.push([element1, 1])
          } else {
            let indice = -1;
            for (let h = 0; h < array_x_mes.length; h++) {
              const element2 = array_x_mes[h];
              if (element2[0] == element1) {
                indice = h;
                break;
              } else continue;
            }
            if (indice < 0) {
              array_x_mes.push([element1, 1])
            } else {
              array_x_mes[indice][1]++;
            }
          }
        }

        if (array_x_mes.length > 5) {
          array_x_mes.splice(5)
        }

        array_x_mes.sort(function (a, b) {
          return b[1] - a[1];
        });

        for (let i = 0; i < array_x_mes.length; i++) {
          const element = array_x_mes[i];
          array_resultado.push({ label: element[0], value: element[1] })
        }
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de quienes más alquilan objetos",
          subcaption: viewValue,
          plottooltext: "<b>$label</b> realizó $value alquileres",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de alquileres",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    function obtenerAnio(a: string) {
      if (a.includes('19')) return 2019
      if (a.includes('20')) return 2020
      if (a.includes('21')) return 2021
    }

    function obtenerMes(p: string) {
      if (p.includes('Jan')) return 0
      if (p.includes('Feb')) return 1
      if (p.includes('Mar')) return 2
      if (p.includes('Apr')) return 3
      if (p.includes('May')) return 4
      if (p.includes('Jun')) return 5
      if (p.includes('Jul')) return 6
      if (p.includes('Aug')) return 7
      if (p.includes('Sep')) return 8
      if (p.includes('Oct')) return 9
      if (p.includes('Nov')) return 10
      if (p.includes('Dec')) return 11
    }

    if (this.nombreEstadisticaSeleccionada == 'Ranking de propietarios mejores puntuados del sitio') {
      let año = obtenerAnio(periodo), mes = obtenerMes(periodo), array_sumatorias = [], array_resultado = [];

      for (let i = 0; i < this.alquileres.length; i++) {
        const element1 = this.alquileres[i];
        let existe = false;
        let fecha = new Date(element1.createdAt)
        if (año == fecha.getFullYear() && mes == fecha.getMonth() && element1.puntuacion_locatario_al_propietario_ingresada == true) {
          if (array_sumatorias.length == 0) {
            array_sumatorias.push([element1.name_usuarioPropietario, 1, element1.puntuacion_locatario_al_propietario])
          } else {
            for (let j = 0; j < array_sumatorias.length; j++) {
              const element2 = array_sumatorias[j];
              if (element2.includes(element1.name_usuarioPropietario)) {
                element2[1]++;
                element2[2] += element1.puntuacion_locatario_al_propietario;
                existe = true;
                break;
              }
            }
            if (!existe) {
              array_sumatorias.push([element1.name_usuarioPropietario, 1, element1.puntuacion_locatario_al_propietario])
            }
          }
        }
      }

      if (array_sumatorias.length == 0) {
        this.mostrarGrafico = false;
        this.noHayDatos = true;
      } else {
        if (array_sumatorias.length > 5) {
          array_sumatorias.splice(5)
        }

        array_resultado.sort(function (a, b) {
          return b[2] - a[2];
        })

        for (let i = 0; i < array_sumatorias.length; i++) {
          const element = array_sumatorias[i];
          let promedio = Math.floor(element[2] / element[1]);
          array_resultado.push({ label: element[0], value: promedio })
        }

        this.type = "column2d";
        this.dataFormat = "json";
        this.dataSource = {
          chart: {
            bgColor: "#fafafa",
            showvalues: "1",
            caption: "Ranking de propietarios mejores puntuados del sitio",
            subcaption: viewValue,
            plottooltext: "<b>$label</b> tuvo una puntuación promedio de $value estrellas",
            xaxisname: "Usuarios",
            yaxisname: "Puntuación promedio",
            theme: "fusion"
          },
          data: array_resultado
        };
        this.mostrarGrafico = true;
        this.spinner.hide()
      }
    }

    if (this.nombreEstadisticaSeleccionada == 'Ranking de locatarios mejores puntuados del sitio') {
      let año = obtenerAnio(periodo), mes = obtenerMes(periodo), array_sumatorias = [], array_resultado = [];

      for (let i = 0; i < this.alquileres.length; i++) {
        const element1 = this.alquileres[i];
        let existe = false;
        let fecha = new Date(element1.createdAt)
        if (año == fecha.getFullYear() && mes == fecha.getMonth() && element1.puntuacion_propietario_al_locatario_ingresada == true) {
          if (array_sumatorias.length == 0) {
            array_sumatorias.push([element1.name_usuarioLocatario, 1, element1.puntuacion_propietario_al_locatario])
          } else {
            for (let j = 0; j < array_sumatorias.length; j++) {
              const element2 = array_sumatorias[j];
              if (element2.includes(element1.name_usuarioLocatario)) {
                element2[1]++;
                element2[2] += element1.puntuacion_propietario_al_locatario;
                existe = true;
                break;
              }
            }
            if (!existe) {
              array_sumatorias.push([element1.name_usuarioLocatario, 1, element1.puntuacion_propietario_al_locatario])
            }
          }
        }
      }

      if (array_sumatorias.length == 0) {
        this.mostrarGrafico = false;
        this.noHayDatos = true;
      } else {
        if (array_sumatorias.length > 5) {
          array_sumatorias.splice(5)
        }

        array_resultado.sort(function (a, b) {
          return b[2] - a[2];
        })

        for (let i = 0; i < array_sumatorias.length; i++) {
          const element = array_sumatorias[i];
          let promedio = Math.floor(element[2] / element[1]);
          array_resultado.push({ label: element[0], value: promedio })
        }

        this.type = "column2d";
        this.dataFormat = "json";
        this.dataSource = {
          chart: {
            bgColor: "#fafafa",
            showvalues: "1",
            caption: "Ranking de locatarios mejores puntuados del sitio",
            subcaption: viewValue,
            plottooltext: "<b>$label</b> tuvo una puntuación promedio de $value estrellas",
            xaxisname: "Usuarios",
            yaxisname: "Puntuación promedio",
            theme: "fusion"
          },
          data: array_resultado
        };
        this.mostrarGrafico = true;
        this.spinner.hide()
      }
    }

  }

  calcularPorPeriodoAnioRanking(periodo) {
    if (this.nombreEstadisticaSeleccionada == 'Ranking de quienes más alquilan objetos') {
      let array_usuarios = [], array_x_año = [], array_resultado = [];
      for (let i = 0; i < this.alquileres.length; i++) {
        const element = this.alquileres[i];
        let fecha = new Date(element.createdAt)
        if (periodo == fecha.getFullYear()) {
          array_usuarios.push(element.name_usuarioLocatario)
        }
      }

      if (array_usuarios.length > 0) {
        for (let index = 0; index < array_usuarios.length; index++) {
          const element1 = array_usuarios[index];
          if (array_x_año.length == 0) {
            array_x_año.push([element1, 1])
          } else {
            let indice = -1;
            for (let h = 0; h < array_x_año.length; h++) {
              const element2 = array_x_año[h];
              if (element2[0] == element1) {
                indice = h;
                break;
              } else continue;
            }
            if (indice < 0) {
              array_x_año.push([element1, 1])
            } else {
              array_x_año[indice][1]++;
            }
          }
        }

        if (array_x_año.length > 5) {
          array_x_año.splice(5)
        }

        array_x_año.sort(function (a, b) {
          return b[1] - a[1];
        });

        for (let i = 0; i < array_x_año.length; i++) {
          const element = array_x_año[i];
          array_resultado.push({ label: element[0], value: element[1] })
        }
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de quienes más alquilan objetos por año",
          subcaption: "Año " + periodo,
          plottooltext: "<b>$label</b> realizó $value alquileres",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de alquileres",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    if (this.nombreEstadisticaSeleccionada == 'Ranking de quienes más publican objetos') {
      let array_usuarios = [], array_x_año = [], array_resultado = [];
      for (let i = 0; i < this.publicaciones.length; i++) {
        const element1 = this.publicaciones[i];
        let fecha = new Date(element1.createdAt)
        if (periodo == fecha.getFullYear()) {
          for (let j = 0; j < this.usuarios.length; j++) {
            const element2 = this.usuarios[j];
            if (element1.email == element2.email) {
              array_usuarios.push(element2.name);
              break;
            }
          }
        }
      }

      if (array_usuarios.length > 0) {
        for (let index = 0; index < array_usuarios.length; index++) {
          const element1 = array_usuarios[index];
          if (array_x_año.length == 0) {
            array_x_año.push([element1, 1])
          } else {
            let indice = -1;
            for (let h = 0; h < array_x_año.length; h++) {
              const element2 = array_x_año[h];
              if (element2[0] == element1) {
                indice = h;
                break;
              } else continue;
            }
            if (indice < 0) {
              array_x_año.push([element1, 1])
            } else {
              array_x_año[indice][1]++;
            }
          }
        }

        if (array_x_año.length > 5) {
          array_x_año.splice(5)
        }

        array_x_año.sort(function (a, b) {
          return b[1] - a[1];
        });

        for (let i = 0; i < array_x_año.length; i++) {
          const element = array_x_año[i];
          array_resultado.push({ label: element[0], value: element[1] })
        }
      }

      this.type = "column2d";
      this.dataFormat = "json";
      this.dataSource = {
        chart: {
          bgColor: "#fafafa",
          showvalues: "1",
          caption: "Ranking de quienes más publican objetos por año",
          subcaption: "Año " + periodo,
          plottooltext: "<b>$label</b> realizó $value publicaciones",
          xaxisname: "Usuarios",
          yaxisname: "Cantidad de publicaciones",
          theme: "fusion"
        },
        data: array_resultado
      };
      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    if (this.nombreEstadisticaSeleccionada == 'Ranking de propietarios mejores puntuados del sitio') {
      let array_sumatorias = [], array_resultado = [];

      for (let i = 0; i < this.alquileres.length; i++) {
        const element1 = this.alquileres[i];
        let existe = false;
        let fecha = new Date(element1.createdAt)
        if (periodo == fecha.getFullYear() && element1.puntuacion_locatario_al_propietario_ingresada == true) {
          if (array_sumatorias.length == 0) {
            array_sumatorias.push([element1.name_usuarioPropietario, 1, element1.puntuacion_locatario_al_propietario])
          } else {
            for (let j = 0; j < array_sumatorias.length; j++) {
              const element2 = array_sumatorias[j];
              if (element2.includes(element1.name_usuarioPropietario)) {
                element2[1]++;
                element2[2] += element1.puntuacion_locatario_al_propietario;
                existe = true;
                break;
              }
            }
            if (!existe) {
              array_sumatorias.push([element1.name_usuarioPropietario, 1, element1.puntuacion_locatario_al_propietario])
            }
          }
        }
      }

      if (array_sumatorias.length == 0) {
        this.mostrarGrafico = false;
        this.noHayDatos = true;
      } else {
        if (array_sumatorias.length > 5) {
          array_sumatorias.splice(5)
        }

        array_resultado.sort(function (a, b) {
          return b[2] - a[2];
        })

        for (let i = 0; i < array_sumatorias.length; i++) {
          const element = array_sumatorias[i];
          let promedio = Math.floor(element[2] / element[1]);
          array_resultado.push({ label: element[0], value: promedio })
        }

        this.type = "column2d";
        this.dataFormat = "json";
        this.dataSource = {
          chart: {
            bgColor: "#fafafa",
            showvalues: "1",
            caption: "Ranking de propietarios mejores puntuados del sitio",
            subcaption: "Año " + periodo,
            plottooltext: "<b>$label</b> tuvo una puntuación promedio de $value estrellas",
            xaxisname: "Usuarios",
            yaxisname: "Puntuación promedio",
            theme: "fusion"
          },
          data: array_resultado
        };
        this.mostrarGrafico = true;
        this.spinner.hide()
      }

      this.mostrarGrafico = true;
      this.spinner.hide()
    }

    if (this.nombreEstadisticaSeleccionada == 'Ranking de locatarios mejores puntuados del sitio') {
      let array_sumatorias = [], array_resultado = [];

      for (let i = 0; i < this.alquileres.length; i++) {
        const element1 = this.alquileres[i];
        let existe = false;
        let fecha = new Date(element1.createdAt)
        if (periodo == fecha.getFullYear() && element1.puntuacion_propietario_al_locatario_ingresada == true) {
          if (array_sumatorias.length == 0) {
            array_sumatorias.push([element1.name_usuarioLocatario, 1, element1.puntuacion_propietario_al_locatario])
          } else {
            for (let j = 0; j < array_sumatorias.length; j++) {
              const element2 = array_sumatorias[j];
              if (element2.includes(element1.name_usuarioPropietario)) {
                element2[1]++;
                element2[2] += element1.puntuacion_propietario_al_locatario;
                existe = true;
                break;
              }
            }
            if (!existe) {
              array_sumatorias.push([element1.name_usuarioPropietario, 1, element1.puntuacion_propietario_al_locatario])
            }
          }
        }
      }

      if (array_sumatorias.length == 0) {
        this.mostrarGrafico = false;
        this.noHayDatos = true;
      } else {
        if (array_sumatorias.length > 5) {
          array_sumatorias.splice(5)
        }

        array_resultado.sort(function (a, b) {
          return b[2] - a[2];
        })

        for (let i = 0; i < array_sumatorias.length; i++) {
          const element = array_sumatorias[i];
          let promedio = Math.floor(element[2] / element[1]);
          array_resultado.push({ label: element[0], value: promedio })
        }

        this.type = "column2d";
        this.dataFormat = "json";
        this.dataSource = {
          chart: {
            bgColor: "#fafafa",
            showvalues: "1",
            caption: "Ranking de locatarios mejores puntuados del sitio",
            subcaption: "Año " + periodo,
            plottooltext: "<b>$label</b> tuvo una puntuación promedio de $value estrellas",
            xaxisname: "Usuarios",
            yaxisname: "Puntuación promedio",
            theme: "fusion"
          },
          data: array_resultado
        };
        this.mostrarGrafico = true;
        this.spinner.hide()
      }

      this.mostrarGrafico = true;
      this.spinner.hide()
    }
  }

  obtenerMes(fecha: Date) {
    if ((fecha.getMonth() + 1) == 1) return "Jan";
    if ((fecha.getMonth() + 1) == 2) return "Feb";
    if ((fecha.getMonth() + 1) == 3) return "Mar";
    if ((fecha.getMonth() + 1) == 4) return "Apr";
    if ((fecha.getMonth() + 1) == 5) return "May";
    if ((fecha.getMonth() + 1) == 6) return "Jun";
    if ((fecha.getMonth() + 1) == 7) return "Jul";
    if ((fecha.getMonth() + 1) == 8) return "Aug";
    if ((fecha.getMonth() + 1) == 9) return "Sep";
    if ((fecha.getMonth() + 1) == 10) return "Oct";
    if ((fecha.getMonth() + 1) == 11) return "Nov";
    if ((fecha.getMonth() + 1) == 12) return "Dec";
  }

  obtenerSemana() {
    var week = new Array();
    var fecha = new Date();
    fecha.setDate((fecha.getDate() - fecha.getDay() + 1));
    for (var i = 0; i < 7; i++) {
      week.push(new Date(fecha));
      fecha.setDate(fecha.getDate() + 1);
    }
    return week;
  }

  evitarLog(array: any, array_meses: any) {
    let contador = 0;
    for (let j = 0; j < array.length; j++) {
      const element = array[j];
      if (element.value == 0) {
        contador++;
      }
      if (j == (array.length - 1)) {
        if (contador == array_meses.length) {
          return 0;
        } else {
          return 1;
        }
      }
    }
  }

  usuariosMasivos() {
    console.clear();

    // ULTIMA CARGA REALIZADA
    let array_config = [
      [0, 25, 2019, 7],
      [25, 50, 2019, 8],
      [50, 75, 2019, 9],
      [75, 100, 2019, 10],
      [100, 125, 2019, 11],
      [125, 150, 2020, 0],
      [150, 175, 2020, 1],
      [175, 200, 2020, 2],
      [200, 225, 2020, 3],
      [225, 250, 2020, 4],
      [250, 275, 2020, 5],
      [275, 300, 2020, 6],
      [300, 325, 2020, 7],
      [325, 350, 2020, 8],
      [350, 375, 2020, 9],
      [375, 400, 2020, 10],
      [400, 425, 2020, 11],
      [425, 450, 2021, 0],
      [450, 475, 2021, 1],
      [475, 500, 2021, 2],
      [500, 525, 2021, 3],
      [525, 550, 2021, 4]
    ]

    function random(numbers) {
      return numbers[Math.floor(Math.random() * numbers.length)];
    }

    let array_redes = ['oneuse', 'facebook', 'gmail'];
    let array_completo = [];

    for (let j = 0; j < array_config.length; j++) {
      const element = array_config[j];
      let inicio = element[0]
      let fin = element[1]
      let año = element[2]
      let mes = element[3]
      for (let i = inicio; i < fin; i++) {
        let objeto = {
          name: "",
          email: "",
          password: "$2a$10$l7N8x2nS/WvuqBJOuQBogujE8hx5l6Ov5f6wMfLYeU..HPvXvwsvi",
          tipo: "",
          confirmed: true,
          createdAt: "2019-08-24T20:36:47.812-03:00",
          updatedAt: "2020-04-01T19:43:53.411-03:00",
          __v: 0,
          apellido: "",
          barrio: "Ampliación América",
          calle: "Micalle",
          ciudad: "Cordoba",
          codArea: "351",
          codigoPostal: "5000",
          departamento: "A",
          nombre: "",
          numero: "1234",
          piso: "6",
          provincia: "Cordoba",
          telefono: "6698745",
          removablefile: "sin_imagen.png",
          fecha_nacimiento: "1994-10-04T00:00:00.000-03:00"
        }

        objeto.tipo = undefined;
        objeto.name = "test" + i;
        objeto.email = "test" + i + "@oneuse-test.com"
        while (objeto.tipo == undefined) {
          objeto.tipo = array_redes[random([0, 1, 2])];
        }
        objeto.nombre = "test" + i;
        objeto.apellido = "test" + i;

        let fecha = new Date(objeto.createdAt);
        fecha.setFullYear(año);
        fecha.setMonth(mes);
        fecha.setDate(random([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]))
        objeto.createdAt = fecha.toISOString();
        objeto.updatedAt = fecha.toISOString();

        array_completo.push(objeto);
      }
    }
    let resultado = "db.getCollection('users').insertMany(" + JSON.stringify(array_completo) + ")"
    console.log(resultado)
  }

  alquileresMasivos() {
    let array_repetidos = [], array_resultado = [];
    for (let i = 0; i < 35; i++) {
      let rnd = parseInt(String(Math.random() * 100).slice(0, 1));
      let objeto = this.alquileres[rnd];
      delete objeto._id;
      objeto.createdAt = "2021-04-10T03:29:54.195Z"
      if (array_repetidos.length == 0) {
        array_repetidos.push(rnd);
        array_resultado.push(objeto);
      } else {
        if (array_repetidos.includes(rnd)) {
          continue;
        } else {
          array_resultado.push(this.alquileres[rnd])
        }
      }
    }
    console.clear();
    console.log("db.getCollection('misAlquileres').insertMany(" + JSON.stringify(array_resultado) + ")")
  }

  clicks(tipo) {
    if (tipo == 'Elegir estadística') {
      this.deshabilitarTodo();
    }

    if (tipo == 'Estadística seleccionada') {
      this.estadisticaGeneralSeleccionada = true;
      this.categoriaSeleccionada = 'none';
      this.periodoSeleccionado = 'none'

      if (this.nombreEstadisticaSeleccionada == "Ranking de quienes más alquilan objetos" ||
        this.nombreEstadisticaSeleccionada == "Ranking de quienes más publican objetos" ||
        this.nombreEstadisticaSeleccionada == 'Ranking de propietarios mejores puntuados del sitio' ||
        this.nombreEstadisticaSeleccionada == 'Ranking de locatarios mejores puntuados del sitio') {
        this.periodoDiaMesAnio = false;
      } else {
        this.periodoDiaMesAnio = true;
      }

      if (this.nombreEstadisticaSeleccionada == 'Cantidad de visitantes al sitio') {
        this.estadisticaGeneralSeleccionada = false;
        this.periodoRankingMesHabilitado = false;
        this.periodoRankingAnioHabilitado = false;
      }

      if (!this.publicacionesSubcategoriaSeleccionada && !this.alquileresSubcategoriaSeleccionada) {
        this.deshabilitarPeriodo = false;
      } else {
        if (this.publicacionesSubcategoriaSeleccionada || this.alquileresSubcategoriaSeleccionada) {
          this.deshabilitarPeriodo = true;
        }
      }
    }

    if (tipo == 'Elegir categoría') {
      this.mostrarGrafico = false;
      this.periodoSeleccionado = 'none';
      this.deshabilitarPeriodo = true
    }

    if (tipo == 'Categoria seleccionada') {
      this.periodoSeleccionado = 'none';
      this.deshabilitarPeriodo = false
    }

    if (tipo == 'Elegir período') {
      this.periodoRankingMesSeleccionado = 'none';
      this.periodoRankingMesHabilitado = false;
      if (this.nombreEstadisticaSeleccionada != undefined && (!this.publicacionesSubcategoriaSeleccionada || !this.alquileresSubcategoriaSeleccionada)) {
        this.estadisticaSeleccionada(this.nombreEstadisticaSeleccionada)
      } else {
        if (this.publicacionesSubcategoriaSeleccionada) {
          this.subcategoriaSeleccionada('alquileres', this.categoriaSeleccionada)
        } else {
          if (this.alquileresSubcategoriaSeleccionada) {
            this.subcategoriaSeleccionada('publicaciones', this.categoriaSeleccionada)
          } else {
            this.mostrarGrafico = false;
          }
        }
      }
    }

    if (tipo == 'Elegir período mes ranking') {
      this.estadisticaSeleccionada('Ranking de quienes más alquilan objetos')
    }

    if (tipo == 'Elegir período anio ranking') {
      this.estadisticaSeleccionada('Ranking de quienes más alquilan objetos')
    }
  }


}

