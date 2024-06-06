import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameType } from "../helpers/game-types";

@Injectable({ providedIn: 'root' })
export class StateService {
    public gameState = new BehaviorSubject<GameType>(GameType.PEOPLE);

    public playerOneScore = new BehaviorSubject<number>(0);

    public playerTwoScore = new BehaviorSubject<number>(0);

    public isGameInProgress = new BehaviorSubject<boolean>(false);

    public isCardsVisible = new BehaviorSubject<boolean>(false);
}