import { Component, OnInit } from '@angular/core';
import { NgParticlesService } from '@tsparticles/angular';
import { loadSlim } from '@tsparticles/slim';
import { particlesOptions } from './helpers/particles';
import { Engine } from '@tsparticles/engine';
import { Observable, Subject, forkJoin, map, switchMap, tap } from 'rxjs';
import { ApiService } from './services/api.service';
import { GameType } from './helpers/game-types';
import { StarshipResult } from './models/starship.result';
import { PersonResult } from './models/person-result';
import { ApiResponse } from './models/api-response';
import { Person } from './models/person';
import { Starship } from './models/starship';
import { ElementResponse } from './models/element.response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoading$: Subject<boolean> = new Subject<boolean>();

  title = 'code_and_pepper';
  public isCardsVisible: boolean = false;
  public selectedGameType?: GameType = GameType.ROCKETS;
  public particlesOptions: any = particlesOptions;
  public gameType = GameType;

  public playerOne?: PersonResult | StarshipResult = undefined;
  public playerTwo?: PersonResult | StarshipResult = undefined;

  public playerOneScore: number = 0;
  public playerTwoScore: number = 0;

  public isPlayerOneWinner: boolean = false;
  public isPlayerTwoWinner: boolean = false;
  public isDraw: boolean = false;

  constructor(private _particlesService: NgParticlesService, private _apiService: ApiService) { }


  ngOnInit(): void {
    this._loadParticles();
  }


  private _loadParticles(): void {
    this._particlesService.init(async (engine: Engine) => {
      await loadSlim(engine)
    })
  }

  public setGameType(gameType: GameType): void {
    this.selectedGameType = gameType;
  }

  public showCards(): void {
    this.isCardsVisible = !this.isCardsVisible;
  }

  public playGame(): void {
    this._getElements().pipe(
      map((response: ApiResponse<Person | Starship>) => this._getRandomElements(response.results)),
      switchMap((result: Person[] | Starship[]) => forkJoin(result.map((element: Person | Starship) => this._getElement(element.url)))
      ),
      tap(([playerOne, playerTwo]) => {
        this._determineWinner(playerOne.result, playerTwo.result);
        this.toggleCardsVisibility();
      })
    ).subscribe()
  }

  private _getElements(): Observable<ApiResponse<Person | Starship>> {
    return this.selectedGameType === GameType.PEOPLE ? this._apiService.getPeople() : this._apiService.getStarships();
  }

  private _getElement(url: string): Observable<ElementResponse<PersonResult | StarshipResult>> {
    return this.selectedGameType === GameType.PEOPLE ? this._apiService.getPerson(url) : this._apiService.getStarship(url);
  }

  private _getRandomElements<T>(array: T[]): T[] {
    return (array.sort(() => Math.random() - 0.5)).slice(0, 2);
  }

  private _determineWinner(playerOne: PersonResult | StarshipResult, playerTwo: PersonResult | StarshipResult): any {

    this.playerOne = playerOne;
    this.playerTwo = playerTwo;


    // const playerOneMass = +playerOne.properties.mass;
    // const playerTwoMass = +playerTwo.properties.mass;

    // this.isPlayerOneWinner = playerOneMass > playerTwoMass;
    // this.isPlayerTwoWinner = playerOneMass < playerTwoMass;
    // this.isDraw = playerOneMass === playerTwoMass;
  }

  public toggleCardsVisibility(): void {
    this.isCardsVisible = !this.isCardsVisible;
  }




}
