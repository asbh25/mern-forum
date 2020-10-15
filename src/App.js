import React from 'react';
import { Header } from './components/Header';
import { Forum } from './components/Forum';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>

      <main className="main">
        <Forum />
      </main>
    </div>
  );
}

export default App;
