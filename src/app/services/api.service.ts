import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PersonSummary } from "../models/person-summary";

@Injectable({ providedIn: 'root' })
export class ApiService {
    private _url = 'https://www.swapi.tech/api/'

    constructor(private _http: HttpClient) { }

    public getPeople(): Observable<any> {
        return this._http.get<any>(`${this._url}people`)
    }

    public getPerson(url: string): Observable<any> {
        console.log(url)
        return this._http.get<any>(url)
    }



}