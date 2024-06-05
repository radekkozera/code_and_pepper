import { Component, OnInit } from '@angular/core';
import { NgParticlesService } from '@tsparticles/angular';
import { loadSlim } from '@tsparticles/slim';
import { particlesOptions } from './helpers/particles';
import { Engine } from '@tsparticles/engine';
import { Observable, Subject, forkJoin, map, switchMap, tap } from 'rxjs';
import { PersonSummary } from './models/person-summary';
import { ApiService } from './services/api.service';
import { GameType } from './helpers/game-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public isLoading$: Subject<boolean> = new Subject<boolean>();

  title = 'code_and_pepper';
  public isCardsVisible: boolean = false;
  public selectedGameType?: GameType = undefined;
  public particlesOptions: any = particlesOptions;
  public gameType = GameType;

  public playerOne?: any = undefined;
  public playerTwo?: any = undefined;

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
    this._apiService.getPeople().pipe(
      map((people: any) => this._getRandomElements(people.results)),
      switchMap((people: any) => forkJoin(people.map((person: any) => this._apiService.getPerson(person.url)))
      ),
      tap(([playerOne, playerTwo]: any) => {
        this.playerOne = playerOne;
        this.playerTwo = playerTwo;
        this._determineWinner(playerOne, playerTwo);
        this.toggleCardsVisibility();
      })
    ).subscribe()
  }

  private _getRandomElements(array: any[]): any[] {
    return (array.sort(() => Math.random() - 0.5)).slice(0, 2);
  }

  private _determineWinner(playerOne: any, playerTwo: any): any {
    const playerOneMass = +playerOne.result.properties.mass;
    const playerTwoMass = +playerTwo.result.properties.mass;

    this.isPlayerOneWinner = playerOneMass > playerTwoMass;
    this.isPlayerTwoWinner = playerOneMass < playerTwoMass;
    this.isDraw = playerOneMass === playerTwoMass;
  }

  public toggleCardsVisibility(): void {
    this.isCardsVisible = !this.isCardsVisible;
  }




}
