import { defaultIngredients, defaultLogin, testUrl } from '../../support/default';
import { ingredients, constructor, modal, login } from '../../support/selectors';

describe('Тестируем страницу сбора бургера', () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.viewport(1500, 1200);
  });

  // it('Функционал перетаскивания ингредиентов', () => {
  //   cy.intercept('https://norma.nomoreparties.space/api/ingredients', {
  //     body: { success: true, data: defaultIngredients }
  //   });
  //   cy.get(ingredients.ingredient).first().trigger('dragstart');
  //   cy.get(constructor.bun).first().trigger('drop');

  //   cy.get(ingredients.ingredient).last().trigger('dragstart');
  //   cy.get(constructor.filling).first().trigger('drop');
  // });

  it('Отправка заказа и открытие модалки с номером', () => {
    cy.intercept('https://norma.nomoreparties.space/api/ingredients', {
      body: { success: true, data: defaultIngredients }
    });

    cy.get(ingredients.ingredient + ':eq(1)').trigger('dragstart');
    cy.get(constructor.bun).last().trigger('drop');
    cy.get(constructor.bun).first().should('exist');
    cy.get(constructor.bun).last().should('exist');

    cy.get(ingredients.ingredient + ':eq(3)').trigger('dragstart');
    cy.get(constructor.filling).trigger('drop');

    cy.get(constructor.submitOrderButton).should('not.have.attr', 'disabled');
    cy.get(constructor.submitOrderButton).click();

    const email = 'natalya.matiishena@yandex.ru';
    const password = '222';
    cy.get(login.email).children(1).type(`${email}`);
    cy.get(login.password).children(2).type(`${password}{enter}`);
    cy.get(login.submitLogin).should('not.have.attr', 'disabled');
    cy.get(login.submitLogin).click();

    cy.intercept('https://norma.nomoreparties.space/api/auth/login', {
      body: defaultLogin
    }).as('defaultLogin');

    cy.wait('@defaultLogin');

    cy.get(constructor.submitOrderButton).click();
    cy.get(modal.closeButton).click();
    cy.get(modal.container).should('not.exist');
  });
});
