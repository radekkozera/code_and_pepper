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
    private GAME_CARD_PLAYER_1 = 'game-card-player-1';
    private GAME_CARD_PLAYER_2 = 'game-card-player-2';

    private DELAY_TIME = 4000;


    public shouldCheckInitialState() {
        //  Start Button
        this.startButton().should('exist')
        this.startButton().should('have.text', 'START')

        // Top Bar
        this.playerOneScore().invoke('text').then((text) => {
            expect(parseInt(text)).to.eq(0)
        });
        this.playerTwoScore().invoke('text').then((text) => {
            expect(parseInt(text)).to.eq(0)
        });

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
        this.playerOneScore().invoke('text').then((text) => {
            expect(parseInt(text)).to.eq(0)
        });
        this.playerTwoScore().invoke('text').then((text) => {
            expect(parseInt(text)).to.eq(0)
        });
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
                this.playerOneScore().invoke('text').then((score) => {
                    expect(parseInt(score)).to.eq(1)
                })
                this.playerTwoScore().invoke('text').then((score) => {
                    expect(parseInt(score)).to.eq(0)
                })
                this.gameCardPlayerOne().should('have.class', 'card__back__winner');
            } else if (scorePlayerOne < scorePlayerTwo) {
                this.playerOneScore().invoke('text').then((score) => {
                    expect(parseInt(score)).to.eq(0)
                })
                this.playerTwoScore().invoke('text').then((score) => {
                    expect(parseInt(score)).to.eq(1)
                })
                this.gameCardPlayerTwo().should('have.class', 'card__back__winner');
            } else {
                this.playerOneScore().invoke('text').then((score) => {
                    expect(parseInt(score)).to.eq(0)
                })
                this.playerTwoScore().invoke('text').then((score) => {
                    expect(parseInt(score)).to.eq(0)
                })
            }
        })

    }

    public shouldHighlightWinningScore() {
        let scorePlayerOne: number = 0;
        let scorePlayerTwo: number = 0;

        this.startButton().click();
        cy.wait(this.DELAY_TIME);

        this.gameResultPlayerOne().invoke('text').then((text) => {
            scorePlayerOne = parseInt(text);
        });

        this.gameResultPlayerTwo().invoke('text').then((text) => {
            scorePlayerTwo = parseInt(text);
        });

        cy.wait(this.DELAY_TIME);


        cy.then(() => {

            console.log(scorePlayerOne)
            console.log(scorePlayerTwo)

            if (scorePlayerOne > scorePlayerTwo) {
                this.playerOneScore().should('have.class', 'game__player__winner');
            }

            if (scorePlayerOne < scorePlayerTwo) {
                this.playerTwoScore().should('have.class', 'game__player__winner');
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

    private gameCardPlayerOne() {
        return cy.get('[data-cy=' + this.GAME_CARD_PLAYER_1 + ']');
    }

    private gameCardPlayerTwo() {
        return cy.get('[data-cy=' + this.GAME_CARD_PLAYER_2 + ']');
    }

}