import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { SingletonService } from 'src/app/components/singleton.service';

@Component({
  selector: "app-estadisticas",
  templateUrl: "./estadisticas.component.html",
  styleUrls: ["./estadisticas.component.css"],
})
export class EstadisticasComponent implements OnInit {
  constructor(private _auth: AuthService, private singleton: SingletonService) { }

  array_completo = [];
  arrayPublicacionesCategorias = [];
  objetoSubcategorias = {};
  mostrarGrafico = false;
  publicacionesCategoriasSeleccionada = false;
  categoriaSeleccionada

  width = 900;
  height = 700;
  type;
  dataFormat = "json";
  dataSource;
  selected;

  hogar: number = 0
  deporte: number = 0
  musica: number = 0
  tecnologia: number = 0
  mascotas: number = 0
  libros: number = 0
  belleza: number = 0
  bebes: number = 0
  herramientas: number = 0
  otros: number = 0

  tv_audio_video: number = 0
  celulares_tablets: number = 0
  computadoras: number = 0
  notebooks: number = 0
  videojuegos: number = 0
  consolas: number = 0
  camaras_y_accesorios: number = 0

  accesorios_hogar: number = 0
  decoracion: number = 0
  electrodomesticos: number = 0
  muebles: number = 0
  jardin: number = 0

  aerobics_y_fitness: number = 0
  bicicletas_y_ciclismo: number = 0
  camping_y_pesca: number = 0
  deportes_acuaticos: number = 0
  futbol: number = 0
  otros_deportes: number = 0

  arte_y_antiguedades: number = 0
  cds_dvds: number = 0
  instrumentos_musicales: number = 0
  libros_y_revistas: number = 0

  relojes_joyas_accesorios: number = 0
  ropa_y_calzado: number = 0
  salud_y_belleza: number = 0

  cunas_accesorios: number = 0
  juegos_juguetes: number = 0
  ropa_bebés_y_niños: number = 0

  accesorios_para_perros: number = 0
  accesorios_para_gatos: number = 0
  otros_mascotas: number = 0

  industria: number = 0
  repuestos: number = 0
  muebles_para_negocios_oficinas: number = 0

  novela: number = 0
  gotico: number = 0
  ciencia_ficcion: number = 0
  cuento_de_hadas: number = 0
  accion: number = 0
  drama: number = 0
  suspenso: number = 0
  terror: number = 0
  fantastica: number = 0

  otra_categoria: number = 0

  estadisticas: string[] = [
    "Cantidad de alquileres según categoría",
    "Cantidad de ingresos monetarios al sitio por mes",
    "Cantidad de publicaciones dadas de baja por infringir los términos y condiciones",
    "Cantidad de publicaciones según categoría",
    "Cantidad de visitantes al sitio en un periodo de tiempo",
    "Objetos más alquilados por propietario",
    "Usuarios que más alquilan objetos",
    "Usuarios que más publican en un periodo de tiempo",
    "Usuarios mejores puntuados del sitio por tipo (publicador/locatario)",
  ];

  seleccionada: string[] = [];

