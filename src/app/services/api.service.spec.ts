import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { ApiResponse } from '../models/api-response';
import { Person } from '../models/person';
import { ElementResponse } from '../models/element.response';
import { PersonResult } from '../models/person-result';
import { Starship } from '../models/starship';
import { StarshipResult } from '../models/starship.result';

describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        service = TestBed.inject(ApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch people', () => {
        const dummyPeopleList = [{ name: 'Luke Skywalker' }];

        service.getPeople().subscribe((res: any) => {
            expect(res).toEqual(dummyPeopleList);
        });

        const req = httpMock.expectOne(
            `https://www.swapi.tech/api/people`,
        );

        expect(req.request.method).toBe('GET');
        req.flush(dummyPeopleList);
    });

    it('should fetch starships', () => {
        const dummyStarshipsList = [{ name: 'X-wing' }];

        service.getStarships().subscribe((starshipsList: any) => {
            expect(starshipsList).toEqual(dummyStarshipsList);
        });

        const req = httpMock.expectOne(
            `https://www.swapi.tech/api/starships`,
        );

        expect(req.request.method).toBe('GET');
        req.flush(dummyStarshipsList);
    })

    it('should fetch a person by URL', () => {
        const dummyPerson = { result: { properties: { name: 'Luke Skywalker' } } };
        const url = 'https://www.swapi.tech/api/people/1';

        service.getPerson(url).subscribe((res) => {
            expect(res.result.properties.name).toBe('Luke Skywalker');
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(dummyPerson);
    });


    it('should fetch a starship by URL', () => {
        const dummyStarship = { result: { properties: { model: 'Millennium Falcon' } } };
        const url = 'https://www.swapi.tech/api/starships/10';

        service.getStarship(url).subscribe((res) => {
            expect(res.result.properties.model).toBe('Millennium Falcon');
        });

        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        req.flush(dummyStarship);
    });
});