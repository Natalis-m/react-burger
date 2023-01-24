import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientStyle from './BurgerIngredients.module.css';

function BurgerIngredients(props) {
  console.log(props);
  const [current, setCurrent] = useState('bun');
  return (
    <section className={BurgerIngredientStyle.box}>
      <h1 className="text text_type_main-large pb-5 pt-5">Соберите бургер</h1>
      <div className={BurgerIngredientStyle} style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent} href="#bun">
          <a className={BurgerIngredientStyle.link}>Булки</a>
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          <a href="#sauce" className={BurgerIngredientStyle.link}>
            Соусы
          </a>
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          <a href="#main" className={BurgerIngredientStyle.link}>
            Начинки
          </a>
        </Tab>
      </div>
      <section className={BurgerIngredientStyle.ingredients + ' custom-scroll'}>
        {props.children}
      </section>
    </section>
  );
}

export default BurgerIngredients;
