import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  // State to track whether the script is loaded.
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // useEffect hook to set up and clean up the event listener.
  useEffect(() => {
    const handleMessageEvent = (event) => {
      // Check if the incoming message indicates that the script has loaded.
      if (event.data.message === 'script-loaded') {
        // Update the state to indicate that the script is loaded.
        setIsScriptLoaded(true);
      }
    };
    // Add the event listener for the 'message' event.
    window.addEventListener('message', handleMessageEvent);

    // Clean-up function to remove the event listener when the component unmounts.
    return () => {
      window.removeEventListener('message', handleMessageEvent);
    };
  }, []);

  // This function sends a postMessage to the HTML, requesting to initiate a popup display. It communicates with the designated HTML element to trigger a user interface response, ensuring interactive engagement.

  const toggleWebform = () => {
    window.postMessage(
      {
        message: 'trigger-webform',
      },
      'http://localhost:5173'
    );
  };

  return (
    <div className='App'>
      <h1>Trigger webform from component</h1>
      <button disabled={!isScriptLoaded} onClick={toggleWebform}>
        Toggle
      </button>
    </div>
  );
}
