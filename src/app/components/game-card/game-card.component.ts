import { Component, Input } from '@angular/core';
import { GameType } from '../../helpers/game-types';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {

  public gameType$: Observable<GameType>;

  @Input() public isCardVisible: boolean = false;
  @Input() public isWinner: boolean = false;


  constructor(private _appState: StateService) {
    this.gameType$ = this._appState.gameState;
  }


  public readonly GameType = GameType;

}
