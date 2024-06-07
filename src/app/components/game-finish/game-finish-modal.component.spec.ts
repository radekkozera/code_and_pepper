import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of, BehaviorSubject } from 'rxjs';
import { StateService } from '../../services/state.service';
import { GameFinishModalComponent } from './game-finish-modal.component';

class MockMatDialogRef {
  close() { }
}

class MockStateService {
  isPlayerOneWinner$ = of(true);
  isPlayerTwoWinner$ = of(false);
  playerOneScore$ = new BehaviorSubject<number>(10);
  playerTwoScore$ = new BehaviorSubject<number>(20);
  isGameInProgress$ = new BehaviorSubject<boolean>(true);
}

describe('GameFinishModalComponent', () => {
  let component: GameFinishModalComponent;
  let fixture: ComponentFixture<GameFinishModalComponent>;
  let mockDialogRef: MockMatDialogRef;
  let mockStateService: MockStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameFinishModalComponent],
      providers: [
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: StateService, useClass: MockStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameFinishModalComponent);
    component = fixture.componentInstance;
    mockDialogRef = TestBed.inject(MatDialogRef) as unknown as MockMatDialogRef;
    mockStateService = TestBed.inject(StateService) as unknown as MockStateService;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog without resetting scores', () => {
    spyOn(mockDialogRef, 'close');
    spyOn(mockStateService.isGameInProgress$, 'next');

    component.closeDialog();

    expect(mockDialogRef.close).toHaveBeenCalled();
    expect(mockStateService.isGameInProgress$.next).toHaveBeenCalledWith(false);
  });

  it('should close the dialog and reset scores', () => {
    spyOn(mockDialogRef, 'close');
    spyOn(mockStateService.playerOneScore$, 'next');
    spyOn(mockStateService.playerTwoScore$, 'next');
    spyOn(mockStateService.isGameInProgress$, 'next');

    component.closeDialog(true);

    expect(mockStateService.playerOneScore$.next).toHaveBeenCalledWith(0);
    expect(mockStateService.playerTwoScore$.next).toHaveBeenCalledWith(0);
    expect(mockStateService.isGameInProgress$.next).toHaveBeenCalledWith(false);
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
