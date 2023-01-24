import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyle from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={appHeaderStyle.header + ' pt-10 pb-5 pl-5 pr-5'}>
      <nav className="pb-4 pt-4">
        <ul className={appHeaderStyle.navigation}>
          <li className={appHeaderStyle.navigation__item + ' pb-4 pt-4 pr-5 pl-5'}>
            <BurgerIcon type="primary" />
            <span className="pl-2">Конструктор</span>
          </li>
          <li className={appHeaderStyle.navigation__item + ' pb-4 pt-4 pr-5 pl-5'}>
            <ListIcon type="primary" />
            <span className="pl-2">Лента заказов</span>
          </li>
        </ul>
      </nav>
      <div className={appHeaderStyle.logo}>
        <Logo />
      </div>

      <a href="#" className={appHeaderStyle.profile + ' pb-4 pt-4'}>
        <ProfileIcon type="primary" />
        <span className="pl-2">Личный кабинет</span>
      </a>
    </header>
  );
}

export default AppHeader;
