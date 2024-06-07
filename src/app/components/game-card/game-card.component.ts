import { Component, Input } from '@angular/core';
import { GameType } from '../../helpers/game-types';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';
import { PersonResult } from '../../models/person-result';
import { StarshipResult } from '../../models/starship.result';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  public gameType$: Observable<GameType>;
  public isGameInProgress$: Observable<boolean>;

  @Input() public isWinner: boolean = false;

  @Input() public personResult?: PersonResult;

  @Input() public starshipResult?: StarshipResult


  constructor(private _appState: StateService) {
    this.gameType$ = this._appState.gameState$;
    this.isGameInProgress$ = this._appState.isGameInProgress$;
  }


  public readonly GameType = GameType;

}
