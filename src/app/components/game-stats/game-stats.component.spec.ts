import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatsComponent } from './game-stats.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GameStatsComponent', () => {
  let component: GameStatsComponent;
  let fixture: ComponentFixture<GameStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameStatsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
