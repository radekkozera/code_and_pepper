import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResponse } from "../models/api-response";
import { PersonResult } from "../models/person-result";
import { ElementResponse } from "../models/element.response";
import { StarshipResult } from "../models/starship.result";
import { Person } from "../models/person";
import { Starship } from "../models/starship";

@Injectable({ providedIn: 'root' })
export class ApiService {
    private _url = 'https://www.swapi.tech/api/'

    constructor(private _http: HttpClient) { }

    public getPeople(): Observable<ApiResponse<Person>> {
        return this._http.get<ApiResponse<Person>>(`${this._url}people`)
    }

    public getPerson(url: string): Observable<ElementResponse<PersonResult>> {
        return this._http.get<ElementResponse<PersonResult>>(url)
    }

    public getStarships(): Observable<ApiResponse<Starship>> {
        return this._http.get<ApiResponse<Starship>>(`${this._url}starships`)

    }

    public getStarship(url: string): Observable<ElementResponse<StarshipResult>> {
        return this._http.get<ElementResponse<StarshipResult>>(url)
    }



}