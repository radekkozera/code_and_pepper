import { Player } from "../support/actors/player";


describe('Test Card Game', () => {
    const player = new Player();

    beforeEach(() => {
        cy.visit('/');
    });

    // it('should increase score and highlight winner', () => {
    //     player.shouldIncreaseScoreAndHighlightWinner();
    // })

    it('should highlight winning score', () => {
        player.shouldHighlightWinningScore();
    });

    // it('should check initial state', () => {
    //     player.shouldCheckInitialState();
    // })

    // it('should toggle game type', () => {
    //     player.shouleToggleGameType();
    // })

    // it('should flip cards after start', () => {
    //     player.shouldFlipCardsAfterStart();
    // })

    // it('should display modal', () => {
    //     player.shouldDisplayModal();
    // })

    // it('should reset score', () => {
    //     player.shouldResetScore();
    // })
});