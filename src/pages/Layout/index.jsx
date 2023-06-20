import Style from './LayoutStyle.module.css';
import AppHeader from '../../AppHeader/AppHeader';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className={Style.App}>
      <AppHeader />
      <main className={Style.main}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