  ngOnInit() {
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  deshabilitarEncuestas() {
    this.publicacionesCategoriasSeleccionada = false;
    this.arrayPublicacionesCategorias = []
    this.mostrarGrafico = false;
    this.seleccionada = []
  }

  deshabilitarPublicacionesCategorias() {
    this.clickSelectEncuesta();
  }

  clickSelectEncuesta() {
    if (this.selected == "Cantidad de publicaciones según categoría") {
      this.seleccionadoPublicacionesCategorias();
      this.publicacionesCategoriasSeleccionada = true;
      this.seleccionada = ["Tecnologia", "Hogar", "Deportes", "Musica", "Belleza", "Bebes", "Mascotas", "Herramientas", "Libros", "Otros"]
    }
  }


  clickSelectSubEncuesta() {
    //this.mostrarGrafico = false;
    if (this.categoriaSeleccionada != undefined) {
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
          caption: "Cantidad de publicaciones según la categoría " + this.categoriaSeleccionada,
          yaxisname: "Cantidad de publicaciones",
          aligncaptionwithcanvas: "0",
          plottooltext: "<b>$dataValue</b> publicaciones",
          theme: "fusion"
        },
        data: this.objetoSubcategorias
      }
    }

  }

  seleccionadoPublicacionesCategorias() {
    this.arrayPublicacionesCategorias = [];
    this._auth.get_estadistica_publicaciones_categorias().subscribe(
      res => {
        //console.log(res);
        for (let index = 0; index < res.length; index++) {

          const p = res[index];

          if (p.categoria == "Tecnologia") {
            this.tecnologia++;
            if (p.subcategoria == "TV - Audio - Video") {
              this.tv_audio_video++;
            }
            if (p.subcategoria == "Celulares - Tablets") {
              this.celulares_tablets++;
            }
            if (p.subcategoria == "Computadoras") {
              this.computadoras++;
            }
            if (p.subcategoria == "Notebooks") {
              this.notebooks++;
            }
            if (p.subcategoria == "Videojuegos") {
              this.videojuegos++;
            }
            if (p.subcategoria == "Consolas") {
              this.consolas++;
            }
            if (p.subcategoria == "Cámaras y accesorios") {
              this.camaras_y_accesorios++;
            }
          }

          if (p.categoria == "Hogar") {
            this.hogar++;
            if (p.subcategoria == "Accesorios (Hogar)") {
              this.accesorios_hogar++;
            }
            if (p.subcategoria == "Decoración") {
              this.decoracion++;
            }
            if (p.subcategoria == "Electrodomésticos") {
              this.electrodomesticos++;
            }
            if (p.subcategoria == "Muebles") {
              this.muebles++;
            }
            if (p.subcategoria == "Jardin") {
              this.jardin++;
            }
          }

          if (p.categoria == "Deporte") {
            this.deporte++;
            if (p.subcategoria == "Aerobics y fitness") {
              this.aerobics_y_fitness++;
            }
            if (p.subcategoria == "Bicicletas y ciclismo") {
              this.bicicletas_y_ciclismo++;
            }
            if (p.subcategoria == "Camping y pesca") {
              this.camping_y_pesca++;
            }
            if (p.subcategoria == "Deportes acuaticos") {
              this.deportes_acuaticos++;
            }
            if (p.subcategoria == "Futbol") {
              this.futbol++;
            }
            if (p.subcategoria == "Otros deportes") {
              this.otros_deportes++;
            }
          }

          if (p.categoria == "Musica") {
            this.musica++;
            if (p.subcategoria == "Arte y antiguedades") {
              this.arte_y_antiguedades++;
            }
            if (p.subcategoria == "CDs - DVDs") {
              this.cds_dvds++;
            }
            if (p.subcategoria == "Instrumentos musicales") {
              this.instrumentos_musicales++;
            }
            if (p.subcategoria == "Libros y revistas") {
              this.libros_y_revistas++;
            }
          }

          if (p.categoria == "Belleza") {
            this.belleza++;
            if (p.subcategoria == "Relojes - joyas - accesorios") {
              this.relojes_joyas_accesorios++;
            }
            if (p.subcategoria == "Ropa y calzado") {
              this.ropa_y_calzado++;
            }
            if (p.subcategoria == "Salud y belleza") {
              this.salud_y_belleza++;
            }
          }


          if (p.categoria == "Bebes") {
            this.bebes++;
            if (p.subcategoria == "Cunas - Accesorios") {
              this.cunas_accesorios++;
            }
            if (p.subcategoria == "Juegos - juguetes") {
              this.juegos_juguetes++;
            }
            if (p.subcategoria == "Ropa bebés y niños") {
              this.ropa_bebés_y_niños++;
            }
          }

          if (p.categoria == "Mascotas") {
            this.mascotas++;
            if (p.subcategoria == "Accesorios para perros") {
              this.accesorios_para_perros++;
            }
            if (p.subcategoria == "Accesorios para gatos") {
              this.accesorios_para_gatos++;
            }
            if (p.subcategoria == "Otros (mascotas)") {
              this.otros_mascotas++;
            }
          }

          if (p.categoria == "Herramientas") {
            this.herramientas++;
            if (p.subcategoria == "Industria") {
              this.industria++;
            }
            if (p.subcategoria == "Repuestos") {
              this.repuestos++;
            }
            if (p.subcategoria == "Muebles para negocios - oficinas") {
              this.muebles_para_negocios_oficinas++;
            }
          }

          if (p.categoria == "Libros") {
            this.libros++;
            if (p.subcategoria == "Novela") {
              this.novela++;
            }
            if (p.subcategoria == "Gótico") {
              this.gotico++;
            }
            if (p.subcategoria == "Ciencia Ficción") {
              this.ciencia_ficcion++;
            }
            if (p.subcategoria == "Cuento de hadas") {
              this.cuento_de_hadas++;
            }
            if (p.subcategoria == "Acción") {
              this.accion++;
            }
            if (p.subcategoria == "Drama") {
              this.drama++;
            }
            if (p.subcategoria == "Suspenso") {
              this.suspenso++;
            }
            if (p.subcategoria == "Terror") {
              this.terror++;
            }
            if (p.subcategoria == "Fantástica") {
              this.fantastica++;
            }
          }

          if (p.categoria == "Otros") {
            this.otros++;
            if (p.subcategoria == "Otra categoria") {
              this.otra_categoria++;
            }
          }
        }

        this.array_completo = [
          {
            categoria: 'Tecnologia', value: this.tecnologia, subcategorias: [
              { label: 'TV - Audio - Video', value: this.tv_audio_video },
              { label: 'Celulares - Tablets', value: this.celulares_tablets },
              { label: 'Computadoras', value: this.computadoras },
              { label: 'Notebooks', value: this.notebooks },
              { label: 'Videojuegos', value: this.videojuegos },
              { label: 'Consolas', value: this.consolas },
              { label: 'Cámaras y accesorios', value: this.camaras_y_accesorios }
            ]
          },
          {
            categoria: 'Hogar', value: this.hogar, subcategorias: [
              { label: 'Accesorios (Hogar)', value: this.accesorios_hogar },
              { label: 'Decoración', value: this.decoracion },
              { label: 'Electrodomésticos', value: this.electrodomesticos },
              { label: 'Muebles', value: this.muebles },
              { label: 'Jardin', value: this.jardin },
            ]
          },
          {
            categoria: 'Deportes', value: this.deporte, subcategorias: [
              { label: 'Aerobics y fitness', value: this.aerobics_y_fitness },
              { label: 'Bicicletas y ciclismo', value: this.bicicletas_y_ciclismo },
              { label: 'Camping y pesca', value: this.camping_y_pesca },
              { label: 'Deportes acuaticos', value: this.deportes_acuaticos },
              { label: 'Futbol', value: this.futbol },
              { label: 'Otros deportes', value: this.otros_deportes }
            ]
          },
          {
            categoria: 'Musica', value: this.musica, subcategorias: [
              { label: 'Arte y antiguedades', value: this.arte_y_antiguedades },
              { label: 'CDs - DVDs', value: this.cds_dvds },
              { label: 'Instrumentos musicales', value: this.instrumentos_musicales },
              { label: 'Libros y revistas', value: this.libros_y_revistas },
            ]
          },
          {
            categoria: 'Belleza', value: this.belleza, subcategorias: [
              { label: 'Relojes - joyas - accesorios', value: this.relojes_joyas_accesorios },
              { label: 'Ropa y calzado', value: this.ropa_y_calzado },
              { label: 'Salud y belleza', value: this.salud_y_belleza }
            ]
          },
          {
            categoria: 'Bebes', value: this.bebes, subcategorias: [
              { label: 'Cunas - Accesorios', value: this.cunas_accesorios },
              { label: 'Juegos - juguetes', value: this.juegos_juguetes },
              { label: 'Ropa bebés y niños', value: this.ropa_bebés_y_niños }
            ]
          },
          {
            categoria: 'Mascotas', value: this.mascotas, subcategorias: [
              { label: 'Accesorios para perros', value: this.accesorios_para_perros },
              { label: 'Accesorios para gatos', value: this.accesorios_para_gatos },
              { label: 'Otros (mascotas)', value: this.otros_mascotas }
            ]
          },
          {
            categoria: 'Herramientas', value: this.herramientas, subcategorias: [
              { label: 'Industria', value: this.industria },
              { label: 'Repuestos', value: this.repuestos },
              { label: 'Muebles para negocios - oficinas', value: this.muebles_para_negocios_oficinas }
            ]
          },
          {
            categoria: 'Libros', value: this.libros, subcategorias: [
              { label: 'Novela', value: this.novela },
              { label: 'Gótico', value: this.gotico },
              { label: 'Ciencia Ficción', value: this.ciencia_ficcion },
              { label: 'Cuento de hadas', value: this.cuento_de_hadas },
              { label: 'Acción', value: this.accion },
              { label: 'Drama', value: this.drama },
              { label: 'Suspenso', value: this.suspenso },
              { label: 'Terror', value: this.terror },
              { label: 'Fantástica', value: this.fantastica },
            ]
          },
          {
            categoria: 'Otros', value: this.otros, subcategorias: [
              { label: 'Otra categoria', value: this.otra_categoria },
            ]
          },
        ]

        for (let index = 0; index < this.array_completo.length; index++) {
          const element = this.array_completo[index];
          this.arrayPublicacionesCategorias.push({ label: element.categoria, value: element.value })
        }

        //CONFIGURACIÓN DE LA ENCUESTA
        this.type = "doughnut2d";

        this.dataSource = {
          chart: {
            caption: "Cantidad de publicaciones según categoría",
            subcaption: "Sin tener en cuenta las subcategorías",
            showpercentvalues: "1",
            defaultcenterlabel: "Publicaciones por categorías",
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
      }
    )
  }
}
