import React from 'react';
import './App.css';
import InventoryContainer from './containers/InventoryContainer/InventoryContainer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from 'react-bootstrap/esm/Switch';
import { Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div style={{ marginTop: 50 }}></div>
      <Switch>
        <Route path='/' component={InventoryContainer}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
