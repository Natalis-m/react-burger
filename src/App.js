import { useEffect, useState } from 'react';

import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import AppHeader from './components/AppHeader/AppHeader.js';
import { getResponseData } from './utils/api';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    setData(getResponseData());
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div>test</div>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
  );
}

export default App;
