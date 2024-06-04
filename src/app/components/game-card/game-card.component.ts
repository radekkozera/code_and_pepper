import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss',
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('5s ease-in-out')),
    ]),
  ],
})
export class GameCardComponent {
  @Input() public isCardVisible: boolean = false;

  @Input() public isWinner: boolean = false;

}
