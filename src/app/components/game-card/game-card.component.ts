import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { GameType } from '../../helpers/game-types';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
})
export class GameCardComponent {
  @Input() public isCardVisible: boolean = false;
  @Input() public isWinner: boolean = false;
  @Input() public gameType?: GameType;
  // @Input() public 


  public readonly GameType = GameType;

}
