import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFinishModalComponent } from './game-finish-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('GameFinishModalComponent', () => {
  let component: GameFinishModalComponent;
  let fixture: ComponentFixture<GameFinishModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameFinishModalComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameFinishModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
