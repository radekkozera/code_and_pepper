import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { StateService } from "./services/state.service";
import { ApiService } from "./services/api.service";
import { MatDialog } from "@angular/material/dialog";
import { of } from "rxjs";
import { PersonResult } from "./models/person-result";
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


});