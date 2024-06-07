import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      getByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
      findByDataCy(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}