import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { StarshipResult } from '../../src/app/models/starship.result';
import { PersonResult } from '../../src/app/models/person-result';
import { GameType } from '../../src/app/helpers/game-types';

@Injectable({ providedIn: 'root' })
export class StateService {
    public gameState = new BehaviorSubject<GameType>(GameType.PEOPLE);

    public playerOneScore = new BehaviorSubject<number>(0);
    public playerTwoScore = new BehaviorSubject<number>(0);

    public isPlayerOneWinner = new BehaviorSubject<boolean>(false);
    public isPlayerTwoWinner = new BehaviorSubject<boolean>(false);

    public playerOne = new Subject<StarshipResult | PersonResult>();
    public playerTwo = new Subject<StarshipResult | PersonResult>();

    public isGameInProgress = new BehaviorSubject<boolean>(false);

    public isCardsVisible = new BehaviorSubject<boolean>(false);
}