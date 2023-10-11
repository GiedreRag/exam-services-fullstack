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
import { UpdateForm } from './pages/accounts/admin/UpdateForm';
import { AdminCitiesList } from './pages/cities/AdminCitiesList';
import { AdminNewCity } from './pages/cities/AdminNewCity';
import { AdminEditCity } from './pages/cities/AdminEditCity';
import { Services } from './pages/allServices/Services';
import { AddService } from './pages/allServices/AddService';
import { EditService } from './pages/allServices/EditService';

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path='/' element={<Home />}></Route>
            <Route path='/registracija' element={<Register />}></Route>
            <Route path='/taisykles' element={<Terms />}></Route>
            <Route path='/prisijungimas' element={<Login />}></Route>
            <Route path='/nepasiekiamas-puslapis' element={<NotAllowed />}></Route>
          </Route>
          <Route Component={UserLayout}>
            <Route path='/paskyra' element={<Account />}></Route>
            <Route path='/paskyra/koreguoti-forma' element={<UpdateForm />}></Route>
            <Route path='/paskyra/koreguoti-forma/miestu-sarasas' element={<AdminCitiesList />}></Route>
            <Route path='/paskyra/koreguoti-forma/miestu-sarasas/naujas' element={<AdminNewCity />}></Route>
            <Route path='/paskyra/koreguoti-forma/miestu-sarasas/:city/koreguoti' element={<AdminEditCity />}></Route>
            <Route path='/paskyra/servizai' element={<Services />}></Route>
            <Route path='/paskyra/servizai/naujas' element={<AddService />}></Route>
            <Route path='/paskyra/servizai/:serviceId/koreguoti' element={<EditService />}></Route>
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
