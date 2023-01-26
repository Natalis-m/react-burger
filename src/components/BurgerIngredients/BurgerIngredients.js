import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientStyle from './BurgerIngredients.module.css';

function BurgerIngredients(props) {
  const [current, setCurrent] = useState('bun');
  const handleTabClick = current => {
    setCurrent(current);
    document.getElementById(current).scrollIntoView({ block: 'start' });
  };

  return (
    <section className={BurgerIngredientStyle.box}>
      <h1 className="text text_type_main-large pb-5 pt-10">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
          Начинки
        </Tab>
      </div>
      <section
        id="sectionIngredients"
        className={BurgerIngredientStyle.ingredients + ' custom-scroll pr-1'}
      >
        {props.children}
      </section>
    </section>
  );
}

export default BurgerIngredients;
