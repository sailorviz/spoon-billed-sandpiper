import { useState } from 'react'
import './styles/App.css'
import ScrollForMigration from './steps/ScrollForMigration';
import ScrollForPopulation from './steps/ScrollForPopulation';

function App() {
  return (
    <>
      <ScrollForPopulation />
      <ScrollForMigration />
    </>
  );
}

export default App