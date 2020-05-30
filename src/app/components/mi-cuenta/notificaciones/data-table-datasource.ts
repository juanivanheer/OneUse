import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface Notificaciones {
    _id: string;
    id_publicacion: string;
    titulo: string;
    name_origen: string;
    name_destino: string;
    tipo: string;
    mensaje_notificacion: string;
    visto: string;
    multiplefile: string;
    titulo_publicacion: string;
    createdAt: string;
}

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<Notificaciones> {
    data: Notificaciones[];


    constructor(private paginator: MatPaginator, private sort: MatSort, private notificaciones: Notificaciones[], private array: Array<any>, private arrayTitulo: Array<any>, private arrayFechas: Array<any>) {
        super();
        for (let i = 0; i < this.notificaciones.length; i++) {
            this.notificaciones[i].multiplefile = this.array[i];
            this.notificaciones[i].titulo_publicacion = this.arrayTitulo[i];
            this.notificaciones[i].createdAt = this.arrayFechas[i];
        }
        this.data = this.notificaciones;
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable<Notificaciones[]> {
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
    private getPagedData(data: Notificaciones[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}