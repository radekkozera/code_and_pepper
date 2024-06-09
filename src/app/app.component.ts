import { Component, OnInit } from '@angular/core';
import { NgParticlesService } from '@tsparticles/angular';
import { loadSlim } from '@tsparticles/slim';
import { particlesOptions } from './helpers/particles';
import { Engine } from '@tsparticles/engine';
import { Observable, delay, forkJoin, map, switchMap, tap } from 'rxjs';
import { ApiService } from './services/api.service';
import { GameType } from './helpers/game-types';
import { StarshipResult } from './models/starship.result';
import { PersonResult } from './models/person-result';
import { ApiResponse } from './models/api-response';
import { Person } from './models/person';
import { Starship } from './models/starship';
import { ElementResponse } from './models/element.response';
import { StateService } from './services/state.service';
import { MatDialog } from '@angular/material/dialog';
import { GameFinishModalComponent } from './components/game-finish/game-finish-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public gameType$: Observable<GameType>;
  public isGameInProgress$: Observable<boolean>;
  public isPlayerOneWinner$: Observable<boolean>;
  public isPlayerTwoWinner$: Observable<boolean>;
  public showStart$: Observable<boolean>;

  public isCardsVisible: boolean = false;
  public particlesOptions: any = particlesOptions;

  public playerOnePerson?: PersonResult = undefined;
  public playerTwoPerson?: PersonResult = undefined;

  public playerOneStarship?: StarshipResult = undefined;
  public playerTwoStarship?: StarshipResult = undefined;

  public isDraw: boolean = false;

  public readonly GameType = GameType;

  constructor(private _particlesService: NgParticlesService,
    private _apiService: ApiService, private _appState: StateService, private _dialog: MatDialog) {

    this.gameType$ = this._appState.gameState$;
    this.isGameInProgress$ = this._appState.isGameInProgress$;
    this.isPlayerOneWinner$ = this._appState.isPlayerOneWinner$;
    this.isPlayerTwoWinner$ = this._appState.isPlayerTwoWinner$;
    this.showStart$ = this._appState.showStart$;
  }


  ngOnInit(): void {
    this._loadParticles();
  }


  private _loadParticles(): void {
    this._particlesService.init(async (engine: Engine) => {
      await loadSlim(engine)
    })
  }


  public showCards(): void {
    this.isCardsVisible = !this.isCardsVisible;
  }

  public playGame(gameType: GameType): void {
    this._resetGame();
    this._getElements(gameType).pipe(
      map((response: ApiResponse<Person | Starship>) => this._getRandomElements(response.results)),
      switchMap((result: Person[] | Starship[]) => forkJoin(result.map((element: Person | Starship) => this._getElement(gameType, element.url)))
      ),
      tap(([playerOne, playerTwo]) => {
        this._determineWinner(gameType, playerOne.result, playerTwo.result
        );
        this._appState.isGameInProgress$.next(true);
      }),
      delay(2500),
      tap(() => this.openModal())
    ).subscribe()
  }

  private _getElements(gameType: GameType): Observable<ApiResponse<Person | Starship>> {
    return gameType === GameType.PEOPLE ? this._apiService.getPeople() : this._apiService.getStarships();
  }

  private _getElement(gameType: GameType, url: string): Observable<ElementResponse<PersonResult | StarshipResult>> {
    return gameType === GameType.PEOPLE ? this._apiService.getPerson(url) : this._apiService.getStarship(url);
  }

  private _getRandomElements<T>(array: T[]): T[] {
    return (array.sort(() => Math.random() - 0.5)).slice(0, 2);
  }

  private _determineWinner(gameType: GameType, playerOne: PersonResult | StarshipResult, playerTwo: PersonResult | StarshipResult): void {
    if (gameType === GameType.PEOPLE) {
      this._determineWinnerPeople(playerOne as PersonResult, playerTwo as PersonResult);
    } else {
      this._determineWinnerStarships(playerOne as StarshipResult, playerTwo as StarshipResult);
    }
  }

  private _determineWinnerPeople(playerOne: PersonResult, playerTwo: PersonResult): void {
    this.playerOnePerson = playerOne;
    this.playerTwoPerson = playerTwo;

    if (Number(playerOne.properties.mass) > Number(playerTwo.properties.mass)) {
      this._appState.playerOneScore$.next(this._appState.playerTwoScore$.value + 1);
      this._appState.isPlayerOneWinner$.next(true);
      this._appState.isPlayerTwoWinner$.next(false);
    } else if (Number(playerOne.properties.mass) < Number(playerTwo.properties.mass)) {
      this._appState.playerTwoScore$.next(this._appState.playerTwoScore$.value + 1);
      this._appState.isPlayerTwoWinner$.next(true);
      this._appState.isPlayerOneWinner$.next(false);
    } else {
      this._appState.isPlayerTwoWinner$.next(false);
      this._appState.isPlayerOneWinner$.next(false);
    }

  }

  private _determineWinnerStarships(playerOne: StarshipResult, playerTwo: StarshipResult): void {
    this.playerOneStarship = playerOne;
    this.playerTwoStarship = playerTwo;

    if (this.parseCrew(playerOne.properties.crew) > this.parseCrew(playerTwo.properties.crew)) {
      this._appState.playerOneScore$.next(this._appState.playerOneScore$.value + 1);
      this._appState.isPlayerOneWinner$.next(true);
      this._appState.isPlayerTwoWinner$.next(false);
    } else if (this.parseCrew(playerOne.properties.crew) < this.parseCrew(playerTwo.properties.crew)) {
      this._appState.playerTwoScore$.next(this._appState.playerTwoScore$.value + 1);
      this._appState.isPlayerTwoWinner$.next(true);
      this._appState.isPlayerOneWinner$.next(false);
    } else {
      this._appState.isPlayerTwoWinner$.next(false);
      this._appState.isPlayerOneWinner$.next(false);
    }
  }

  openModal(): void {
    this._dialog.open(GameFinishModalComponent, {
      height: "200px",
      width: "350px",
      position: {
        top: '100px'
      },
      disableClose: true,
    }).afterClosed().pipe(
      delay(3000)
    ).subscribe(() => {
      this._appState.showStart$.next(true);

    })
  }

  private _resetGame(): void {
    this._appState.showStart$.next(false);
    this._appState.isPlayerOneWinner$.next(false);
    this._appState.isPlayerTwoWinner$.next(false);
    this.playerOnePerson = undefined;
    this.playerTwoPerson = undefined;
    this.playerOneStarship = undefined;
    this.playerTwoStarship = undefined;
  }


  private parseCrew(s: string): number {
    if (s.includes('-')) {
      const [start, end] = s.split('-').map(Number);
      return (start + end) / 2;
    } else if (s.includes(',')) {
      return s.split(',').map(Number).reduce((a, b) => a + b, 0);
    } else {
      return Number(s);
    }
  }


}
