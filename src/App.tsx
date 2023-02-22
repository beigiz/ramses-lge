import './App.css';

import Index from 'pages';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RoutePath from './routes';

function App() {
  return (
    <Routes>
      <Route path={RoutePath.LANDING} element={<Index />} />
      {/*<Route*/}
      {/*  path={RoutePath.LANDING}*/}
      {/*  element={*/}
      {/*    <Navigate*/}
      {/*      to={getRoute(RoutePath.LANDING, {*/}
      {/*        [RouteParam.CATEGORY_ID]: '2',*/}
      {/*      })}*/}
      {/*    />*/}
      {/*  }*/}
      {/*/>*/}
    </Routes>
  );
}

export default App;
