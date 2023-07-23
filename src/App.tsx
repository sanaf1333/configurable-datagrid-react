import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import ConfigurationDatagridWidget from './components/configurable-datagrid-widget';
function App() {
  return (
    <div className="App">
      <ConfigurationDatagridWidget />
    </div>
  );
}

export default App;
