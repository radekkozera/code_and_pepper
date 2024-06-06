import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { StateService } from '../../services/state.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-game-finish-modal',
  templateUrl: './game-finish-modal.component.html',
  styleUrl: './game-finish-modal.component.scss'
})
export class GameFinishModalComponent {


  constructor(private _dialogRef: MatDialogRef<GameFinishModalComponent>, private _appState: StateService) { }


  closeDialog(): void {
    this._appState.isGameInProgress.next(false);
    this._dialogRef.close()
  }

}
