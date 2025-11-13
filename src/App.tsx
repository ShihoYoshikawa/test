import React from 'react';
import { MaterialSelection } from './components/MaterialSelection';
import { materials, glasses, techniques } from './mockData';

function App() {
  return (
    <MaterialSelection
      materials={materials}
      glasses={glasses}
      techniques={techniques}
    />
  );
}

export default App;
