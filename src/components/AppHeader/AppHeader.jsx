import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyle from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={AppHeaderStyle.header}>
      <section className={AppHeaderStyle.container}>
        <nav className="pb-4 pt-4">
          <ul className={AppHeaderStyle.navigation}>
            <li className={AppHeaderStyle.navigation__item + ' pb-4 pt-4 pr-5 pl-5'}>
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default pl-2">Конструктор</span>
            </li>
            <li className={AppHeaderStyle.navigation__item + ' pb-4 pt-4 pr-5 pl-5'}>
              <ListIcon type="primary" />
              <span className="text text_type_main-default pl-2">Лента заказов</span>
            </li>
          </ul>
        </nav>
        <div className={AppHeaderStyle.logo}>
          <Logo />
        </div>

        <a href="#" className={AppHeaderStyle.profile + ' pb-4 pt-4 pr-5 pl-5'}>
          <ProfileIcon type="primary" />
          <span className="text text_type_main-default pl-2">Личный кабинет</span>
        </a>
      </section>
    </header>
  );
}

export default AppHeader;
