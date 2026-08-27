import { useState } from 'react'
import './styles/App.css'
import ScrollForIntro from './steps/ScrollForIntro';
import ScrollForPopulation from './steps/ScrollForPopulation';
import ScrollForRinging from './steps/ScrollForRinging';
import ScrollForDisdinctionTimeline from './steps/ScrollForDisdinctionTimeline';
import ScrollForMigration from './steps/ScrollForMigration';

function App() {
  // language 本来就住在 App 里面。Intro 只是通过props拿到了它的“控制权”。
  const [language, setLanguage] = useState("zh");

  return (
    <>
      <ScrollForIntro
        language={language}
        setLanguage={setLanguage}
      />
      <ScrollForPopulation
        language={language}
      />
      <ScrollForRinging
        language={language}
      />
      <ScrollForDisdinctionTimeline
        language={language}
      />
      <ScrollForMigration
        language={language}
      />
    </>
  );
}

export default App