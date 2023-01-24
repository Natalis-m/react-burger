import { useEffect, useState } from 'react';

import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerIngredient from './components/BurgerIngredient/BurgerIngredient';
import AppHeader from './components/AppHeader/AppHeader.js';
import AppStyle from './App.module.css';
import { getResponseData } from './utils/api';

function App() {
  const [dataArray, setDataArray] = useState(null);
  useEffect(() => {
    getResponseData(setDataArray);
  }, []);

  if (dataArray) {
    return (
      <div className={AppStyle.App}>
        <AppHeader />
        <main className={AppStyle.main}>
          <BurgerIngredients>
            <h2 className={AppStyle.typeIngredient + ' pt-10 pb-6'} id="bun">
              Булки
            </h2>
            {returnCardIngredient(dataArray.data, 'bun')}
            <h2 className={AppStyle.typeIngredient + ' pt-10 pb-6'} id="sauce">
              Соусы
            </h2>
            {returnCardIngredient(dataArray.data, 'sauce')}
            <h2 className={AppStyle.typeIngredient + ' pt-10 pb-6'} id="main">
              Начинки
            </h2>
            {returnCardIngredient(dataArray.data, 'main')}
          </BurgerIngredients>

          <BurgerConstructor />
        </main>
      </div>
    );
  } else {
    return <h2>Loading</h2>;
  }
}

function returnCardIngredient(arr, typeIngredient) {
  return arr
    .filter(data => data.type === typeIngredient)
    .map(data => <BurgerIngredient key={data._id} {...data} />);
}

export default App;
