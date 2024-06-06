import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { GameType } from "../helpers/game-types";
import { StarshipResult } from "../models/starship.result";
import { PersonResult } from "../models/person-result";

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