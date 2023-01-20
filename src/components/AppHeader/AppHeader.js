import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyle from './appHeader.module.css';

function AppHeader() {
  return (
    <header className={appHeaderStyle.header + ' p-10'}>
      <nav>
        <ul className={appHeaderStyle.navigation}>
          <li className={appHeaderStyle.navigation__item}>
            <BurgerIcon type="primary" />
            <span className="pl-3">Конструктор</span>
          </li>
          <li className={appHeaderStyle.navigation__item}>
            <ListIcon type="primary" />
            <span className="pl-3">Лента заказов</span>
          </li>
        </ul>
      </nav>
      <Logo className={appHeaderStyle.logo} />
      <a href="#" className={appHeaderStyle.profile}>
        <ProfileIcon type="primary" />
        <span className="pl-3">Личный кабинет</span>
      </a>
    </header>
  );
}

export default AppHeader;
