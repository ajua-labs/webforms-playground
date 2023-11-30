import React, { useEffect, useState } from 'react';

function App() {
  const [isScripLoaded, setIsScripLoaded] = useState(false);

  useEffect(() => {
    const onScriptLoad = (event) => {
      if (event.data.message === 'script-loaded') {
        setIsScripLoaded(true);
      }
    };

    window.addEventListener('message', onScriptLoad);

    return () => window.removeEventListener('message', onScriptLoad);
  }, []);

  const toggle = () => {
    window.postMessage({
      message: 'trigger-webform',
    });
  };

  return (
    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
      <button disabled={!isScripLoaded} onClick={toggle}>
        Toggle
      </button>
    </div>
  );
}

export default App;
