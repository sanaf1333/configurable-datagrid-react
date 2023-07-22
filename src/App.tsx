import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import ConfigurationForm from './components/configuration-form';
function App() {
  return (
    <div className="App">
      <Button type='primary'>sana</Button>
      <ConfigurationForm />
    </div>
  );
}

export default App;
