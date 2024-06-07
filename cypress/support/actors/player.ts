import { CardGame } from "../views/card-game.view";

export class Player {

    public gameView() {
        return new CardGame();
    };

    public shouldCheckInitialState() {
        const game = this.gameView();
        game.shouldCheckInitialState();
    };

    public shouleToggleGameType() {
        const game = this.gameView();
        game.shouldToggleGameType();

    };

    public shouldFlipCardsAfterStart() {
        const game = this.gameView();
        game.shouldFlipCardsAfterStart();
    };

    public shouldDisplayModal() {
        const game = this.gameView();
        game.shouldDisplayModal();
    };

    public shouldResetScore() {
        const game = this.gameView();
        game.shouldResetScore();
    }

    public shouldCloseModalOnContinue() {
        const game = this.gameView();
        game.shouldCloseModalOnContinue();
    }

    public shouldIncreaseScoreAndHighlightWinner() {
        const game = this.gameView();
        game.shouldIncreaseScoreAndHighlightWinner();
    }

    public shouldHighlightWinningScore() {
        const game = this.gameView();
        game.shouldHighlightWinningScore();
    }



}