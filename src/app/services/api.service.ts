import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PersonSummary } from "../models/person-summary";

@Injectable({ providedIn: 'root' })
export class ApiService {
    private _url = 'https://www.swapi.tech/api/'

    constructor(private _http: HttpClient) { }

    public getPeople(): Observable<PersonSummary> {
        return this._http.get<PersonSummary>(`${this._url}people`)
    }



}