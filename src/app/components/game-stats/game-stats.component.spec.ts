import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameStatsComponent } from './game-stats.component';
import { StateService } from '../../services/state.service';
import { GameType } from '../../helpers/game-types';
import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GameStatsComponent', () => {
  let component: GameStatsComponent;
  let fixture: ComponentFixture<GameStatsComponent>;
  let stateServiceMock: jasmine.SpyObj<StateService>;
  let gameStateSubject: BehaviorSubject<GameType>;

  beforeEach(() => {

    gameStateSubject = new BehaviorSubject<GameType>(GameType.PEOPLE);

    const stateServiceSpy = jasmine.createSpyObj('StateService', ['gameState$'], {
      gameState$: gameStateSubject,
    
    });

    TestBed.configureTestingModule({
      declarations: [GameStatsComponent],
      providers: [{ provide: StateService, useValue: stateServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(GameStatsComponent);
    component = fixture.componentInstance;
    stateServiceMock = TestBed.inject(StateService) as jasmine.SpyObj<StateService>;
    fixture.detectChanges();

    spyOn(gameStateSubject, 'next');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call gameState$.next with the selected game type', () => {
    const selectedGameType = GameType.ROCKETS;

    component.selectGame(selectedGameType);

    expect(stateServiceMock.gameState$.next).toHaveBeenCalledWith(GameType.ROCKETS);
  });
});