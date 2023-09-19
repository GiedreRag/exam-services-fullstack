import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './layout/PublicLayout';
import { Home } from './pages/Home';
import { Page404 } from './pages/Page404';
import { UserLayout } from './layout/UserLayout';
import { Account } from './pages/accounts/Account';
import { ContextWrapper } from './context/GlobalContext';
import { Register } from './pages/Register';
import { Terms } from './pages/Terms';
import { Login } from './pages/Login';
import { NotAllowed } from './components/NotAllowed';

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path='/' element={<Home />}></Route>
            <Route index path='/registracija' element={<Register />}></Route>
            <Route index path='/taisykles' element={<Terms />}></Route>
            <Route index path='/prisijungimas' element={<Login />}></Route>
            <Route index path='/nepasiekiamas-puslapis' element={<NotAllowed />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route index path='/paskyra' element={<Account />}></Route>
          </Route>
          <Route Component={PublicLayout}>
            <Route path='*' element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;
