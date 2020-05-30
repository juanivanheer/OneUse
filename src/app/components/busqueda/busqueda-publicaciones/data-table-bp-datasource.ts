import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface BusquedaPalabra {
    titulo: string,
    preciodia: string,
    _id: string
    categoria: string,
    multiplefile: string,
    subcategoria: string, 
}

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableBusquedaPalabra extends DataSource<BusquedaPalabra> {

    data: BusquedaPalabra[];

    imagen;
    publicacion = [];
    imagenJSON;
    arrayJSON = [];
    arrayImagen = [];

    constructor(private paginator: MatPaginator, private sort: MatSort, private busqueda: BusquedaPalabra[]) {
        super();
        for (let i = 0; i < this.busqueda.length; i++) {
            this.imagen = this.busqueda[i].multiplefile;
            this.imagenJSON = JSON.parse(this.imagen); //CREA JSON CONVERTIDO DE STRING
            for (let j in this.imagenJSON) {
                this.arrayJSON.push(this.imagenJSON[j]);
            }
            this.busqueda[i].multiplefile = this.arrayJSON[0];
            this.arrayJSON = [];
        }
        
        this.data = this.busqueda;
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<BusquedaPalabra[]> {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            observableOf(this.data),
            this.paginator.page,
            this.sort.sortChange
        ];

        // Set the paginators length
        this.paginator.length = this.data.length;

        return merge(...dataMutations).pipe(map(() => {
            return this.getPagedData([...this.data]);
        }));
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect() { }

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: BusquedaPalabra[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}