import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './layout/PublicLayout';
import { Home } from './pages/Home';
import { Page404 } from './pages/Page404';
import { UserLayout } from './layout/UserLayout';
import { Account } from './pages/accounts/Account';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={PublicLayout}>
          <Route index path='/' element={<Home />}></Route>
        </Route>
        <Route Component={UserLayout}>
          <Route index path='/paskyra' element={<Account />}></Route>
        </Route>
        <Route Component={PublicLayout}>
          <Route path='*' element={<Page404 />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
