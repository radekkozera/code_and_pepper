import { Component } from '@angular/core';
import { GameType } from '../../helpers/game-types';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-stats',
  templateUrl: './game-stats.component.html',
  styleUrl: './game-stats.component.scss'
})
export class GameStatsComponent {
  public gameType$: Observable<GameType>;
  public isGameInProgress$: Observable<boolean>;
  public playerOneScore$: Observable<number>;
  public playerTwoScore$: Observable<number>;

  constructor(private _appState: StateService) {
    this.gameType$ = this._appState.gameState$;
    this.isGameInProgress$ = this._appState.isGameInProgress$;
    this.playerOneScore$ = this._appState.playerOneScore$;
    this.playerTwoScore$ = this._appState.playerTwoScore$;
  }

  public readonly GameType = GameType;

  public selectedGame: GameType | undefined = GameType.PEOPLE;

  public selectGame(gameType: GameType) {
    this._appState.gameState$.next(gameType);
  }

}
