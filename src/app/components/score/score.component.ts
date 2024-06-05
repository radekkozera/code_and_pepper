import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {
  @Input() public score: number = 0;
  @Input() public player?: string = 'waldr';
  @Input() public isWinner: boolean = false;
}
