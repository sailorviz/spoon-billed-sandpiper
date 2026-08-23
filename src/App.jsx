import { useState } from 'react'
import './styles/App.css'
import ScrollForIntro from './steps/ScrollForIntro';
import ScrollForPopulation from './steps/ScrollForPopulation';
import ScrollForRinging from './steps/ScrollForRinging';
import ScrollForDisdinctionTimeline from './steps/ScrollForDisdinctionTimeline';
import ScrollForMigration from './steps/ScrollForMigration';

function App() {
  const [language, setLanguage] = useState("en");

  return (
    <>
      <ScrollForIntro
        language={language}
      />
      <ScrollForPopulation />
      <ScrollForRinging
        language={language}
      />
      <ScrollForDisdinctionTimeline/>
      <ScrollForMigration />
    </>
  );
}

export default App