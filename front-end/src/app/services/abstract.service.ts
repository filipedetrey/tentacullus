import { Abstrata } from "../models/abstrata";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http"
import { global } from '../consts/global.const'
import { Paginate } from "../models/paginate"
import { ListaAbstrata } from "../models/listaAbstrata"

export abstract class AbstractService<D extends Abstrata> {

    constructor(readonly service: string, protected http: HttpClient) { }

    public getAll(options: Paginate = {}): Observable<ListaAbstrata<D>> {
        let params: string = "?"

        if (options.paginate)
            params += "paginate=" + options.paginate + "&"

        if (options.page)
            params += "page=" + options.page + "&"

        if (options.pageSize)
            params += "pageSize=" + options.pageSize + "&"


        return this.http.get<ListaAbstrata<D>>(`${global.url}${this.service}${params}`)
    }

    public get(id: string): Observable<D> {
        return this.http.get<D>(`${global.url}${this.service}/${id}`)
    }

    public post(params: D): Observable<D> {
        return this.http.post<D>(`${global.url}${this.service}`, params)
    }

    public put(id: string, params: D): Observable<D> {
        return this.http.put<D>(`${global.url}${this.service}/${id}`, params)
    }

    public patch(id: string, params: D): Observable<D> {
        return this.http.patch<D>(`${global.url}${this.service}/${id}`, params)
    }

    public delete(id: string): Observable<{ status: string }> {
        return this.http.delete<{ status: string }>(`${global.url}${this.service}/${id}`)
    }

}