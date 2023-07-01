const selectors = {
  ingredients: {
    ingredient: '[class^=BurgerIngredient_card__]'
  },

  constructor: {
    bun: '[class^=bun]',
    filling: '[class^=filling]',
    submitOrderButton: '[class^=submit]'
  },

  modal: {
    container: '[class^=Modal_content__]',
    closeButton: '[class^=Modal_closed__]'
  },
  login: {
    email: '[class^=email]',
    password: '[class^=password]',
    submitLogin: '[class^=submit]'
  }
};
export const { ingredients, constructor, modal, login } = selectors;
