import { StateService } from '../services/mock-state.service';
describe('Game Stats Component', () => {

    let service: StateService

    beforeEach(() => {
        cy.visit('/');

        cy.window().then((win) => {
        });

    });

    it('should display player one and player two scores', () => {
        cy.get('[data-cy=player-one-score]').should('be.visible');
        cy.get('[data-cy=player-two-score]').should('be.visible');
    });

    it('should add "game__select__selected" class to the clicked game type button', () => {
        cy.get('[data-cy=game-type-button-rockets]').click();

        cy.get('[data-cy=game-type-button-rockets]').should('have.class', 'game__select__selected');

        cy.get('[data-cy=game-type-button-people]').click();

        cy.get('[data-cy=game-type-button-people]').should('have.class', 'game__select__selected');
    });

});
