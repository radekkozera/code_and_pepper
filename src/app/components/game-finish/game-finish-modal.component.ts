import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StateService } from '../../services/state.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-game-finish-modal',
  templateUrl: './game-finish-modal.component.html',
  styleUrl: './game-finish-modal.component.scss'
})
export class GameFinishModalComponent {
  public isPlayerOneWinner$: Observable<boolean>;
  public isPlayerTwoWinner$: Observable<boolean>;


  constructor(private _dialogRef: MatDialogRef<GameFinishModalComponent>, private _appState: StateService) { 
    this.isPlayerOneWinner$ = this._appState.isPlayerOneWinner$;
    this.isPlayerTwoWinner$ = this._appState.isPlayerTwoWinner$;
  }


  closeDialog(resetScore?: boolean): void {
    this._appState.isGameInProgress$.next(false);
    this._dialogRef.close()
  }

}
