import { useEffect, useState } from 'react';

import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerIngredient from './components/BurgerIngredient/BurgerIngredient';
import AppHeader from './components/AppHeader/AppHeader.js';
import AppStyle from './App.module.css';
import { getResponseData } from './utils/api';
import Modal from './components/Modal/Modal';
import IngredientDetails from './components/IngredientDetails/IngredientDetails';
import OrderDetalis from './components/OrderDetails/OrderDetails';

function App() {
  const [dataArray, setDataArray] = useState(null);
  useEffect(() => {
    getResponseData(setDataArray);
  }, []);

  const [modal, setModal] = useState({ opened: false, content: null });
  // {modalIngredient: false, modalIdentifier: false}

  const closedModalEsc = event => {
    if (event.key === 'Escape' && modal) {
      console.log('Escape!!');
      setModal({ opened: false, content: null });
    }
  };

  document.addEventListener('keydown', closedModalEsc);

  function returnCardIngredient(arr, typeIngredient) {
    return arr
      .filter(data => data.type === typeIngredient)
      .map(data => (
        <BurgerIngredient
          onClick={() => {
            setModal({
              opened: true,
              content: () => {
                return <IngredientDetails {...data} />;
              }
            });
          }}
          key={data._id}
          {...data}
        />
      ));
  }

  if (dataArray) {
    return (
      <div className={AppStyle.App}>
        <AppHeader />
        <main className={AppStyle.main}>
          <BurgerIngredients>
            <h2 className={AppStyle.typeIngredient + ' mt-10 text text_type_main-medium'} id="bun">
              Булки
            </h2>
            {returnCardIngredient(dataArray.data, 'bun')}
            <h2
              className={AppStyle.typeIngredient + ' mt-10 text text_type_main-medium'}
              id="sauce"
            >
              Соусы
            </h2>
            {returnCardIngredient(dataArray.data, 'sauce')}
            <h2 className={AppStyle.typeIngredient + ' mt-10 text text_type_main-medium'} id="main">
              Начинки
            </h2>
            {returnCardIngredient(dataArray.data, 'main')}
          </BurgerIngredients>

          <BurgerConstructor>
            <Button
              htmlType="button"
              type="primary"
              size="medium"
              onClick={() => {
                setModal({
                  opened: true,
                  content: () => {
                    return <OrderDetalis />;
                  }
                });
              }}
            >
              Оформить заказ
            </Button>
          </BurgerConstructor>
        </main>
        <Modal active={modal.opened} inActive={() => setModal(false)} content={modal.content} />
      </div>
    );
  } else {
    return <h2>Loading</h2>;
  }
}

export default App;
