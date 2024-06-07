import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { StateService } from "./services/state.service";
import { ApiService } from "./services/api.service";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { GameType } from "./helpers/game-types";

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockMatDialog: Partial<MatDialog>;

  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockStateService: jasmine.SpyObj<StateService>;

  beforeEach(async () => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getPeople', 'getStarships', 'getPerson', 'getStarship']);
    mockStateService = jasmine.createSpyObj('StateService', ['gameState']);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: MatDialog, useValue: mockMatDialog },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })


    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call playGame on button click', () => {
    spyOn(component, 'playGame');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.playGame).toHaveBeenCalled();
  });

  it('should call getElements with people game type', () => {
    mockApiService.getPeople.and.returnValue(of({ results: [] } as any));
    component.playGame(GameType.PEOPLE);
    expect(mockApiService.getPeople).toHaveBeenCalled();
    expect(mockApiService.getStarships).not.toHaveBeenCalled();
  });

  it('should call getElements with starships game type', () => {
    mockApiService.getStarships.and.returnValue(of({ results: [] } as any));
    component.playGame(GameType.ROCKETS);
    expect(mockApiService.getPeople).not.toHaveBeenCalled();
    expect(mockApiService.getStarships).toHaveBeenCalled();
  });

  it('should call _resetGame before starting the game', () => {
    spyOn<any>(component, '_resetGame');
    mockApiService.getPeople.and.returnValue(of({ results: [] } as any));
    component.playGame(GameType.PEOPLE);
    expect(component['_resetGame']).toHaveBeenCalled();
  });
});
