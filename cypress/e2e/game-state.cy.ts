import { StateService } from '../services/mock-state.service';
describe('Game Stats Component', () => {

    let service: StateService

    beforeEach(() => {
        cy.visit('/');
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

    it('should change game type symbol on cards after game type switch', () => {
        cy.get('[data-cy=game-type-button-rockets]').click();
        cy.get('[data-cy=game-card]').each(($card) => {
            cy.wrap($card).within(() => {
                cy.get('mat-icon').contains('flight').should('exist');
            })
        })

        cy.get('[data-cy=game-type-button-people]').click();
        cy.get('[data-cy=game-card]').each(($card) => {
            cy.wrap($card).within(() => {
                cy.get('mat-icon').contains('person').should('exist');
            })
        })
    })

    it('should add points to the winnerand highlight winning card', () => {
        let result1: number, result2: number;

        cy.get('button').click();

        cy.wait(2500)

        cy.get('[data-cy=player-one]').within(() => {
            cy.get('[data-cy=game-result]').invoke('text').then((score) => {
                result1 = parseInt(score);
            })
        })


        cy.get('[data-cy=player-two]').within(() => {
            cy.get('[data-cy=game-result]').invoke('text').then((score) => {
                result2 = parseInt(score);
            })
        })

        cy.then(() => {
            if (result1 && result2) {

                if (result1 > result2) {

                    cy.get('[data-cy=player-one-score]').invoke('text').then((score) => {
                        expect(parseInt(score)).to.eq(1);
                    })

                    cy.get('[data-cy=player-one-score]').should('have.class', 'game__player__winner');

                    cy.get('[data-cy="player-one"]').within(() => {
                        cy.get('[data-cy="card-back"]').should('have.class', 'card__back__winner');
                    });


                    cy.get('[data-cy=player-two-score]').invoke('text').then((score) => {
                        expect(parseInt(score)).to.eq(0);
                    })

                } else if (result1 < result2) {
                    cy.get('[data-cy=player-two-score]').invoke('text').then((score) => {
                        expect(parseInt(score)).to.eq(1);
                    })

                    cy.get('[data-cy=player-two-score]').should('have.class', 'game__player__winner');

                    cy.get('[data-cy="player-two"]').within(() => {
                        cy.get('[data-cy="card-back"]').should('have.class', 'card__back__winner');
                    });


                    cy.get('[data-cy=player-one-score]').invoke('text').then((score) => {
                        expect(parseInt(score)).to.eq(0);
                    })
                }

            }
        })
    })

});
