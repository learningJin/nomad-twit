import {useEffect, useState} from 'react';

import { authService } from 'fBase';
import AppRouter from 'components/Router';

function App() {
  const [init, setInit] = useState(false); // Is this component initialized?
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
    authService.onAuthStateChanged( user => {
      if(user){
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true)
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'initializing'}
      <footer>&copy; {new Date().getFullYear()} </footer>
    </>
  );
}

export default App;
