describe('Ingredient addition and order creation tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', '/api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('testRefreshToken')
    );
    cy.setCookie('accessToken', 'testAccessToken');
    cy.viewport(1300, 800);
    cy.visit('/');
    cy.wait('@getIngredients', { timeout: 10000 });

    cy.get('[data-cy=bun-ingredients]').as('bunIngredients');
    cy.get('[data-cy=mains-ingredients]').as('mainsIngredients');
    cy.get('[data-cy=sauces-ingredients]').as('saucesIngredients');
    cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
  });

  const addIngredient = (ingredientType) => {
    cy.get(ingredientType).contains('Добавить').click();
  };

  it('add bun', () => {
    addIngredient('@bunIngredients');
    cy.get('[data-cy=constructor-bun-1]')
      .should('contain', 'Ингредиент 1')
      .should('be.visible');
    cy.get('[data-cy=constructor-bun-2]')
      .should('contain', 'Ингредиент 1')
      .should('be.visible');
  });

  it('add ingredient', () => {
    addIngredient('@mainsIngredients');
    addIngredient('@saucesIngredients');
    cy.get('@constructorIngredients').contains('Ингредиент 2').should('exist');
    cy.get('@constructorIngredients').contains('Ингредиент 4').should('exist');
  });

  it('add ingredients and create order', () => {
    addIngredient('@bunIngredients');
    addIngredient('@mainsIngredients');
    addIngredient('@saucesIngredients');

    cy.get('[data-cy=order-button]').click();

    cy.get('[data-cy=order-number]').as('orderNumber');
    cy.get('@orderNumber').contains('123').should('exist');
    cy.get('[data-cy=close-modal-button]').click();
    cy.get('@orderNumber').should('not.exist');

    cy.get('@constructorIngredients')
      .contains('Ингредиент 1')
      .should('not.exist');
    cy.get('@constructorIngredients')
      .contains('Ингредиент 2')
      .should('not.exist');
    cy.get('@constructorIngredients')
      .contains('Ингредиент 4')
      .should('not.exist');
  });

  describe('Modal window functionality', () => {
    it('open modal', () => {
      cy.contains('Ингредиент 1').should('be.visible').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('#modals').contains('Ингредиент 1').should('exist');
    });

    it('close modal by clicking on the cross', () => {
      cy.contains('Ингредиент 1').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=close-modal-button]').click();
      cy.contains('Детали ингредиента').should('not.exist');
    });

    it('close modal by clicking on overlay', () => {
      cy.contains('Ингредиент 1').click();
      cy.contains('Детали ингредиента').should('exist');
      cy.get('[data-cy=overlay]').click('left', { force: true });
      cy.contains('Детали ингредиента').should('not.exist');
    });
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });
});
