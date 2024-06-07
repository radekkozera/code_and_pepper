export class CardGame {

    private START_GAME_BUTTON = 'game-start';
    private RESET_GAME_BUTTON = 'game-reset';
    private CONTINUE_GAME_BUTTON = 'game-continue';
    private GAME_CARD_PEOPLE = 'game-card-people';
    private GAME_CARD_STARSHIPS = 'game-card-starships';
    private GAME_RESULT_PLAYER_1 = 'game-result-player-1';
    private GAME_RESULT_PLAYER_2 = 'game-result-player-2';
    private GAME_SCORE_PLAYER_1 = 'game-score-player-1';
    private GAME_SCORE_PLAYER_2 = 'game-score-player-2';
    private PLAYER_ONE_CARD = 'player-one-card';
    private PLAYER_TWO_CARD = 'player-two-card';
    private GAME_TYPE_STARSHIPS = 'game-type-starships';
    private GAME_TYPE_PEOPLE = 'game-type-people';
    private GAME_CARD = 'game-card';
    private GAME_FINISH = 'game-finish';
    private GAME_BACK_PLAYER_1 = 'game-back-player-1';
    private GAME_BACK_PLAYER_2 = 'game-back-player-2';

    private DELAY_TIME = 4000;


    public shouldCheckInitialState() {
        //  Start Button
        this.startButton().should('exist')
        this.startButton().should('have.text', 'START')

        // Top Bar
        this.playerOneScore().eq(0);
        this.playerTwoScore().eq(0);

        // Cards
        this.playerOneCard().should('exist')
        this.playerTwoCard().should('exist')

    }

    public shouldToggleGameType() {
        this.gameTypeStarships().click();
        this.gameTypeStarships().should('have.class', 'game__select__selected');

        this.gameCardStarships().should('exist');

        this.gameTypePeople().click();
        this.gameTypePeople().should('have.class', 'game__select__selected');
        this.gameTypePeople().should('exist');
    }


    public shouldFlipCardsAfterStart() {
        this.startButton().click();
        cy.wait(this.DELAY_TIME)
        this.gameCard().each(($card) => {
            cy.wrap($card).should('have.class', 'card__flipped');
        })
    }

    public shouldDisplayModal() {
        this.startButton().click();
        cy.wait(this.DELAY_TIME)
        this.gameFinish().should('exist');
    }

    public shouldResetScore() {
        this.startButton().click();
        cy.wait(this.DELAY_TIME);
        this.resetButton().click();
        this.playerOneScore().eq(0);
        this.playerTwoScore().eq(0);
        this.gameFinish().should('not.exist');
    }

    public shouldCloseModalOnContinue() {
        this.startButton().click();
        cy.wait(this.DELAY_TIME);
        this.continueButton().click();
        this.gameFinish().should('not.exist');
    }

    public shouldIncreaseScoreAndHighlightWinner() {
        let scorePlayerOne: number;
        let scorePlayerTwo: number;

        this.startButton().click();
        cy.wait(this.DELAY_TIME);

        this.gameResultPlayerOne().invoke('text').then((text) => {
            scorePlayerOne = parseInt(text);
        });

        this.gameResultPlayerTwo().invoke('text').then((text) => {
            scorePlayerTwo = parseInt(text);
        });

        cy.then(() => {
            if (scorePlayerOne > scorePlayerTwo) {
                this.playerOneScore().eq(1);
                this.playerTwoScore().eq(0);
                this.gameBackPlayerOne().should('have.class', 'card__back__winner');
            } else if (scorePlayerOne < scorePlayerTwo) {
                this.playerOneScore().eq(0);
                this.playerTwoScore().eq(1);
                this.gameBackPlayerTwo().should('have.class', 'card__back__winner');
            } else {
                this.playerOneScore().eq(0);
                this.playerTwoScore().eq(0);
            }
        })

    }




    private playerOneScore() {
        return cy.get('[data-cy=' + this.GAME_SCORE_PLAYER_1 + ']');
    }

    private playerTwoScore() {
        return cy.get('[data-cy=' + this.GAME_SCORE_PLAYER_2 + ']');
    }

    private startButton() {
        return cy.get('[data-cy=' + this.START_GAME_BUTTON + ']');
    }

    private playerOneCard() {
        return cy.get('[data-cy=' + this.PLAYER_ONE_CARD + ']');
    }

    private playerTwoCard() {
        return cy.get('[data-cy=' + this.PLAYER_TWO_CARD + ']');
    }

    private gameTypeStarships() {
        return cy.get('[data-cy=' + this.GAME_TYPE_STARSHIPS + ']');
    }

    private gameTypePeople() {
        return cy.get('[data-cy=' + this.GAME_TYPE_PEOPLE + ']');
    }

    private gameCardPeople() {
        return cy.get('[data-cy=' + this.GAME_CARD_PEOPLE + ']');
    }

    private gameCardStarships() {
        return cy.get('[data-cy=' + this.GAME_CARD_STARSHIPS + ']');
    }

    private gameCard() {
        return cy.get('[data-cy=' + this.GAME_CARD + ']');
    }

    private gameFinish() {
        return cy.get('[data-cy=' + this.GAME_FINISH + ']');
    }

    private resetButton() {
        return cy.get('[data-cy=' + this.RESET_GAME_BUTTON + ']');
    }

    private continueButton() {
        return cy.get('[data-cy=' + this.CONTINUE_GAME_BUTTON + ']');
    }

    private gameResultPlayerOne() {
        return cy.get('[data-cy=' + this.GAME_RESULT_PLAYER_1 + ']');
    }

    private gameResultPlayerTwo() {
        return cy.get('[data-cy=' + this.GAME_RESULT_PLAYER_2 + ']');
    }

    private gameBackPlayerOne() {
        return cy.get('[data-cy=' + this.GAME_BACK_PLAYER_1 + ']');
    }

    private gameBackPlayerTwo() {
        return cy.get('[data-cy=' + this.GAME_BACK_PLAYER_2 + ']');
    }


    // private gameCardPeople() {
    //     return cy.getByDataCy(this.GAME_CARD_PEOPLE);
    // }

    // private gameCardStarships() {
    //     return cy.getByDataCy(this.GAME_CARD_STARSHIPS);
    // }

    // private gameResultPlayerOne() {
    //     return cy.getByDataCy(this.GAME_RESULT_PLAYER_1);
    // }

    // private gameResultPlayerTwo() {
    //     return cy.getByDataCy(this.GAME_RESULT_PLAYER_2);
    // }

}