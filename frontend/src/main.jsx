import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Importing styles into app
import '../public/styles/styles.css';

// Importing api service
import Accounts from './service/Accounts';

// Importing components
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";

// Importing Pages
const PwdManagerIndex = lazy(() => import('./pages/pwdmanager/Index'));
const PwdManagerDetail = lazy(() => import('./pages/pwdmanager/Detail'));
const PwdManagerCreate = lazy(() => import('./pages/pwdmanager/Create'));

// creating instance of api service
const Account_Service = new Accounts();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
      <Navigation/>
      <Suspense fallback={<Loading />}>
          <Routes>
              <Route path={'/loading'} element={<Loading />} />
              <Route path={'/pwdmanager'} element={<PwdManagerIndex service={Account_Service} />} />
              <Route path={'/pwdmanager/home'} element={<PwdManagerIndex service={Account_Service} />} />
              <Route path={'/pwdmanager/create'} element={<PwdManagerCreate service={Account_Service} />} />
              <Route path={'/pwdmanager/account/:id'} element={<PwdManagerDetail service={Account_Service} />} />
          </Routes>
      </Suspense>
      </BrowserRouter>
  </React.StrictMode>
)
